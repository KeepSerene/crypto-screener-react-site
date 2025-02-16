// Library import
import { useNavigate } from "react-router-dom";

// Helper function imports
import { formatCurrency, safeGet } from "../utils/helpers";

function TrendingCoinCard({ coin }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(coin.id)}
      tabIndex={0}
      className="trending-coin-card max-md:justify-self-center relative"
    >
      <img
        src={coin.large}
        alt={`${coin.name}'s icon`}
        className="size-[3rem] lg:size-[4rem] rounded-full absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-10"
      />

      <h3 className="capitalize">
        Name: <span className="text-primary">{safeGet(coin, "name")}</span>
      </h3>

      <p className="capitalize">
        Market cap rank:{" "}
        <span className="text-primary">{safeGet(coin, "market_cap_rank")}</span>
      </p>

      <p className="capitalize">
        Price:{" "}
        <span className="text-primary">
          {formatCurrency(safeGet(coin, "price_btc", 0), "btc", {
            maximumSignificantDigits: 5,
          })}
        </span>
      </p>

      <p className="capitalize">
        Score: <span className="text-primary">{safeGet(coin, "score")}</span>
      </p>
    </li>
  );
}

export default TrendingCoinCard;
