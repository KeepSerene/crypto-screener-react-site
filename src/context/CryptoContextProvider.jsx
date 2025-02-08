// React import
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Library import
import debounce from "lodash.debounce";

const CryptoContext = createContext();

export default function CryptoContextProvider({ children }) {
  const [cryptos, setCryptos] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [hasSearchResponse, setHasSearchResponse] = useState(false);
  const [searchedCoin, setSearchedCoin] = useState(null);
  const [areCryptosLoading, setAreCryptosLoading] = useState(false);
  const [areSuggestionsLoading, setAreSuggestionsLoading] = useState(false);
  const [cryptosErrorMsg, setCryptosErrorMsg] = useState("");
  const [suggestionsErrorMsg, setSuggestionsErrorMsg] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortOption, setSortOption] = useState("market_cap_desc");
  const [totalCryptoCount, setTotalCryptoCount] = useState(100);
  const [perPageCryptoCount, setPerPageCryptoCount] = useState(10);

  const searchInputRef = useRef(searchInput); // To always get the latest value of "searchInput"

  // ================== CRYPTOS ===================
  useEffect(() => {
    const fetchCryptos = async () => {
      setAreCryptosLoading(true);
      setCryptosErrorMsg("");

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency
            .trim()
            .toLowerCase()}${
            searchedCoin ? `&ids=${searchedCoin.id}` : ""
          }&order=${sortOption}&per_page=${perPageCryptoCount}&page=1&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${
              searchedCoin ? "crypto" : "cryptos"
            }! Try again later.`
          );
        }

        const data = await response.json();

        setCryptos(data);
      } catch (err) {
        console.error(err);
        setCryptosErrorMsg(err.message);
      } finally {
        setAreCryptosLoading(false);
      }
    };

    fetchCryptos();
  }, [searchedCoin, currency, sortOption]);

  // ================== SEARCH SUGGESTIONS ====================
  useEffect(() => {
    searchInputRef.current = searchInput;
    const controller = new AbortController();

    const fetchSearchSuggetions = async (query) => {
      if (!query.trim()) return;

      setAreSuggestionsLoading(true);
      setSuggestionsErrorMsg("");

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${query.trim()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch search suggestions! Try again later."
          );
        }

        const data = await response.json();

        setSearchSuggestions(data);
        setHasSearchResponse(true);
      } catch (err) {
        console.error(err);
        setSuggestionsErrorMsg(err.message);
      } finally {
        setAreSuggestionsLoading(false);
      }
    };

    const debouncedFetch = debounce(() => {
      fetchSearchSuggetions(searchInputRef.current);
    }, 2000);

    debouncedFetch();

    return () => {
      controller.abort();
      debouncedFetch.cancel();
      setSearchSuggestions(null);
      setHasSearchResponse(false);
    };
  }, [searchInput]);

  return (
    <CryptoContext.Provider
      value={{
        areCryptosLoading,
        cryptosErrorMsg,
        areSuggestionsLoading,
        suggestionsErrorMsg,
        cryptos,
        searchSuggestions,
        searchInput,
        setSearchInput,
        hasSearchResponse,
        setSearchedCoin,
        currency,
        setCurrency,
        sortOption,
        setSortOption,
        totalCryptoCount,
        perPageCryptoCount,
        setPerPageCryptoCount,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export const useCryptoContext = () => useContext(CryptoContext);
