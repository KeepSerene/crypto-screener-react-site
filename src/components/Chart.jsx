import { useEffect, useState } from "react";

import { LineChart, Line } from "recharts";
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 800, pv: 2800, amt: 2800 },
];

const RenderLineChart = () => (
  <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  </LineChart>
);

function Chart({ coinId }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily&precision=full`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chart data!");
        }

        const data = await response.json();

        setChartData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      <RenderLineChart />
    </div>
  );
}

export default Chart;
