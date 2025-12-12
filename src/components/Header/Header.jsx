import "./Header.css";

import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, currentLocation }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <button
          type="button"
          className="header__button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <NavLink to="/profile" className="header__link">
          <div className="header__profile">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatarImage}
              alt="User avatar"
              className="header__avatar"
            />
          </div>
        </NavLink>
      </nav>
      <button className="header__mobile-menu"></button>
    </header>
  );
}

export default Header;
