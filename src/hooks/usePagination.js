// Context import
import { useCryptoContext } from "../context/CryptoContextProvider";

// React import
import { useMemo, useState } from "react";

function usePagination() {
  const { cryptos, totalCryptoCount, perPageCryptoCount } = useCryptoContext();

  const [currentPageNum, setCurrentPageNum] = useState(1);

  const paginatedCryptos = useMemo(() => {
    const startIndex = (currentPageNum - 1) * perPageCryptoCount;

    return cryptos?.slice(startIndex, startIndex + perPageCryptoCount);
  }, [cryptos, currentPageNum, perPageCryptoCount]);

  const totalPageCount = Math.ceil(totalCryptoCount / perPageCryptoCount);

  return {
    currentPageNum,
    setCurrentPageNum,
    paginatedCryptos,
    totalPageCount,
  };
}

export default usePagination;
