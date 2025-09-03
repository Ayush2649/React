import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Header = () => {
  const [btnContent, setBtnContent] = useState("Login");
  console.log("Header render");

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
          <li>Offers</li>
          <li>Help</li>
          <li>Sign In</li>
          <li>Cart</li>
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
