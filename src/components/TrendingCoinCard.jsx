import { useNavigate } from "react-router-dom";

function TrendingCoinCard({ coin }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(coin.id)}
      tabIndex={0}
      className="trending-coin-card relative"
    >
      <img
        src={coin.large}
        alt={`${coin.name}'s icon`}
        className="w-[4rem] h-[4rem] rounded-full absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-10"
      />

      <h3 className="capitalize">
        Name: <span className="text-primary">{coin.name}</span>
      </h3>

      <p className="capitalize">
        Market cap rank:{" "}
        <span className="text-primary">{coin.market_cap_rank ?? "N/A"}</span>
      </p>

      <p className="capitalize">
        Price:{" "}
        <span className="text-primary">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "btc",
            maximumSignificantDigits: 5,
          }).format(coin.price_btc !== null ? coin.price_btc : 0)}
        </span>
      </p>

      <p className="capitalize">
        Score: <span className="text-primary">{coin.score ?? "N/A"}</span>
      </p>
    </li>
  );
}

export default TrendingCoinCard;
