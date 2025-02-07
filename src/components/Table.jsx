// Context import
import { useCryptoContext } from "../context/CryptoContextProvider";

function Table() {
  const {
    cryptos,
    areCryptosLoading: isLoading,
    cryptosErrorMsg: errorMsg,
    currency,
  } = useCryptoContext();

  if (isLoading) return <p className="text-customGray-100">Loading...</p>;

  if (errorMsg) return <p className="text-customRed">{errorMsg}</p>;

  return (
    <div className="border border-customGray-100 rounded">
      {cryptos && (
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
            {cryptos.map((data) => (
              <tr
                key={data.id}
                tabIndex={0}
                className="[&:not(:last-child)]:border-b border-customGray-100 hover:bg-customGray-200 focus-within:bg-customGray-200"
              >
                <td className="uppercase py-4 flex items-center gap-2">
                  <button
                    type="button"
                    className="text-customGray-100 ml-2 transition-colors hover:text-primary focus-visible:text-primary"
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
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>

                    {/* 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>

                    */}
                  </button>

                  <img
                    src={data.image}
                    alt={`${data.name} icon`}
                    loading="lazy"
                    className="w-[1.2rem] h-[1.2rem]"
                  />

                  <span>{data.symbol}</span>
                </td>

                <td className="py-4">{data.name}</td>

                <td className="py-4">
                  {data.total_volume ? data.total_volume : "N/A"}
                </td>

                <td className="py-4">
                  {data.market_cap_change_percentage_24h !== null
                    ? `${data.market_cap_change_percentage_24h.toFixed(2)}%`
                    : "N/A"}
                </td>

                <td className="py-4">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency.trim(),
                  }).format(
                    data.current_price !== null ? data.current_price : 0
                  )}
                </td>

                <td
                  className={`${
                    data.price_change_percentage_1h_in_currency > 0
                      ? "text-customGreen"
                      : "text-customRed"
                  } py-4`}
                >
                  {data.price_change_percentage_1h_in_currency?.toFixed(2) ||
                    "N/A"}
                </td>

                <td
                  className={`${
                    data.price_change_percentage_24h_in_currency > 0
                      ? "text-customGreen"
                      : "text-customRed"
                  } py-4`}
                >
                  {data.price_change_percentage_24h_in_currency?.toFixed(2) ||
                    "N/A"}
                </td>

                <td
                  className={`${
                    data.price_change_percentage_7d_in_currency > 0
                      ? "text-customGreen"
                      : "text-customRed"
                  } py-4`}
                >
                  {data.price_change_percentage_7d_in_currency?.toFixed(2) ||
                    "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Table;
