import { createContext, useContext, useEffect, useState } from "react";

const SavedContext = createContext();

export default function SavedContextProvider({ children }) {
  const [savedCoinIds, setSavedCoinIds] = useState([]);

  // ================== LOAD SAVED COINS ====================
  useEffect(() => {
    const storedCoinIds = JSON.parse(localStorage.getItem("savedCoins")) ?? [];
    setSavedCoinIds(storedCoinIds);
  }, []);

  const handleSaveCoinId = (coinId) => {
    const updatedCoinIds = [...savedCoinIds, coinId];
    setSavedCoinIds(updatedCoinIds);
    localStorage.setItem("savedCoinIds", JSON.stringify(updatedCoinIds));
  };

  const handleUnsaveCoinId = (coinId) => {
    const updatedCoinIds = savedCoinIds.filter((id) => id !== coinId);
    setSavedCoinIds(updatedCoinIds);
    localStorage.setItem("savedCoinIds", JSON.stringify(updatedCoinIds));
  };

  const resetSavedCoins = () => {
    setSavedCoinIds([]);
    localStorage.setItem("savedCoinIds", JSON.stringify([]));
  };

  return (
    <SavedContext.Provider
      value={{
        savedCoinIds,
        handleSaveCoinId,
        handleUnsaveCoinId,
        resetSavedCoins,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export const useSavedContext = () => useContext(SavedContext);
