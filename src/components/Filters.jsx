import SearchFilter from "./SearchFilter";
import CurrencyFilter from "./CurrencyFilter";
import SortByFilter from "./SortByFilter";

function Filters() {
  return (
    <div className="border-2 border-customGray-100 rounded-lg px-4 py-2 grid grid-cols-3 gap-4">
      <SearchFilter />
      <CurrencyFilter />
      <SortByFilter />
    </div>
  );
}
export default Filters;
