// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// Component imports
import CryptosPerPageFilter from "./CryptosPerPageFilter";
import Pagination from "./Pagination";

function Footer() {
  const { searchedCoin } = useCryptoContext();

  return (
    <footer className="wrapper text-customGray-100 text-sm flex flex-col-reverse md:flex-row md:justify-between items-center gap-4 sm:gap-6 md:gap-0">
      <p className="font-semibold">
        Powered by{" "}
        <a
          href="https://docs.coingecko.com/reference/introduction"
          target="_blank"
          className="text-white font-bold transition-colors hover:text-primary focus-visible:text-primary"
        >
          CoinGecko API
        </a>
      </p>

      <>
        {!searchedCoin && (
          <div className="max-md:w-full flex max-sm:flex-col sm:justify-between md:justify-normal items-center max-sm:gap-4 md:gap-4">
            <CryptosPerPageFilter />

            <Pagination />
          </div>
        )}
      </>
    </footer>
  );
}

export default Footer;
