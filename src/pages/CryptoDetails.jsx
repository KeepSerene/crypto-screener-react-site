// Library import
import { useNavigate, useParams } from "react-router-dom";

// Context import
import { useCryptoContext } from "../context/CryptoContextProvider";

// React import
import { useEffect, useRef } from "react";

// Component import
import PriceRangeProgressBar from "../components/PriceRangeProgressBar";
import Chart from "../components/Chart";

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
      className="bg-customGray-200/30 backdrop-blur-sm flex justify-center items-center absolute inset-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[65%] bg-customGray-300/75 rounded-lg p-4"
      >
        <>
          {coinData && (
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              <div className="grid gap-4">
                {/* Icon, name, & symbol */}
                <section className="flex items-center gap-3">
                  <img
                    src={coinData.image.large}
                    alt={`${coinData.name}'s icon`}
                    className="w-[3rem] h-[3rem]"
                  />

                  <h2 className="text-xl font-medium capitalize">
                    {coinData.name}
                  </h2>

                  <span className="bg-primary/25 text-primary text-sm uppercase rounded px-2.5 py-0.5">
                    {coinData.symbol}
                  </span>
                </section>

                <div className="grid gap-4">
                  {/* Current price & change percentage in it in 24 hrs */}
                  <div className="flex justify-between items-center">
                    <section>
                      <h3 className="label">Price</h3>

                      <span className="text-lg font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency.trim(),
                          maximumSignificantDigits: 5,
                        }).format(
                          coinData.market_data.current_price[currency] !== null
                            ? coinData.market_data.current_price[currency]
                            : 0
                        )}
                      </span>
                    </section>

                    <div
                      aria-label={
                        coinData.market_data
                          ?.price_change_percentage_24h_in_currency[currency] >
                        0
                          ? "Rise in price change in the last 24 hours"
                          : "Drop in price change in the last 24 hours"
                      }
                      className={`${
                        coinData.market_data
                          ?.price_change_percentage_24h_in_currency[currency] >
                        0
                          ? "bg-customGreen/25 text-customGreen"
                          : "bg-customRed/25 text-customRed"
                      } rounded p-1 flex items-center gap-1`}
                    >
                      <span className="text-sm font-medium">
                        {coinData.market_data.price_change_percentage_24h_in_currency[
                          currency
                        ].toFixed(2)}
                        %
                      </span>

                      <>
                        {coinData.market_data
                          ?.price_change_percentage_24h_in_currency[currency] >
                        0 ? (
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
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency.trim(),
                          notation: "scientific",
                        }).format(
                          coinData.market_data.market_cap[currency] !== null
                            ? coinData.market_data.market_cap[currency]
                            : 0
                        )}
                      </span>
                    </div>

                    <div>
                      <h3 className="label">Fully diluted valuation</h3>

                      <span className="font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency.trim(),
                          notation: "compact",
                        }).format(
                          coinData.market_data.fully_diluted_valuation[
                            currency
                          ] !== null
                            ? coinData.market_data.fully_diluted_valuation[
                                currency
                              ]
                            : 0
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Total volume */}
                  <div>
                    <h3 className="label">Total volume</h3>

                    <span className="font-bold">
                      {coinData.market_data.total_volume[currency] ?? "N/A"}
                    </span>
                  </div>

                  {/* Low & high in 24 hrs */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="label">Low in 24H</h3>

                      <span className="font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency.trim(),
                          maximumFractionDigits: 2,
                        }).format(
                          coinData.market_data.low_24h[currency] !== null
                            ? coinData.market_data.low_24h[currency]
                            : 0
                        )}
                      </span>
                    </div>

                    <div>
                      <h3 className="label">High in 24H</h3>

                      <span className="font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency.trim(),
                          maximumFractionDigits: 2,
                        }).format(
                          coinData.market_data.high_24h[currency] !== null
                            ? coinData.market_data.high_24h[currency]
                            : 0
                        )}
                      </span>
                    </div>
                  </div>

                  <PriceRangeProgressBar
                    currentPrice={coinData.market_data?.current_price[currency]}
                    lowPrice={coinData.market_data?.low_24h[currency]}
                    highPrice={coinData.market_data?.high_24h[currency]}
                  />

                  {/* Max & circulating supply */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="label">Max supply</h3>

                      <span className="font-bold">
                        {coinData.market_data.max_supply !== null
                          ? coinData.market_data.max_supply.toFixed(2)
                          : "N/A"}
                      </span>
                    </div>

                    <div>
                      <h3 className="label">Circulating supply</h3>

                      <span className="font-bold">
                        {coinData.market_data.circulating_supply !== null
                          ? coinData.market_data.circulating_supply.toFixed(2)
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Links & sentiment vote percentages */}
                  <div className="font-medium flex justify-between items-center">
                    <ul className="text-customGray-100 text-sm grid gap-2">
                      <li className="bg-customGray-200 rounded p-1">
                        <a
                          href={
                            coinData.links.homepage[0] !== undefined
                              ? coinData.links.homepage[0]
                              : ""
                          }
                          target="_blank"
                          className="capitalize underline transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          {coinData.links.homepage[0] ? "Homepage" : "N/A"}
                        </a>
                      </li>

                      <li className="bg-customGray-200 rounded p-1">
                        <a
                          href={
                            coinData.links.blockchain_site[0] !== undefined
                              ? coinData.links.blockchain_site[0]
                              : ""
                          }
                          target="_blank"
                          className="capitalize underline transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          {coinData.links.blockchain_site[0]
                            ? "Blockchain site"
                            : "N/A"}
                        </a>
                      </li>

                      <li className="bg-customGray-200 rounded p-1">
                        <a
                          href={
                            coinData.links.official_forum_url[0] !== undefined
                              ? coinData.links.official_forum_url[0]
                              : ""
                          }
                          target="_blank"
                          className="capitalize underline transition-colors hover:text-primary focus-visible:text-primary"
                        >
                          {coinData.links.official_forum_url[0]
                            ? "Official forum"
                            : "N/A"}
                        </a>
                      </li>
                    </ul>

                    <ul className="grid gap-2">
                      <li>
                        <h3 className="label">Sentiment votes</h3>
                      </li>

                      <li
                        aria-label={
                          coinData.sentiment_votes_up_percentage && "Went up by"
                        }
                        className="bg-customGreen/25 text-customGreen rounded p-1 flex justify-center items-center gap-1"
                      >
                        <span>
                          {coinData.sentiment_votes_up_percentage !== null
                            ? `${coinData.sentiment_votes_up_percentage}%`
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
                          coinData.sentiment_votes_up_percentage &&
                          "Went down by"
                        }
                        className="bg-customRed/25 text-customRed rounded p-1 flex justify-center items-center gap-1"
                      >
                        <span>
                          {coinData.sentiment_votes_down_percentage !== null
                            ? `${coinData.sentiment_votes_down_percentage}%`
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
              </div>

              <Chart coinId={coinId} />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default CryptoDetails;
