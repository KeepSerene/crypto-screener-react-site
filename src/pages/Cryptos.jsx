// Component imports
import Filters from "../components/Filters";
import Table from "../components/Table";

// Library import
import { Outlet } from "react-router-dom";

function Cryptos() {
  return (
    <div className="grid gap-4">
      <Filters />

      <Table />

      <Outlet />
    </div>
  );
}

export default Cryptos;
