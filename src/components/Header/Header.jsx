import "./Header.css";

import { useContext } from "react";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import logoImage from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  currentLocation,
  handleRegisterClick,
  handleLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser || !currentLocation) return null;

  const { name, avatar } = currentUser;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userAvatar = avatar ? (
    <img src={avatar} alt="User avatar" className="header__avatar" />
  ) : (
    <span className="header__avatar header__avatar_type_none">
      {name?.toUpperCase().charAt(0) || ""}
    </span>
  );

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/">
          <img src={logoImage} alt="Logo" className="header__logo" />
        </NavLink>

        <p className="header__date">
          {currentDate}, {currentLocation}
        </p>
      </div>

      <nav className="header__nav">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__button"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>

            <NavLink to="/profile" className="header__link">
              <div className="header__profile">
                <p className="header__username">{name}</p>
                {userAvatar}
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="header__button"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </nav>

      <button className="header__mobile-menu" type="button"></button>
    </header>
  );
}

export default Header;