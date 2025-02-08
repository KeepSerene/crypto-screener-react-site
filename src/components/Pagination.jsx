import usePagination from "../hooks/usePagination";

function Pagination() {
  const { currentPageNum, setCurrentPageNum, totalPageCount } = usePagination();

  if (totalPageCount <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        type="button"
        onClick={() => setCurrentPageNum(currentPageNum - 1)}
        disabled={currentPageNum === 1}
        aria-label="Previous page"
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

      <span>
        Page {currentPageNum} of {totalPageCount}
      </span>

      <button
        type="button"
        onClick={() => setCurrentPageNum(currentPageNum + 1)}
        disabled={currentPageNum === totalPageCount}
        aria-label="Next page"
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
  );
}

export default Pagination;
