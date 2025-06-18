import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <form className="bg-[#1f1e24] rounded-lg shadow-md">
      <select
        defaultValue="0"
        onChange={func}
        className="bg-[#1f1e24] border text-xs border-[#524898] text-white md:text-sm rounded-lg focus:ring-[#6556cd] focus:border-[#6556cd] block w-full max-w-[180px] p-2.5 placeholder-white"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </form>
  );
}

export default Dropdown;
