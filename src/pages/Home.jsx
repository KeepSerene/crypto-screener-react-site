// Component import
import Logo from "../components/Logo";
import Nav from "../components/Nav";

// Context provider imports
import CryptoContextProvider from "../contexts/CryptoContextProvider";
import TrendingContextProvider from "../contexts/TrendingContextProvider";

// Library import
import { Outlet } from "react-router-dom";

// Root layout
function Home() {
  return (
    <div className="w-full h-full">
      <header>
        <Logo />

        <Nav />
      </header>

      <CryptoContextProvider>
        <TrendingContextProvider>
          <main className="wrapper mt-12 pb-8">
            <Outlet />
          </main>
        </TrendingContextProvider>
      </CryptoContextProvider>
    </div>
  );
}

export default Home;
