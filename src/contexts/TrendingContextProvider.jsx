import { createContext, useContext, useEffect, useState } from "react";

const TrendingContext = createContext();

export default function TrendingContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [trendingCryptos, setTrendingCryptos] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // ================== TRENDING CRYPTOS ==================
  useEffect(() => {
    const fetchTrendingCryptos = async () => {
      setIsLoading(true);
      setErrorMsg("");

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trending cryptos!");
        }

        const data = await response.json();

        setTrendingCryptos(data);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
        setShouldRefresh(false);
      }
    };

    fetchTrendingCryptos();
  }, [shouldRefresh]);

  // ================== REFRESH ==================
  const refreshTrendingCoins = () => {
    setTrendingCryptos(null);
    setShouldRefresh(true);
  };

  return (
    <TrendingContext.Provider
      value={{
        isLoading,
        errorMsg,
        trendingCryptos,
        refreshTrendingCoins,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
}

export const useTrendingContext = () => useContext(TrendingContext);
