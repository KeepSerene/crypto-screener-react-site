// React import
import { useEffect, useRef, useState } from "react";

// Library import
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function CustomTooltip({ payload, label, active, currency }) {
  if (!active) return null;

  const { dataKey, value } = payload[0];

  let price, marketCap, totalVol;

  if (dataKey === "price") {
    price = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.trim(),
      maximumSignificantDigits: 5,
    }).format(value !== null ? value : 0);
  } else if (dataKey === "market_cap") {
    marketCap = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.trim(),
      notation: "scientific",
    }).format(value !== null ? value : 0);
  } else {
    totalVol = value;
  }

  return (
    <div className="bg-customGray-300 text-primary text-sm border border-primary rounded p-1">
      <p>Date: {label}</p>

      {dataKey === "price" ? (
        <p>Price: {price}</p>
      ) : dataKey === "market_cap" ? (
        <p>Market Cap: {marketCap}</p>
      ) : (
        <p>Total Volume: {totalVol.toFixed(2)}</p>
      )}
    </div>
  );
}

function Chart({ coinId, currency }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [chartData, setChartData] = useState(null);
  const [dayCount, setDayCount] = useState(7);
  const [chartDataVariant, setChartDataVariant] = useState("prices");

  const abortControllerRef = useRef(null);

  const chartVariantBtnTexts = [
    "prices",
    "market_caps",
    "total_volumes",
    7,
    15,
    30,
  ];

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const fetchChartData = async () => {
      setIsLoading(true);
      setErrorMsg("");

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${dayCount}&interval=daily&precision=full`,
          { signal: abortControllerRef.current.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chart data!");
        }

        const data = await response.json();

        const formattedData = data[chartDataVariant].map((variantArr) => ({
          date: new Date(variantArr[0]).toLocaleDateString("en-IN"),
          [chartDataVariant.substring(0, chartDataVariant.length - 1)]:
            variantArr[1],
        }));

        setChartData(formattedData);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setErrorMsg(err.message);
        }
      } finally {
        if (!abortControllerRef.current.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchChartData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [coinId, chartDataVariant, dayCount]);

  const formatLegendText = (value) => {
    const textMap = {
      price: "Price",
      market_cap: "Market Cap",
      total_volume: "Total Volume",
    };

    return textMap[value] || value;
  };

  if (!chartData) return null;

  return (
    <div className="w-full h-[20rem] grid gap-2">
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
          className="w-full h-full text-customRed font-medium flex justify-center items-center"
        >
          {errorMsg}
        </p>
      ) : (
        <>
          {/* Chart */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" stoke="hsl(0, 0%, 50%)" hide />

              <YAxis stroke="hsl(0, 0%, 50%)" hide domain={["auto", "auto"]} />

              <CartesianGrid stroke="hsl(0, 0%, 50%)" />

              <Tooltip
                content={<CustomTooltip />}
                currency={currency}
                cursor={false}
              />

              <Legend
                wrapperStyle={{
                  fontSize: "14px",
                  paddingTop: "10px",
                }}
                formatter={formatLegendText}
              />

              <Line
                type="monotone"
                dataKey={chartDataVariant.substring(
                  0,
                  chartDataVariant.length - 1
                )}
                strokeWidth="1px"
                stroke="hsl(175, 100%, 54%)"
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Chart data variant buttons  */}
          <div className="flex items-center gap-3 flex-wrap">
            {chartVariantBtnTexts.map((btnText, index) => (
              <button
                type="button"
                key={index}
                onClick={() =>
                  typeof btnText === "string"
                    ? setChartDataVariant(btnText)
                    : setDayCount(btnText)
                }
                className={`chart-variant-btn ${
                  chartDataVariant === btnText || dayCount === btnText
                    ? "active"
                    : ""
                }`}
              >
                {typeof btnText === "string"
                  ? btnText.split("_").join(" ")
                  : `${btnText}D`}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Chart;
