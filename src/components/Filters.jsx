import SearchFilter from "./SearchFilter";
import CurrencyFilter from "./CurrencyFilter";
import SortByFilter from "./SortByFilter";

function Filters() {
  return (
    <div className="border-2 border-customGray-100 flex justify-between items-center">
      <SearchFilter />
      <CurrencyFilter />
      <SortByFilter />
    </div>
  );
}
export default Filters;
