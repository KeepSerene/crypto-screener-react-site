// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// React import
import { useRef } from "react";

function CurrencyFilter() {
  const { setCurrency } = useCryptoContext();

  const currencyInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currencyInputRef.current) {
      if (!currencyInputRef.current.value.trim()) return;

      setCurrency(currencyInputRef.current.value);
      currencyInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:justify-self-center flex items-center gap-2"
    >
      <label
        htmlFor="currency-input"
        className="text-customGray-100 font-bold text-sm"
      >
        Currency:
      </label>

      <input
        type="text"
        id="currency-input"
        ref={currencyInputRef}
        placeholder="usd"
        required
        className="w-16 bg-customGray-200 border border-transparent rounded px-[0.5rem] py-[0.2rem] placeholder:text-customGray-100 outline-none transition-colors focus-within:border-primary"
      />

      <button
        type="submit"
        aria-label="Click to enter your preferred currency"
        title="Enter currency"
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

export default CurrencyFilter;
