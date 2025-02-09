// Library import
import { useNavigate, useParams } from "react-router-dom";

// Context import
import { useCryptoContext } from "../context/CryptoContextProvider";

// React import
import { useEffect } from "react";

function CryptoDetailsModal() {
  const { coinId } = useParams();
  const navigate = useNavigate();

  const {
    fetchCoinDataById,
    coinData,
    setCoinData,
    isCoinDataLoading: isLoading,
    coinDataErrorMsg: errorMsg,
  } = useCryptoContext();

  useEffect(() => {
    const controller = new AbortController();

    fetchCoinDataById(coinId, { signal: controller.signal });

    return () => {
      controller.abort();
      setCoinData(null);
    };
  }, [coinId]);

  return (
    <div
      onClick={() => navigate(-1)}
      className="bg-customGray-200/30 backdrop-blur-sm flex justify-center items-center absolute inset-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[65%] bg-customGray-300/75 rounded-lg p-4"
      >
        <>
          {coinData && (
            <section>
              <h1>Coin name: {coinData.name}</h1>
            </section>
          )}
        </>
      </div>
    </div>
  );
}

export default CryptoDetailsModal;
