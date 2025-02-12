import { useEffect, useState } from "react";

function PriceRangeProgressBar({ currentPrice, lowPrice, highPrice }) {
  if (!currentPrice || !lowPrice || !highPrice) return null;

  const [width, setWidth] = useState(0);

  const priceRange = highPrice - lowPrice;
  const priceProgress = currentPrice - lowPrice;
  const percentage = (priceProgress / priceRange) * 100;

  useEffect(() => {
    // Start animating 100 ms after the component mounts
    setTimeout(() => {
      setWidth(percentage);
    }, 100);
  }, [percentage]);

  return (
    <div className="grid gap-2">
      <section className="flex justify-between items-center">
        <h3 className="label">24H price range</h3>

        <p className="label text-white">{width.toFixed(1)}% above low</p>
      </section>

      <div className="w-full h-2 bg-customGreen rounded-full overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={width}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${width}%` }}
          className="h-full bg-customRed rounded-full transition-all duration-1000 ease-out"
        />
      </div>
    </div>
  );
}

export default PriceRangeProgressBar;
