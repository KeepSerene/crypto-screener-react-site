// Context imports
import { useSavedContext } from "../contexts/SavedContextProvider";
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// React imports
import { useEffect, useState } from "react";

// Component import
import SaveButton from "../components/SaveButton";

// Library imports
import { Link, Outlet } from "react-router-dom";

function Saved() {
  const { savedCoinIds, resetSavedCoins } = useSavedContext();
  const { currency, sortOption } = useCryptoContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [savedCoins, setSavedCoins] = useState(null);

  // ==================== FETCH SAVED COINS ======================
  useEffect(() => {
    if (savedCoinIds.length > 0) {
      const fetchCoins = async () => {
        setIsLoading(true);
        setErrorMsg("");

        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency
              .trim()
              .toLowerCase()}&ids=${savedCoinIds.join(
              ","
            )}&order=${sortOption}&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch saved coins!");
          }

          const data = await response.json();

          setSavedCoins(data);
        } catch (err) {
          console.error(err);
          setErrorMsg(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCoins();
    } else {
      setSavedCoins(null);
    }
  }, [savedCoinIds, currency, sortOption]);

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={resetSavedCoins}
        aria-label="Reset"
        title="Reset"
        className="justify-self-end text-customGray-100 transition-colors hover:text-primary focus-visible:text-primary"
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>

      <div className="border border-customGray-100 rounded">
        {isLoading ? (
          <div className="max-w-80 mx-auto p-8 flex items-center gap-2">
            {/* Spinner */}
            <div
              role="status"
              className="w-8 h-8 border-4 border-primary border-b-customGray-200 rounded-full animate-spin"
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
            {savedCoins?.length > 0 ? (
              <>
                <table className="w-full table-auto">
                  <caption className="sr-only">Saved coins list</caption>

                  <thead className="text-customGray-100 font-medium capitalize border-b border-customGray-100">
                    <tr>
                      <th className="py-1">Asset</th>
                      <th className="py-1">Name</th>
                      <th className="py-1">Total volume</th>
                      <th className="py-1">Market cap change</th>
                      <th className="py-1">Price</th>
                      <th className="py-1">1H</th>
                      <th className="py-1">24H</th>
                      <th className="py-1">7D</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm text-center">
                    {savedCoins.map((coin) => (
                      <tr
                        key={coin.id}
                        tabIndex={0}
                        className="[&:not(:last-child)]:border-b border-customGray-100 hover:bg-customGray-200 focus-within:bg-customGray-200"
                      >
                        {/* Save button, image, & Symbol */}
                        <td className="uppercase py-4 flex items-center gap-2">
                          <SaveButton coin={coin} />

                          <Link
                            to={coin.id}
                            className="flex items-center gap-2 transition-colors hover:text-primary focus-visible:text-primary"
                          >
                            <img
                              src={coin.image}
                              alt={`${coin.name} icon`}
                              loading="lazy"
                              className="w-[1.2rem] h-[1.2rem]"
                            />

                            <span>{coin.symbol}</span>
                          </Link>
                        </td>

                        {/* Name */}
                        <td
                          aria-label={coin.name}
                          title={coin.name}
                          className="py-4"
                        >
                          <Link
                            to={`/${coin.id}`}
                            className="transition-colors hover:text-primary focus-visible:text-primary"
                          >
                            {coin.name.length > 12
                              ? `${coin.name.slice(0, 10)}...`
                              : coin.name}
                          </Link>
                        </td>

                        {/* Total volume */}
                        <td className="py-4">
                          {coin.total_volume ? coin.total_volume : "N/A"}
                        </td>

                        {/* Market cap change percentage */}
                        <td className="py-4">
                          {coin.market_cap_change_percentage_24h !== null
                            ? `${coin.market_cap_change_percentage_24h.toFixed(
                                2
                              )}%`
                            : "N/A"}
                        </td>

                        {/* Current price */}
                        <td className="py-4">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: currency.trim(),
                            maximumSignificantDigits: 5,
                          }).format(
                            coin.current_price !== null ? coin.current_price : 0
                          )}
                        </td>

                        {/* Price change percentage in 1 hour */}
                        <td
                          className={`${
                            coin.price_change_percentage_1h_in_currency > 0
                              ? "text-customGreen"
                              : "text-customRed"
                          } py-4`}
                        >
                          {coin.price_change_percentage_1h_in_currency?.toFixed(
                            2
                          ) || "N/A"}
                        </td>

                        {/* Price change percentage in 24 hour */}
                        <td
                          className={`${
                            coin.price_change_percentage_24h_in_currency > 0
                              ? "text-customGreen"
                              : "text-customRed"
                          } py-4`}
                        >
                          {coin.price_change_percentage_24h_in_currency?.toFixed(
                            2
                          ) || "N/A"}
                        </td>

                        {/* Price change percentage in 7 days */}
                        <td
                          className={`${
                            coin.price_change_percentage_7d_in_currency > 0
                              ? "text-customGreen"
                              : "text-customRed"
                          } py-4`}
                        >
                          {coin.price_change_percentage_7d_in_currency?.toFixed(
                            2
                          ) || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Outlet />
              </>
            ) : (
              <h1 className="text-customGray-100 text-base font-semibold text-center p-4">
                No saved coins to display! Save a coin first.
              </h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Saved;
