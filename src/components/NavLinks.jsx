import links from "../utils/links";
import { NavLink } from "react-router-dom";
const NavLinks = ({ toggleSidebar }) => {
  return links.map((link) => {
    const { id, text, path, icon } = link;
    return (
      <NavLink
        key={id}
        to={path}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
        onClick={toggleSidebar}
        end
      >
        <span className="icon">{icon}</span>
        {text}
      </NavLink>
    );
  });
};

export default NavLinks;
