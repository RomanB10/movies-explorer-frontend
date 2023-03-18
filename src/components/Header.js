import "./Header.css";
import headerLogo from "../images/logo.svg";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { SCREEN_MD } from "../utils/constants";

function Header({ loggedIn, currentPath, onMenuClick, width }) {

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
          ? `header header_type_dark header_type_profile`
          : currentPath === "/signin"
          ? `header header_type_dark header_type_auth`
          : currentPath === "/signup"
          ? `header header_type_dark header_type_auth`
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
        <>
          {width <= SCREEN_MD && loggedIn ? (
            <button className="button-open-menu" onClick={onMenuClick} />
          ) : (
            <Navigation
              currentPath={currentPath}
              width={width}
              loggedIn={loggedIn}
            />
          )}
        </>
      ) : currentPath === "/movies" ? (
        <>
          {width > SCREEN_MD ? (
            <Navigation currentPath={currentPath} width={width} />
          ) : (
            <button className="button-open-menu" onClick={onMenuClick} />
          )}
        </>
      ) : currentPath === "/saved-movies" ? (
        <>
          {width > SCREEN_MD ? (
            <Navigation currentPath={currentPath} width={width} />
          ) : (
            <button className="button-open-menu" onClick={onMenuClick} />
          )}
        </>
      ) : currentPath === "/profile" ? (
        <>
          {width > SCREEN_MD ? (
            <Navigation currentPath={currentPath} />
          ) : (
            <button className="button-open-menu" onClick={onMenuClick} />
          )}
        </>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
