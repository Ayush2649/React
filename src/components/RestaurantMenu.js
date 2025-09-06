import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { FETCH_MENU_IMG_URL, FETCH_MENU_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resName, setResName] = useState("");
  const [resAddress, setResAddress] = useState("");
  const [showVegOnly, setShowVegOnly] = useState(false);

  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    const data = await fetch(FETCH_MENU_URL + resId);
    const json = await data.json();
    console.log("Full JSON:", json);

    // Restaurant name
    const name =
      json?.data?.cards[0]?.card?.card?.text ||
      json?.data?.cards[2]?.card?.card?.info?.name ||
      "Not Found";
    setResName(name);

    // Restaurant address
    const address =
      json?.data?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info
        ?.locality +
        ", " +
        json?.data?.cards?.find((c) => c?.card?.card?.info)?.card?.card?.info
          ?.areaName || "";
    setResAddress(address);

    // Extract all dishes dynamically
    const menuCards =
      json?.data?.cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap
        ?.REGULAR?.cards || [];

    const dishes = [];
    menuCards.forEach((c) => {
      const items = c?.card?.card?.itemCards;
      if (items) {
        items.forEach((item) => {
          dishes.push(item.card.info);
        });
      }
    });

    setResInfo(dishes);
    console.log("Dishes:", dishes);
  };

  // Apply veg filter
  const filteredMenu = showVegOnly
    ? resInfo.filter((dish) => dish.itemAttribute?.vegClassifier === "VEG")
    : resInfo;

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu">
      {" "}
      <h1>{resName}</h1>
      <p>{resAddress}</p>
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setShowVegOnly(!showVegOnly)}>
          {showVegOnly ? "Show All Dishes" : "Show Veg Only"}
        </button>
      </div>
      <h2>Restaurant Menu: </h2>{" "}
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
      </ul>{" "}
    </div>
  );
};
export default RestaurantMenu;
