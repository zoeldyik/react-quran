import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { FONT_DEFAULT_VALUE } from "../../utils/FontContextProvider";

export default function InputSetting({
  label,
  nameValue,
  value,
  allValue,
  setAllValue,
}) {
  const minusOne = () => {
    window.localStorage.setItem(
      "fontSize",
      JSON.stringify({ ...allValue, [nameValue]: value - 1 })
    );
    setAllValue({ ...allValue, [nameValue]: value - 1 });
  };

  const plusOne = () => {
    window.localStorage.setItem(
      "fontSize",
      JSON.stringify({ ...allValue, [nameValue]: value + 1 })
    );
    setAllValue({ ...allValue, [nameValue]: value + 1 });
  };

  return (
    <div className="flex items-center mb-2 mt-2">
      <label className="mr-auto">{label}</label>

      <div className="flex">
        {value > FONT_DEFAULT_VALUE[nameValue] && (
          <span
            className="px-1 bg-neutral-100  hover:bg-neutral-200 active:bg-neutral-50 cursor-pointer select-none flex items-center rounded-tl-md rounded-bl-md"
            onClick={minusOne}
          >
            <AiOutlineMinus />
          </span>
        )}

        <input
          disabled
          value={value}
          type="number"
          className="form-input w-16 px-2 py-1 text-center border-0 focus:ring-0 bg-neutral-100"
        />

        <span
          className="px-1 bg-neutral-100  hover:bg-neutral-200 active:bg-neutral-50 cursor-pointer select-none flex items-center rounded-tr-md rounded-br-md"
          onClick={plusOne}
        >
          <AiOutlinePlus />
        </span>
      </div>
    </div>
  );
}
