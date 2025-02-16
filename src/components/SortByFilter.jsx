// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// React import
import { useRef } from "react";

function SortByFilter() {
  const { sortOption, setSortOption } = useCryptoContext();

  const selectRef = useRef(null);

  const sortOptions = [
    "market_cap_desc",
    "market_cap_asc",
    "volume_asc",
    "volume_desc",
    "id_asc",
    "id_desc",
  ];

  return (
    <label
      htmlFor="select-sort-option"
      className="max-md:row-start-3 max-md:col-span-full md:justify-self-center text-sm flex items-center gap-2 relative"
    >
      <span className="text-customGray-100 font-bold">Sort by:</span>

      <select
        id="select-sort-option"
        ref={selectRef}
        value={sortOption}
        onChange={() => setSortOption(selectRef.current.value)}
        className="appearance-none max-md:flex-1 bg-customGray-200 font-nunito capitalize border border-transparent rounded pl-2 py-1 pr-8 outline-none cursor-pointer transition-colors focus-within:border-primary"
      >
        {sortOptions.map((opt, index) => (
          <option key={index} value={opt} className="capitalize">
            {opt.split("_").join(" ")}
          </option>
        ))}
      </select>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 absolute top-1/2 -translate-y-1/2 right-1.5 cursor-pointer pointer-events-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </label>
  );
}

export default SortByFilter;
