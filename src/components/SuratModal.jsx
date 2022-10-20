import AppSettings from "./settings/AppSettings";
import { BiX } from "react-icons/bi";

import { useContext } from "react";

import { TeksContext } from "../utils/FontContextProvider";

export default function SuratModal({ surat, setSurat, isHidden, setIsHidden }) {
  const { font } = useContext(TeksContext);

  const showOrHideText = ({ type, idx }) => {
    const tempAyat = surat.ayat.map((el, id) => {
      if (id === idx) {
        if (type === "LATIN") return { ...el, hiddenLatin: !el.hiddenLatin };
        if (type === "TERJEMAHAN")
          return { ...el, hiddenTerjemahan: !el.hiddenTerjemahan };
      }
      return el;
    });

    setSurat({ ...surat, ayat: tempAyat });
  };

  const showOrHideTextBismillah = (type) => {
    const newVal = (surat.preBismillah[type] = !surat.preBismillah[type]);
    const temp = {
      ...surat.preBismillah,
      [surat.preBismillah[type]]: newVal,
    };

    setSurat({ ...surat, [surat.preBismillah[type]]: newVal });
  };

  return (
    <>
      <div
        className="w-full h-screen max-w-2xl margin-auto bg-white overflow-y-scroll lg:max-w-3xl box-border"
        hidden={isHidden}
      >
        <nav className="sticky top-0 py-3 px-2 bg-white shadow-sm flex items-center">
          <AppSettings position="absolute top-3 right-3" />
          <BiX
            className="w-7 h-7 cursor-pointer text-neutral-500 hover:text-neutral-600 hover:scale-110 transition-all"
            onClick={() => setIsHidden(true)}
          />
        </nav>

        <section className="title mb-16">
          <h2 className="mt-5 text-xl text-center font-medium ">
            {surat.namaSurat}
          </h2>
          <p className="text-xs italic text-center font-medium text-neutral-400">
            {surat.namaSuratTerjemahan}, {surat.jumlahAyat} Ayat, {surat.tipe}
          </p>
        </section>

        {/* Bismillah */}
        {surat.preBismillah && (
          <section className="border-b-2 border-neutral-200 pb-4 mx-4 mb-14">
            <p
              className="text-right"
              style={{
                fontSize: `${font.arab}px`,
                lineHeight: `${font.lineHeightArab}px`,
              }}
            >
              {surat.preBismillah.text.arab}
            </p>

            {/* BUTTONS */}
            <div className="buttons mt-3 flex justify-end">
              <span
                className="rounded-md px-3 py-1 bg-neutral-800 text-gray-50 text-xs cursor-pointer mr-2 select-none hover:bg-neutral-600 active:bg-neutral-900"
                onClick={() => showOrHideTextBismillah("hiddenLatin")}
              >
                LATIN
              </span>

              <span
                className="btn px-3 py-1 text-xs"
                onClick={() => showOrHideTextBismillah("hiddenTerjemahan")}
              >
                TERJEMAHAN
              </span>
            </div>

            {/* Bismillah */}
            <div>
              <p
                className={`bg-neutral-800 text-gray-50 rounded-md px-4 overflow-hidden transition-all 
                  ${!surat.preBismillah.hiddenLatin ? "show" : "h-0"}`}
                style={{ fontSize: `${font.latin}px` }}
              >
                {surat.preBismillah.text.transliteration.en}
              </p>

              <p
                className={`mt-2 bg-emerald-500 text-gray-50 rounded-md px-4 overflow-hidden transition-all
                  ${!surat.preBismillah.hiddenTerjemahan ? "show" : "h-0"}`}
                style={{ fontSize: `${font.latin}px` }}
              >
                {surat.preBismillah.translation.id}
              </p>
            </div>
          </section>
        )}

        {surat &&
          surat.ayat.map((ayat, idx) => (
            <section
              key={idx}
              className="border-b-2 border-neutral-200 pb-4 mx-4 mb-14"
            >
              {/* TEKS ARAB */}
              <p className="flex justify-between items-center">
                <span className="inline-block px-2 py-1 bg-neutral-700 text-gray-50 text-xs rounded-full self-start">
                  {idx + 1}
                </span>
                <span
                  className="text-right"
                  style={{
                    fontSize: `${font.arab}px`,
                    lineHeight: `${font.lineHeightArab}px`,
                  }}
                >
                  {ayat.text.arab}
                </span>
              </p>

              {/* BUTTONS */}
              <div className="buttons mt-3 flex justify-end">
                <span
                  className="rounded-md px-3 py-1 bg-neutral-800 text-gray-50 text-xs cursor-pointer mr-2 select-none hover:bg-neutral-600 active:bg-neutral-900"
                  onClick={() => showOrHideText({ idx, type: "LATIN" })}
                >
                  LATIN
                </span>

                <span
                  className="btn px-3 py-1 text-xs"
                  onClick={() => showOrHideText({ idx, type: "TERJEMAHAN" })}
                >
                  TERJEMAHAN
                </span>
              </div>

              {/* TEKS */}
              <div className="">
                <p
                  className={`bg-neutral-800 text-gray-50 rounded-md px-4 overflow-hidden transition-all 
                  ${!ayat.hiddenLatin ? "show" : "h-0"}`}
                  style={{ fontSize: `${font.latin}px` }}
                >
                  {ayat.text.transliteration.en}
                </p>

                <p
                  className={`mt-2 bg-emerald-500 text-gray-50 rounded-md px-4 overflow-hidden transition-all
                  ${!ayat.hiddenTerjemahan ? "show" : "h-0"}`}
                  style={{ fontSize: `${font.latin}px` }}
                >
                  {ayat.translation.id}
                </p>
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
