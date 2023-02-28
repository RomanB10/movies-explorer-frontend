import "./Header.css";
import headerLogo from "../images/logo.svg";
import Navigation from "./Navigation";
import { Link} from "react-router-dom";

function Header({ currentPath }) {

  return (
    <header
      className={
        currentPath === "/"
          ? `header`
          : currentPath === "/movies"
          ? `header header_type_dark`
          : currentPath === "/saved-movies"
          ? `header header_type_dark`
          : currentPath === "/profile"
          ? `header header_type_dark`
          : currentPath === "/signin"
          ? `header header_type_dark header_type_padding-left`
          : currentPath === "/signup"
          ? `header header_type_dark header_type_padding-left`
          : ""
      }
    >
      <Link to="/">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Здесь должно быть изображение Лого"
        />
      </Link>
      {currentPath === "/" ? (
        <Navigation />
      ) : currentPath === "/movies" ? (
        <Navigation />
      ) : currentPath === "/saved-movies" ? (
        <Navigation />
      ) : currentPath === "/profile" ? (
        <Navigation />
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
