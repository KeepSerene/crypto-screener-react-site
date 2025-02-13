// Context import
import { useCryptoContext } from "../contexts/CryptoContextProvider";

// Component imports
import CryptosPerPageFilter from "./CryptosPerPageFilter";
import Pagination from "./Pagination";

function Footer() {
  const { searchedCoin } = useCryptoContext();

  return (
    <footer className="wrapper text-customGray-100 text-sm mt-8 flex justify-between items-center">
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
          <div className="flex items-center gap-4">
            <CryptosPerPageFilter />

            <Pagination />
          </div>
        )}
      </>
    </footer>
  );
}

export default Footer;
