import { createContext, useContext, useEffect, useState } from "react";

const CryptoContext = createContext();

export default function CryptoContextProvider({ children }) {
  const [cryptoData, setCryptoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCryptoData = async () => {
      setIsLoading(true);
      setErrorMsg("");

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1&price_change_percentage=1h%2C24h%2C7d"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data! Try again later...");
        }

        const data = await response.json();

        setCryptoData(data);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptoData, isLoading, errorMsg }}>
      {children}
    </CryptoContext.Provider>
  );
}

export const useCryptoContext = () => useContext(CryptoContext);
