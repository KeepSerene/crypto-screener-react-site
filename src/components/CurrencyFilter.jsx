// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// React import
import { useEffect, useState } from "react";

// Helper imports
import {
  isSupportedCurrency,
  SUPPORTED_CURRENCIES,
} from "../utils/currencyCodes";

function CurrencyFilter() {
  const { currency, setCurrency } = useCryptoContext();

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  // Related to the reset button
  useEffect(() => {
    if (currency === "usd") {
      setInputValue("");
    }
  }, [currency]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const currencyInput = inputValue.trim().toLowerCase();

    if (!currencyInput) return;

    if (isSupportedCurrency(currencyInput)) {
      setCurrency(currencyInput);
      setInputValue("");
      setError("");
    } else {
      setError(
        `Invalid currency! Please use one of: ${SUPPORTED_CURRENCIES.slice(0, 5)
          .join(", ")
          .toUpperCase()}...`
      );

      setTimeout(() => {
        setError("");
      }, 7000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:justify-self-center flex items-center gap-2 relative"
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
        name="currencyInput"
        list="currency-suggestions"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="usd"
        required
        className={`w-16 bg-customGray-200 border border-transparent rounded px-[0.5rem] py-[0.2rem] placeholder:text-customGray-100 outline-none transition-colors ${
          error
            ? "focus-within:border-customRed"
            : "focus-within:border-primary"
        }`}
      />

      <datalist id="currency-suggestions">
        {SUPPORTED_CURRENCIES.map((currencyCode) => (
          <option key={currencyCode} value={currencyCode.toUpperCase()} />
        ))}
      </datalist>

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

      {error && (
        <p className="w-full bg-customGray-200/60 backdrop-blur-md text-customRed text-sm font-medium border border-customRed rounded p-2 absolute bottom-10 left-0 z-20">
          {error}
        </p>
      )}
    </form>
  );
}

export default CurrencyFilter;
