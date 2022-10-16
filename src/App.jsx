import { useEffect, useState } from "react";
import FontContextProvider from "./utils/FontContextProvider";

import AppSettings from "./components/settings/AppSettings";
import MainCard from "./components/MainCard";
import SuratModal from "./components/SuratModal";
import ErrorComponent from "./components/ErrorComponent";

function App() {
  const [IsError, setIsError] = useState(false);

  const [listNamaSurat, setListNamaSurat] = useState([]);
  const [surat, setSurat] = useState(false);
  const [isModalHidden, setisModalHidden] = useState(true);

  const filterNama = (lists) => {
    return lists.map((list) => {
      return { value: list.number, label: list.name.transliteration.id };
    });
  };

  const getSurat = async (id) => {
    // console.log("getsurat fired");

    try {
      const res = await fetch(
        `https://tastes-quran-api.vercel.app/surah/${id}`
      );
      const json = await res.json();

      const {
        numberOfVerses: jumlahAyat,
        name,
        revelation,
        verses,
      } = json.data;

      const ayat = verses.map((el) => {
        return { ...el, hiddenLatin: true, hiddenTerjemahan: true };
      });

      const data = {
        jumlahAyat,
        tipe: revelation.id,
        ayat,
        namaSurat: name.transliteration.id,
        namaSuratTerjemahan: name.translation.id,
      };

      setSurat(data);
      setisModalHidden(false);
    } catch (e) {
      setIsError(true);
      // console.log(e);
    }
  };

  useEffect(() => {
    const getTitle = async () => {
      try {
        const res = await fetch("https://tastes-quran-api.vercel.app/surah");
        const json = await res.json();

        if (json.code !== 200) {
          setListNamaSurat(false);
          setIsError(true);
        } else {
          const { data } = json;
          setListNamaSurat(filterNama(data));
        }
      } catch (e) {
        setIsError(true);
        console.log(e);
      }
    };

    getTitle();
  }, []);

  return (
    <FontContextProvider>
      <>
        <ErrorComponent IsError={IsError} />

        {!IsError && (
          <div
            className={`app relative App h-screen overflow-hidden w-full flex items-center justify-center text-neutral-700`}
            style={{
              background: isModalHidden ? "url(bg.svg)" : "#fafafa",
            }}
          >
            {isModalHidden && (
              <MainCard listNamaSurat={listNamaSurat} getSurat={getSurat} />
            )}

            {isModalHidden && <AppSettings absolute={true} />}

            {!isModalHidden && (
              <SuratModal
                surat={surat}
                setSurat={setSurat}
                isHidden={isModalHidden}
                setIsHidden={setisModalHidden}
              />
            )}
          </div>
        )}
      </>
    </FontContextProvider>
  );
}

export default App;
