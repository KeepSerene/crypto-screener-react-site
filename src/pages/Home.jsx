// Component import
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// Context provider
import CryptoContextProvider from "../context/CryptoContextProvider";

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
        <main className="wrapper mt-12">
          <Outlet />
        </main>

        <Footer />
      </CryptoContextProvider>
    </div>
  );
}

export default Home;
