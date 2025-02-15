// React imports
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
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalCryptoCount, setTotalCryptoCount] = useState(0);
  const [perPageCryptoCount, setPerPageCryptoCount] = useState(10);
  const [coinData, setCoinData] = useState(null);
  const [isCoinDataLoading, setIsCoinDataLoading] = useState(false);
  const [coinDataErrorMsg, setCoinDataErrorMsg] = useState("");

  // To always get the latest value of "searchInput":
  const searchInputRef = useRef(searchInput);

  // ================== CRYPTOS ==================
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
          }&order=${sortOption}&per_page=${perPageCryptoCount}&page=${currentPageNum}&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full`
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
  }, [searchedCoin, currency, sortOption, currentPageNum, perPageCryptoCount]);

  // ================== SEARCH SUGGESTIONS =====================
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

  // ================== TOTAL CRYPTO COUNT =====================
  useEffect(() => {
    const fetchTotalCryptoCount = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch total crypto count!");
        }

        const data = await response.json();

        setTotalCryptoCount(data?.length || 1);
      } catch (err) {
        console.error(err);

        // Fallback value
        setTotalCryptoCount(1);
      }
    };

    fetchTotalCryptoCount();
  }, []);

  // ================== RESET ==================
  const reset = () => {
    setCryptos(null);
    setSearchSuggestions(null);
    setSearchInput("");
    setSearchedCoin(null);
    setCurrency("usd");
    setSortOption("market_cap_desc");
    setCurrentPageNum(1);
    setPerPageCryptoCount(10);
    setShouldSaveCoin(false);
    setSavedCoinId("");
  };

  // ================== FETCH COIN DATA BY ID ==================
  const fetchCoinDataById = async (coinId, options) => {
    setIsCoinDataLoading(true);
    setCoinDataErrorMsg("");

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coin data!");
      }

      const data = await response.json();

      setCoinData(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
        setCoinDataErrorMsg(err.message);
      }
    } finally {
      if (!options.signal.aborted) {
        setIsCoinDataLoading(false);
      }
    }
  };

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
        searchedCoin,
        setSearchedCoin,
        currency,
        setCurrency,
        sortOption,
        setSortOption,
        reset,
        currentPageNum,
        setCurrentPageNum,
        totalCryptoCount,
        perPageCryptoCount,
        setPerPageCryptoCount,
        coinData,
        setCoinData,
        fetchCoinDataById,
        isCoinDataLoading,
        coinDataErrorMsg,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export const useCryptoContext = () => useContext(CryptoContext);
