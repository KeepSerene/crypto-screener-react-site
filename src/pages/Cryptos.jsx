import Filters from "../components/Filters";
import Table from "../components/Table";

function Cryptos() {
  return (
    <div className="grid gap-4">
      <Filters />

      <Table />
    </div>
  );
}
export default Cryptos;
