// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// Library import
import { Link } from "react-router-dom";

// Component imports
import Footer from "./Footer";
import SaveButton from "./SaveButton";

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
            {cryptos?.length > 0 && (
              <table className="w-full table-auto">
                <caption className="sr-only">Cryptocurrency list</caption>

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
                  {cryptos.map((crypto) => (
                    <tr
                      key={crypto.id}
                      tabIndex={0}
                      className="[&:not(:last-child)]:border-b border-customGray-100 hover:bg-customGray-200 focus-within:bg-customGray-200"
                    >
                      {/* Save button, image, & Symbol */}
                      <td className="uppercase py-4 flex items-center gap-2">
                        <SaveButton coin={crypto} />

                        <Link
                          to={`/${crypto.id}`}
                          className="flex items-center gap-2 transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          <img
                            src={crypto.image}
                            alt={`${crypto.name} icon`}
                            loading="lazy"
                            className="w-[1.2rem] h-[1.2rem]"
                          />

                          <span>{crypto.symbol}</span>
                        </Link>
                      </td>

                      {/* Name */}
                      <td
                        aria-label={crypto.name}
                        title={crypto.name}
                        className="py-4"
                      >
                        <Link
                          to={`/${crypto.id}`}
                          className="transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          {crypto.name.length > 12
                            ? `${crypto.name.slice(0, 10)}...`
                            : crypto.name}
                        </Link>
                      </td>

                      {/* Total volume */}
                      <td className="py-4">
                        {crypto.total_volume ? crypto.total_volume : "N/A"}
                      </td>

                      {/* Market cap change percentage */}
                      <td className="py-4">
                        {crypto.market_cap_change_percentage_24h !== null
                          ? `${crypto.market_cap_change_percentage_24h.toFixed(
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
                          crypto.current_price !== null
                            ? crypto.current_price
                            : 0
                        )}
                      </td>

                      {/* Price change percentage in 1 hour */}
                      <td
                        className={`${
                          crypto.price_change_percentage_1h_in_currency > 0
                            ? "text-customGreen"
                            : "text-customRed"
                        } py-4`}
                      >
                        {crypto.price_change_percentage_1h_in_currency?.toFixed(
                          2
                        ) || "N/A"}
                      </td>

                      {/* Price change percentage in 24 hour */}
                      <td
                        className={`${
                          crypto.price_change_percentage_24h_in_currency > 0
                            ? "text-customGreen"
                            : "text-customRed"
                        } py-4`}
                      >
                        {crypto.price_change_percentage_24h_in_currency?.toFixed(
                          2
                        ) || "N/A"}
                      </td>

                      {/* Price change percentage in 7 days */}
                      <td
                        className={`${
                          crypto.price_change_percentage_7d_in_currency > 0
                            ? "text-customGreen"
                            : "text-customRed"
                        } py-4`}
                      >
                        {crypto.price_change_percentage_7d_in_currency?.toFixed(
                          2
                        ) || "N/A"}
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
