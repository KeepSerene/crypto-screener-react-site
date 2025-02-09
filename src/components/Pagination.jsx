import { useCryptoContext } from "../context/CryptoContextProvider";

// Paginated pages are taken care of by the API itself (note: "per_page" & "page" query params)
// Just implement the page flipping functionality
function Pagination() {
  const {
    currentPageNum,
    setCurrentPageNum,
    totalCryptoCount,
    perPageCryptoCount,
  } = useCryptoContext();

  const totalPageCount = Math.ceil(totalCryptoCount / perPageCryptoCount);

  const handleClick = (isNext) => {
    if (isNext) {
      currentPageNum === totalPageCount
        ? setCurrentPageNum(1)
        : setCurrentPageNum(currentPageNum + 1);
    } else {
      currentPageNum === 1
        ? setCurrentPageNum(totalPageCount)
        : setCurrentPageNum(currentPageNum - 1);
    }
  };

  return (
    <>
      {totalCryptoCount > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            onClick={() => handleClick(false)}
            aria-label={currentPageNum === 1 ? "Last page" : "Previous page"}
            className="pagination-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>

          <span className="font-semibold">
            Page {currentPageNum} of {totalPageCount}
          </span>

          <button
            type="button"
            onClick={() => handleClick(true)}
            aria-label={
              currentPageNum === totalPageCount ? "First page" : "Next page"
            }
            className="pagination-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
