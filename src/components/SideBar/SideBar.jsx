import "./SideBar.css";
import avatarImage from "../../images/avatar.png";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatarImage} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}
