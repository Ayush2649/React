// src/components/Header.js
import { LOGO_URL } from "../utils/constants.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnContent, setBtnContent] = useState("Login");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    console.log("useEffect called");
  }, [btnContent]);

  return (
    <div className="flex justify-between bg-[#FF4C29] text-white shadow-lg px-6 py-3">
      {/* Logo Section */}
      <div className="logo-container flex items-center">
        <img className="w-25" src={LOGO_URL} alt="YumRush Logo" />
      </div>

      {/* Nav Section */}
      <div className="flex items-center">
        <ul className="flex p-4 m-4 text-lg space-x-6">
          <li>Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li><Link to="/" className="no-link">Home</Link></li>
          <li><Link to="/about" className="no-link">About Us</Link></li>
          <li><Link to="/contact" className="no-link">Contact Us</Link></li>
          <li><Link to="/grocery" className="no-link">Grocery</Link></li>
          <button
            className="login bg-[#FBE3D5] text-[#FF4C29] px-3 py-1 rounded-md font-semibold hover:bg-[#FF4C29] transform transition duration-300 hover:scale-105 hover:text-white"
            onClick={() =>
              setBtnContent((prev) => (prev === "Login" ? "Logout" : "Login"))
            }
          >
            {btnContent}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
