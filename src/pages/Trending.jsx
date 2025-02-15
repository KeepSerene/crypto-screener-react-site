// Context import
import { useTrendingContext } from "../contexts/TrendingContextProvider";

// Component import
import TrendingCoinCard from "../components/TrendingCoinCard";

// Library import
import { Outlet } from "react-router-dom";

function Trending() {
  const { isLoading, errorMsg, trendingCryptos, refreshTrendingCoins } =
    useTrendingContext();

  const coins = trendingCryptos?.coins || [];

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={refreshTrendingCoins}
        aria-label="Refresh"
        title="Refresh"
        className="justify-self-end text-customGray-100 transition-colors hover:text-primary focus-visible:text-primary"
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>

      <div className="border border-customGray-100 rounded p-4 pt-12">
        {isLoading ? (
          <div className="max-w-80 pb-8 mx-auto flex items-center gap-2">
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
            className="text-customRed font-medium text-center p-4"
          >
            {errorMsg}
          </p>
        ) : (
          <>
            {coins.length > 0 && (
              <>
                <ul className="grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                  {coins.map(({ item }) => (
                    <TrendingCoinCard key={item.id} coin={item} />
                  ))}
                </ul>

                <Outlet />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Trending;
