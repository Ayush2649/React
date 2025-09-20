import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnContent, setBtnContent] = useState("Login");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    console.log("useEffect called");
  }, [btnContent]);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li><Link to={"/"} className="no-link">Home</Link></li>
          <li><Link to={"/about"} className="no-link">About Us</Link></li>
          <li><Link to={"/contact"} className="no-link">Contact Us</Link></li>
          <li><Link to={"/grocery"} className="no-link">Grocery</Link></li>
          {/* <li>Cart</li> */}
          <button
            className="login"
            onClick={() => {
              btnContent === "Login"
                ? setBtnContent("Logout")
                : setBtnContent("Login");
            }}
          >
            {btnContent}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
