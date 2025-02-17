// Library imports
import { useNavigate, useParams } from "react-router-dom";

// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// React imports
import { useEffect, useRef } from "react";

// Component imports
import CryptoDetailsLeft from "../components/CryptoDetailsLeft";
import CryptoDetailsRight from "../components/CryptoDetailsRight";

// Helper function import
import { safeGet } from "../utils/helpers";

function CryptoDetails() {
  const { coinId } = useParams();
  const navigate = useNavigate();

  const {
    currency,
    fetchCoinDataById,
    coinData,
    setCoinData,
    isCoinDataLoading: isLoading,
    coinDataErrorMsg: errorMsg,
  } = useCryptoContext();

  const abortControllerRef = useRef(null);

  // Fetch crypto details
  useEffect(() => {
    abortControllerRef.current = new AbortController();

    fetchCoinDataById(coinId, { signal: abortControllerRef.current.signal });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      setCoinData(null);
    };
  }, [coinId]);

  return (
    <div
      onClick={() => navigate(-1)}
      role="presentation"
      className="bg-customGray-200/30 backdrop-blur-sm flex justify-center items-center fixed inset-0 z-[100]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="crypto-details-title"
        className="w-[90%] sm:w-[80%] md:w-[90%] lg:w-[70%] h-[80vh] md:h-auto bg-customGray-300/75 rounded-lg p-4 max-md:overflow-y-auto"
      >
        {isLoading ? (
          <div className="max-w-80 mx-auto p-8 flex items-center gap-2">
            {/* Spinner */}
            <div
              role="status"
              className="w-8 h-8 border-[3px] border-primary border-b-customGray-200 rounded-full animate-spin"
            />

            <span className="text-customGray-100 text-base">Loading...</span>
          </div>
        ) : !isLoading && errorMsg ? (
          <p
            role="alert"
            className="text-customRed font-medium text-center p-4"
          >
            {errorMsg}
          </p>
        ) : (
          <>
            {coinData && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-4">
                  {/* Icon, name, & symbol */}
                  <section className="flex items-center gap-3 flex-wrap">
                    <img
                      src={safeGet(coinData, "image.large")}
                      alt={`${safeGet(coinData, "name")}'s icon`}
                      className="w-[3rem] h-[3rem]"
                    />

                    <h2
                      id="crypto-details-title"
                      className="text-xl font-medium capitalize"
                    >
                      {safeGet(coinData, "name")}
                    </h2>

                    <span className="bg-primary/25 text-primary text-sm uppercase rounded px-2.5 py-0.5">
                      {safeGet(coinData, "symbol")}
                    </span>
                  </section>

                  {/* Left side */}
                  <CryptoDetailsLeft coinData={coinData} currency={currency} />
                </div>

                {/* Right side */}
                <CryptoDetailsRight
                  coinId={coinId}
                  coinData={coinData}
                  currency={currency}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CryptoDetails;
