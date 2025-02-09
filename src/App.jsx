// Library imports
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page imports
import Home from "./pages/Home";
import Cryptos from "./pages/Cryptos";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";
import Error404 from "./pages/Error404";
import CryptoDetailsModal from "./components/CryptoDetailsModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Cryptos />}>
            <Route path=":coinId" element={<CryptoDetailsModal />} />
          </Route>

          <Route path="trending" element={<Trending />} />
          <Route path="saved" element={<Saved />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
