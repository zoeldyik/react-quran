import { useState } from "react";
import Select from "react-select";

export default function MainCard({ listNamaSurat, getSurat }) {
  const [id, setId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) return;
    getSurat(id);
  };

  const customStyles = {
    menuList: (provided, state) => ({
      ...provided,
      overflowY: "scroll",
      maxHeight: "200px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#f9fafb" : "#374151",
    }),
  };

  return (
    <>
      <div className="w-full max-w-sm rounded-md shadow-md mx-4 p-4 bg-white sm:p-5 lg:max-w-md lg:p-7">
        <h1 className="font-medium text-xl select-none">BACA QURAN</h1>
        <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
          <Select
            isClearable={true}
            className="mb-4 rounded-md"
            options={listNamaSurat}
            placeholder="Nama Surat"
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#d1fae5",
                primary: "#10B981",
              },
            })}
            onChange={(e) => setId(e ? e.value : null)}
          />

          <button className="btn font-medium px-4 py-2">BUKA</button>
        </form>
      </div>
    </>
  );
}
