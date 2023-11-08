import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";
import { NavLinks } from "../components";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <NavLinks toggleSidebar={toggle} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;