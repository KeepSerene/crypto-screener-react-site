import { useCryptoContext } from "../context/CryptoContextProvider";

/*
====================================
https://docs.coingecko.com/v3.0.1/reference/search-data
=====================================
*/

function SearchFilter() {
  const {
    searchInput,
    setSearchInput,
    areSuggestionsLoading: isLoading,
    suggestionsErrorMsg: errorMsg,
    searchSuggestions,
    hasSearchResponse,
    setSearchedCoin,
  } = useCryptoContext();

  const handleSearchInput = (event) => {
    event.preventDefault();

    setSearchInput(event.target.value);
  };

  const coins = searchSuggestions?.coins;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (coins?.length > 0) {
      setSearchedCoin(coins[0]);
      setSearchInput("");
    }
  };

  const handleClick = (coin) => {
    setSearchedCoin(coin);
    setSearchInput("");
  };

  return (
    <div className="relative">
      <form className="relative" onSubmit={handleSubmit}>
        <label htmlFor="crypto-input" className="sr-only">
          Start typing the name of a cryptocurrency to see suggestions
        </label>

        <input
          type="text"
          name="searchCryptoCurrency"
          id="crypto-input"
          onChange={handleSearchInput}
          value={searchInput}
          placeholder="Search cryptos..."
          className="w-full bg-customGray-200 text-white placeholder:text-customGray-100 px-[0.5rem] py-[0.2rem] outline-none border border-transparent rounded transition-colors focus-within:border-primary"
        />

        <button
          type="submit"
          aria-label="Click to search the cryptocurrency of your choice"
          className="text-customGray-100 transition-colors hover:text-primary focus-visible:text-primary absolute top-[0.2rem] right-[0.5rem]"
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>

      {/* Search suggetions */}
      {searchInput.trim().length > 0 && (
        <ul
          style={{ backgroundColor: "hsla(var(--custom-gray-200) / 0.6)" }}
          className="h-96 backdrop-blur-md text-sm rounded p-2 overflow-y-auto grid content-start gap-2 absolute left-0 top-[calc(100%+0.25rem)] right-0 -bottom-1"
        >
          {isLoading && (
            <li className="text-customGray-100 text-center">Loading...</li>
          )}

          {errorMsg && <li className="text-customRed">{errorMsg}</li>}

          {!isLoading && !errorMsg && hasSearchResponse && (
            <>
              {coins.length > 0 ? (
                coins.map((coin) => (
                  <li
                    key={coin.id}
                    tabIndex={0}
                    onClick={() => handleClick(coin)}
                    className="flex items-center gap-2 cursor-pointer transition-colors hover:text-primary focus-within:text-primary"
                  >
                    <img
                      src={coin.thumb}
                      alt={`${coin.name} icon`}
                      loading="lazy"
                      className="size-4"
                    />

                    <span>{coin.name}</span>
                  </li>
                ))
              ) : (
                <li className="text-customGray-100 text-center">
                  No coins found!
                </li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
export default SearchFilter;
