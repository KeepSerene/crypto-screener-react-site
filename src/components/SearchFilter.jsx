import { useCryptoContext } from "../contexts/CryptoContextProvider";

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
    <div className="col-span-full lg:col-span-1 relative">
      <form className="relative" onSubmit={handleSubmit}>
        <label htmlFor="crypto-input" className="sr-only">
          Start typing the name of a cryptocurrency to see suggestions
        </label>

        <input
          type="text"
          id="crypto-input"
          onChange={handleSearchInput}
          value={searchInput}
          placeholder="Search cryptos..."
          className="w-full bg-customGray-200 text-white placeholder:text-customGray-100 px-[0.5rem] py-[0.2rem] outline-none border border-transparent rounded transition-colors focus-within:border-primary"
        />

        <button
          type="submit"
          aria-label="Click to search the cryptocurrency of your choice"
          title="Search cryptos"
          className="text-customGray-100 transition-colors hover:text-primary focus-visible:text-primary absolute top-1/2 -translate-y-1/2 right-[0.5rem]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
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
      <>
        {searchInput.trim().length > 0 && (
          <ul
            className={`h-96 bg-customGray-200/60 backdrop-blur-md text-sm rounded p-2 overflow-y-auto grid ${
              coins?.length === 0 || isLoading || errorMsg
                ? "grid-rows-1"
                : "content-start"
            }  gap-2 absolute left-0 top-[calc(100%+0.25rem)] right-0 -bottom-1 z-10`}
          >
            {isLoading && (
              <li className="h-full flex justify-center items-center">
                <div className="flex items-center gap-2">
                  {/* Spinner */}
                  <div
                    role="status"
                    className="w-8 h-8 border-[3px] border-primary border-b-customGray-200 rounded-full animate-spin"
                  />

                  <span className="text-customGray-100 text-base">
                    Searching...
                  </span>
                </div>
              </li>
            )}

            {errorMsg && (
              <li className="h-full text-customRed text-base flex justify-center items-center">
                {errorMsg}
              </li>
            )}

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
                  <li className="h-full text-customGray-100 text-base flex justify-center items-center">
                    No coins found!
                  </li>
                )}
              </>
            )}
          </ul>
        )}
      </>
    </div>
  );
}

export default SearchFilter;
