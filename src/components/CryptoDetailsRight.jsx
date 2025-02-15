// Helper function import
import { safeGet } from "../utils/helpers";

// Component imports
import Chart from "./Chart";
import SocialLinks from "./SocialLinks";

function CryptoDetailsRight({ coinId, coinData, currency }) {
  return (
    <div className="grid gap-4 content-start relative">
      <Chart coinId={coinId} currency={currency} />

      {/* Genesis day, hashing algo & market cap rank */}
      <div className="grid gap-2">
        {/* Genesis day */}
        <section className="flex justify-between items-center">
          <h3 className="label">Genesis day</h3>

          <span className="text-white text-sm">
            {safeGet(coinData, "genesis_date")}
          </span>
        </section>

        {/* Hashing algorithm */}
        <section className="flex justify-between items-center">
          <h3 className="label">Hashing algorithm</h3>

          <span className="text-white text-sm">
            {safeGet(coinData, "hashing_algorithm")}
          </span>
        </section>

        {/* Market cap rank */}
        <section className="flex justify-between items-center">
          <h3 className="label">Market cap rank</h3>

          <span className="text-white text-sm">
            {safeGet(coinData, "market_cap_rank")}
          </span>
        </section>
      </div>

      {/* Social links */}
      <SocialLinks coinData={coinData} />
    </div>
  );
}

export default CryptoDetailsRight;
