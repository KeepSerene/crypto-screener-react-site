// Helper function imports
import { formatCurrency, safeGet } from "../utils/helpers";

// Component import
import PriceRangeProgressBar from "./PriceRangeProgressBar";

function CryptoDetailsLeft({ coinData, currency }) {
  return (
    <div className="grid gap-4">
      {/* Current price & change percentage in 24 hrs */}
      <div className="flex justify-between items-center">
        <section>
          <h3 className="label">Price</h3>

          <span className="text-lg font-bold">
            {/* {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency.trim(),
              maximumSignificantDigits: 5,
            }).format(
              coinData?.market_data?.current_price[currency] !== null
                ? coinData?.market_data?.current_price[currency]
                : 0
            )} */}

            {formatCurrency(
              safeGet(coinData, `market_data.current_price.${currency}`, 0),
              currency,
              {
                maximumSignificantDigits: 5,
              }
            )}
          </span>
        </section>

        <div
          aria-label={
            safeGet(
              coinData,
              `market_data.price_change_percentage_24h_in_currency.${currency}`,
              0
            ) > 0
              ? "Rise in price change percentage in the last 24 hours"
              : "Drop in price change percentage in the last 24 hours"
          }
          className={`${
            safeGet(
              coinData,
              `market_data.price_change_percentage_24h_in_currency.${currency}`,
              0
            ) > 0
              ? "bg-customGreen/25 text-customGreen"
              : "bg-customRed/25 text-customRed"
          } rounded p-1 flex items-center gap-1`}
        >
          <span className="text-sm font-medium">
            {safeGet(
              coinData,
              `market_data.price_change_percentage_24h_in_currency.${currency}`,
              0
            ).toFixed(2)}
            %
          </span>

          <>
            {safeGet(
              coinData,
              `market_data.price_change_percentage_24h_in_currency.${currency}`,
              0
            ) > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                />
              </svg>
            )}
          </>
        </div>
      </div>

      {/* Market cap & fully diluted valuation */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="label">Market cap</h3>

          <span className="font-bold">
            {formatCurrency(
              safeGet(coinData, `market_data.market_cap.${currency}`, 0),
              currency,
              {
                notation: "scientific",
              }
            )}
          </span>
        </div>

        <div>
          <h3 className="label">Fully diluted valuation</h3>

          <span className="font-bold">
            {formatCurrency(
              safeGet(
                coinData,
                `market_data.fully_diluted_valuation.${currency}`,
                0
              ),
              currency,
              {
                notation: "compact",
              }
            )}
          </span>
        </div>
      </div>

      {/* Total volume */}
      <div>
        <h3 className="label">Total volume</h3>

        <span className="font-bold">
          {safeGet(coinData, `market_data.total_volume.${currency}`)}
        </span>
      </div>

      {/* Low & high in 24 hrs */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="label">Low in 24H</h3>

          <span className="font-bold">
            {formatCurrency(
              safeGet(coinData, `market_data.low_24h.${currency}`, 0),
              currency,
              {
                maximumFractionDigits: 2,
              }
            )}
          </span>
        </div>

        <div>
          <h3 className="label">High in 24H</h3>

          <span className="font-bold">
            {formatCurrency(
              safeGet(coinData, `market_data.high_24h.${currency}`, 0),
              currency,
              {
                maximumFractionDigits: 2,
              }
            )}
          </span>
        </div>
      </div>

      <PriceRangeProgressBar
        currentPrice={safeGet(
          coinData,
          `market_data.current_price.${currency}`,
          0
        )}
        lowPrice={safeGet(coinData, `market_data.low_24h.${currency}`, 0)}
        highPrice={safeGet(coinData, `market_data.high_24h.${currency}`, 0)}
      />

      {/* Max & circulating supply */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="label">Max supply</h3>

          <span className="font-bold">
            {safeGet(coinData, `market_data.max_supply`, 0).toFixed(2)}
          </span>
        </div>

        <div>
          <h3 className="label">Circulating supply</h3>

          <span className="font-bold">
            {safeGet(coinData, `market_data.circulating_supply`, 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Links & sentiment vote percentages */}
      <div className="font-medium flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <ul className="text-customGray-100 text-sm grid gap-2">
          <li className="bg-customGray-200 rounded p-1">
            {safeGet(coinData, `links.homepage[0]`) !== "N/A" ? (
              <a
                href={safeGet(coinData, `links.homepage[0]`)}
                target="_blank"
                className="capitalize underline transition-colors hover:text-primary focus-visible:text-primary"
              >
                Homepage
              </a>
            ) : (
              "N/A"
            )}
          </li>

          <li className="bg-customGray-200 rounded p-1">
            {safeGet(coinData, `links.blockchain_site[0]`) !== "N/A" ? (
              <a
                href={safeGet(coinData, `links.blockchain_site[0]`)}
                target="_blank"
                className="capitalize underline transition-colors hover:text-primary focus-visible:text-primary"
              >
                Blockchain site
              </a>
            ) : (
              "N/A"
            )}
          </li>

          <li className="bg-customGray-200 rounded p-1">
            {safeGet(coinData, `links.official_forum_url[0]`) !== "N/A" ? (
              <a
                href={safeGet(coinData, `links.official_forum_url[0]`)}
                target="_blank"
                className="capitalize underline transition-colors hover:text-primary focus-visible:text-primary"
              >
                Official forum
              </a>
            ) : (
              "N/A"
            )}
          </li>
        </ul>

        <ul className="grid gap-2">
          <li>
            <h3 className="label">Sentiment votes</h3>
          </li>

          <li
            aria-label={
              safeGet(coinData, `sentiment_votes_up_percentage`) !== "N/A" &&
              "Went up by"
            }
            className="bg-customGreen/25 text-customGreen rounded p-1 flex justify-center items-center gap-1"
          >
            <span>
              {safeGet(coinData, `sentiment_votes_up_percentage`) !== "N/A"
                ? `${safeGet(coinData, `sentiment_votes_up_percentage`)}%`
                : "N/A"}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
          </li>

          <li
            aria-label={
              safeGet(coinData, `sentiment_votes_down_percentage`) !== "N/A" &&
              "Went down by"
            }
            className="bg-customRed/25 text-customRed rounded p-1 flex justify-center items-center gap-1"
          >
            <span>
              {safeGet(coinData, `sentiment_votes_down_percentage`) !== "N/A"
                ? `${safeGet(coinData, `sentiment_votes_down_percentage`)}%`
                : "N/A"}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CryptoDetailsLeft;
