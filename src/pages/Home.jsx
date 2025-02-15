// Component imports
import Logo from "../components/Logo";
import Nav from "../components/Nav";

// Context provider imports
import CryptoContextProvider from "../contexts/CryptoContextProvider";
import TrendingContextProvider from "../contexts/TrendingContextProvider";
import SavedContextProvider from "../contexts/SavedContextProvider";

// Library imports
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
          <SavedContextProvider>
            <main className="wrapper pb-8 mt-12">
              <Outlet />
            </main>
          </SavedContextProvider>
        </TrendingContextProvider>
      </CryptoContextProvider>
    </div>
  );
}

export default Home;
