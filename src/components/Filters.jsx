// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// Component imports
import SearchFilter from "./SearchFilter";
import CurrencyFilter from "./CurrencyFilter";
import SortByFilter from "./SortByFilter";

function Filters() {
  const { reset } = useCryptoContext();

  return (
    <div className="border-2 border-customGray-100 rounded-lg px-4 py-2 grid grid-cols-[1fr_1fr_1fr_50px] gap-4">
      <SearchFilter />
      <CurrencyFilter />
      <SortByFilter />

      <button
        type="button"
        onClick={reset}
        aria-label="Reset"
        title="Reset"
        className="justify-self-center text-customGray-100 transition-colors hover:text-primary focus-visible:text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
}

export default Filters;
