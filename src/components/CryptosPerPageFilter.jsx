// Context import
import { useCryptoContext } from "../context/CryptoContextProvider";

// React import
import { useRef } from "react";

function CryptosPerPageFilter() {
  const { setPerPageCryptoCount } = useCryptoContext();

  const numberInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setPerPageCryptoCount(numberInputRef.current.value);
    numberInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="justify-self-end flex items-center gap-2"
    >
      <label
        htmlFor="cryptos-per-page-input"
        className="text-customGray-100 font-bold text-sm"
      >
        cryptos / page:
      </label>

      <input
        type="number"
        id="cryptos-per-page-input"
        ref={numberInputRef}
        min={1}
        max={250}
        step={1}
        placeholder="10"
        required
        className="w-16 bg-customGray-200 text-white border border-transparent rounded px-[0.5rem] py-[0.2rem] placeholder:text-customGray-100 outline-none transition-colors focus-within:border-primary"
      />

      <button
        type="submit"
        aria-label="Click to enter your preferred per page crypto count"
        title="Enter cryptos/page"
        className="text-customGray-100 transition-colors hover:text-primary focus-visible:text-primary"
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
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
          />
        </svg>
      </button>
    </form>
  );
}

export default CryptosPerPageFilter;
