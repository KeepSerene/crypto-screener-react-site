import { NavLink } from "react-router-dom";

function Nav() {
  const navLinkTexts = ["cryptos", "trending", "saved"];

  return (
    <nav className="wrapper sm:w-[60%] border border-primary rounded-lg mt-4">
      <ul className="flex justify-center items-center gap-4">
        {navLinkTexts.map((navLinkText, index) => (
          <li key={index} className="flex-1 py-2 first:ml-4 last:mr-4">
            <NavLink
              to={index === 0 ? "/" : `/${navLinkText}`}
              className={({ isActive }) =>
                `inline-flex justify-center items-center w-full ${
                  isActive
                    ? "bg-primary text-customGray-300 hover:bg-primary/25 hover:text-primary focus-visible:bg-primary/25 focus-visible:text-primary"
                    : "bg-customGray-200 text-customGray-100 hover:text-primary focus-visible:text-primary"
                } font-semibold capitalize rounded transition-colors duration-300`
              }
            >
              {navLinkText}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
