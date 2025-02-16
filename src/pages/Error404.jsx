import { Link } from "react-router-dom";

function Error404() {
  return (
    <section className="min-h-[50vh] text-center flex flex-col justify-center items-center gap-6">
      <h2
        style={{ textShadow: "4px 4px 8px hsla(342, 64%, 55%, 0.3)" }}
        className="bg-clip-text bg-gradient-to-r from-customRed to-primary text-transparent text-[8rem] font-extrabold"
      >
        404
      </h2>

      <div className="grid gap-2">
        <p className="text-customGray-100 text-xl font-semibold">
          Oops! Page not found
        </p>

        <p className="text-customGray-100 text-sm">
          The page you're looking for doesn't exist or has been moved
        </p>
      </div>

      <Link
        to="/"
        className="bg-customGray-200/30 border border-customGray-100 rounded-full text-customGray-100 px-6 py-2 mt-4 transition-colors duration-300 hover:bg-primary/15 hover:text-primary hover:border-primary 
        focus-visible:bg-primary/15 focus-visible:text-primary focus-visible:border-primary"
      >
        Back to Homepage
      </Link>
    </section>
  );
}

export default Error404;
