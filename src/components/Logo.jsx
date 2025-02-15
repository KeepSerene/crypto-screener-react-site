import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="w-max text-primary text-lg pl-[1.5rem] pt-[1.5rem] flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        fill="currentColor"
        viewBox="0 0 48 48"
      >
        <path d="M18.5 42v-4.5H12v-3h4.5v-21H12v-3h6.5V6h3v4.5H27V6h3v4.65q2.7.55 4.35 2.65T36 18q0 1.4-.55 2.775a7.7 7.7 0 0 1-1.6 2.475q1.95 1 3.05 2.825A7.47 7.47 0 0 1 38 30q0 3.1-2.175 5.3T30.5 37.5H30V42h-3v-4.5h-5.5V42zm1-19.5h9q1.9 0 3.2-1.325T33 18q0-1.9-1.3-3.2t-3.2-1.3h-9zm0 12h11q1.9 0 3.2-1.325T35 30q0-1.9-1.3-3.2t-3.2-1.3h-11z"></path>
      </svg>

      <span>CryptoBucks</span>
    </Link>
  );
}
export default Logo;
