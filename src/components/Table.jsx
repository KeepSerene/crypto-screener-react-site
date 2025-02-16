// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// Library import
import { Link } from "react-router-dom";

// Component imports
import Footer from "./Footer";
import SaveButton from "./SaveButton";

// Helper function imports
import { formatCurrency, safeGet } from "../utils/helpers";

function Table() {
  const {
    cryptos,
    areCryptosLoading: isLoading,
    cryptosErrorMsg: errorMsg,
    currency,
  } = useCryptoContext();

  return (
    <>
      <div className="border border-customGray-100 rounded">
        {isLoading ? (
          <div className="max-w-80 text-center mx-auto p-8 flex items-center gap-2">
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
            {cryptos?.length > 0 && (
              <table className="w-full table-auto">
                <caption className="sr-only">Cryptocurrency list</caption>

                <thead className="text-customGray-100 font-medium capitalize border-b border-customGray-100">
                  <tr>
                    <th className="py-1">Asset</th>
                    <th className="hidden md:table-cell py-1">Name</th>
                    <th className="hidden md:table-cell py-1">Total volume</th>
                    <th className="hidden sm:table-cell py-1">
                      Market cap change
                    </th>
                    <th className="py-1">Price</th>
                    <th className="hidden md:table-cell py-1">1H</th>
                    <th className="hidden md:table-cell py-1">24H</th>
                    <th className="hidden md:table-cell py-1">7D</th>
                  </tr>
                </thead>

                <tbody className="text-sm text-center">
                  {cryptos.map((crypto) => (
                    <tr
                      key={safeGet(crypto, "id")}
                      tabIndex={0}
                      className="[&:not(:last-child)]:border-b border-customGray-100 hover:bg-customGray-200 focus-within:bg-customGray-200"
                    >
                      {/* Save button, image, & Symbol */}
                      <td className="uppercase py-4 flex justify-center items-center gap-2">
                        <SaveButton coin={crypto} />

                        <Link
                          to={`/${safeGet(crypto, "id")}`}
                          className="flex items-center gap-2 transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          <img
                            src={safeGet(crypto, "image")}
                            alt={`${safeGet(crypto, "name")} icon`}
                            loading="lazy"
                            className="w-[1.2rem] h-[1.2rem]"
                          />

                          <span
                            aria-label={safeGet(crypto, "symbol")}
                            title={safeGet(crypto, "symbol").toUpperCase()}
                          >
                            {safeGet(crypto, "symbol").length > 9
                              ? `${safeGet(crypto, "symbol").slice(0, 6)}...`
                              : safeGet(crypto, "symbol")}
                          </span>
                        </Link>
                      </td>

                      {/* Name */}
                      <td
                        aria-label={safeGet(crypto, "name")}
                        title={safeGet(crypto, "name")}
                        className="hidden md:table-cell py-4"
                      >
                        <Link
                          to={`/${safeGet(crypto, "id")}`}
                          aria-label={safeGet(crypto, "name")}
                          title={safeGet(crypto, "name")}
                          className="transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          {safeGet(crypto, "name").length > 10
                            ? `${safeGet(crypto, "name").slice(0, 8)}...`
                            : safeGet(crypto, "name")}
                        </Link>
                      </td>

                      {/* Total volume */}
                      <td className="hidden md:table-cell py-4">
                        {safeGet(crypto, "total_volume")}
                      </td>

                      {/* Market cap change percentage */}
                      <td className="hidden sm:table-cell py-4">
                        {safeGet(crypto, "market_cap_change_percentage_24h") !==
                        "N/A"
                          ? `${safeGet(
                              crypto,
                              "market_cap_change_percentage_24h"
                            ).toFixed(2)}%`
                          : "N/A"}
                      </td>

                      {/* Current price */}
                      <td className="py-4">
                        {formatCurrency(
                          safeGet(crypto, "current_price", 0),
                          currency,
                          {
                            maximumSignificantDigits: 5,
                          }
                        )}
                      </td>

                      {/* Price change percentage in 1 hour */}
                      <td
                        className={`hidden md:table-cell ${
                          safeGet(
                            crypto,
                            "price_change_percentage_1h_in_currency",
                            0
                          ) > 0
                            ? "text-customGreen"
                            : "text-customRed"
                        } py-4`}
                      >
                        {safeGet(
                          crypto,
                          "price_change_percentage_1h_in_currency"
                        ) !== "N/A"
                          ? safeGet(
                              crypto,
                              "price_change_percentage_1h_in_currency"
                            ).toFixed(2)
                          : "N/A"}
                      </td>

                      {/* Price change percentage in 24 hour */}
                      <td
                        className={`hidden md:table-cell ${
                          safeGet(
                            crypto,
                            "price_change_percentage_24h_in_currency",
                            0
                          ) > 0
                            ? "text-customGreen"
                            : "text-customRed"
                        } py-4`}
                      >
                        {safeGet(
                          crypto,
                          "price_change_percentage_24h_in_currency"
                        ) !== "N/A"
                          ? safeGet(
                              crypto,
                              "price_change_percentage_24h_in_currency"
                            ).toFixed(2)
                          : "N/A"}
                      </td>

                      {/* Price change percentage in 7 days */}
                      <td
                        className={`hidden md:table-cell ${
                          safeGet(
                            crypto,
                            "price_change_percentage_7d_in_currency"
                          ) > 0
                            ? "text-customGreen"
                            : "text-customRed"
                        } py-4`}
                      >
                        {safeGet(
                          crypto,
                          "price_change_percentage_7d_in_currency"
                        ) !== "N/A"
                          ? safeGet(
                              crypto,
                              "price_change_percentage_7d_in_currency"
                            ).toFixed(2)
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Table;
