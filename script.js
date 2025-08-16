import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://images-platform.99static.com/O3ZHfJeHB741xpyYH95tWvMsdTI=/0x0:1279x1279/500x500/top/smart/99designs-contests-attachments/63/63966/attachment_63966256"
          alt="Logo"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Search</li>
          <li>Offers</li>
          <li>Help</li>
          <li>Sign In</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestaurantCard = (props) => {
  const { resName, cuisine, source } = props;
  
  return (
    <div className="res-card" style={{ backgroundColor: "#f9ffe2" }}>
      <img
        src={source}
        alt="Res-logo"
      />
      <h3>{resName}</h3>
      <h4>{cuisine}</h4>
      <p>4.5 stars</p>
      <p>30 mins</p>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="res-container">
        <RestaurantCard resName="Hotel Sainath" cuisine="North Indian, Chienese" source="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/vkhcohhmqfczycw9vsar"/>
        <RestaurantCard resName="Satkar Restaurant" cuisine="South Indian, Salads" source="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rvxp5xbniat84r6efku2"/>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
