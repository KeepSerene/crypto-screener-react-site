import Pagination from "./Pagination";

function Footer() {
  return (
    <footer className="wrapper text-sm mt-8 pb-8 flex justify-between items-center">
      <span className="text-customGray-100">
        Powered by{" "}
        <a
          href="https://docs.coingecko.com/reference/introduction"
          target="_blank"
          className="text-white font-bold transition-colors hover:text-primary focus-visible:text-primary"
        >
          CoinGecko API
        </a>
      </span>

      <Pagination />
    </footer>
  );
}
export default Footer;
