import { useState } from "react";
import Shimmer from "./Shimmer";
import { FETCH_MENU_IMG_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const [showVegOnly, setShowVegOnly] = useState(false);
  const { resId } = useParams();

  const { name, address, dishes, isLoading, error } = useRestaurantMenu(resId);

  if (isLoading) return <Shimmer />;
  if (error) return <p>❌ Failed to load menu.</p>;

  const filteredMenu = showVegOnly
    ? dishes.filter((dish) => dish.itemAttribute?.vegClassifier === "VEG")
    : dishes;

  return (
    <div className="restaurant-menu">
      <h1>{name}</h1>
      <p>{address}</p>

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setShowVegOnly(!showVegOnly)}>
          {showVegOnly ? "Show All Dishes" : "Show Veg Only"}
        </button>
      </div>

      <h2>Restaurant Menu:</h2>
      <ul>
        {filteredMenu.map((dish) => (
          <li key={dish.id} style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p>₹{dish.price / 100 || dish.defaultPrice / 100}</p>
              {dish.itemAttribute?.vegClassifier === "VEG" && (
                <span style={{ color: "green" }}>🟢 Veg</span>
              )}
            </div>
            {dish.imageId && (
              <img
                src={FETCH_MENU_IMG_URL + dish.imageId}
                alt={dish.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  marginLeft: "15px",
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div> 
  );
};

export default RestaurantMenu;
