import "./Header.css";

import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.png";

function Header({ handleAddClick, currentLocation }) {

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return(
    <header className="header">
      <div className="header__container">
        <img src={logoImage} alt="Logo" className="header__logo" />
        <p className="header__date">{currentDate}, {currentLocation}</p>
      </div>
      <nav className="header__nav">
        <button type="button" className="header__button" onClick={handleAddClick}>+ Add clothes</button>
        <div className="header__profile">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatarImage} alt="User avatar" className="header__avatar" />
        </div>
      </nav>
      <button className="header__mobile-menu"></button>
    </header>
  )
}

export default Header;