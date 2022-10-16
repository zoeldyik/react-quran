import { useContext, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import InputSetting from "./InputSetting";

import {
  TeksContext,
  FONT_DEFAULT_VALUE,
} from "../../utils/FontContextProvider";

export default function AppSettings({ position = "absolute top-4 right-4" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { font, setFont } = useContext(TeksContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFont(FONT_DEFAULT_VALUE);
    window.localStorage.clear();
  };

  return (
    <div className={`${position} flex flex-col z-50`}>
      <BiDotsHorizontalRounded
        className="text-3xl cursor-pointer self-end mb-5 hover:text-neutral-600 hover:scale-110 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={`px-3 py-3 w-60 rounded-md shadow-md text-sm bg-white`}
        hidden={!isOpen}
      >
        <form onSubmit={handleSubmit}>
          <InputSetting
            label="Teks Arab"
            nameValue="arab"
            value={font.arab}
            allValue={font}
            setAllValue={setFont}
          />

          <InputSetting
            label="Line Height"
            nameValue="lineHeightArab"
            value={font.lineHeightArab}
            allValue={font}
            setAllValue={setFont}
          />

          <InputSetting
            label="Latin"
            nameValue="latin"
            value={font.latin}
            allValue={font}
            setAllValue={setFont}
          />

          <button className="btn px-3 py-1 mt-4 text-xs">RESET</button>
        </form>
      </div>
    </div>
  );
}
