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
  if (error) return <p className="text-red-500 text-center mt-6">❌ Failed to load menu.</p>;

  const filteredMenu = showVegOnly
    ? dishes.filter((dish) => dish.itemAttribute?.vegClassifier === "VEG")
    : dishes;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Restaurant Info */}
      <h1 className="text-3xl font-bold text-[#FF4C29] mb-2">{name}</h1>
      <p className="text-gray-600 mb-6">{address}</p>

      {/* Toggle Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowVegOnly(!showVegOnly)}
          className="px-4 py-2 bg-[#FF4C29] text-white rounded-lg hover:scale-105 transform transition duration-300"
        >
          {showVegOnly ? "Show All Dishes" : "Show Veg Only"}
        </button>
      </div>

      {/* Menu List */}
      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      {filteredMenu.length === 0 ? (
        <p className="text-gray-500">No dishes available.</p>
      ) : (
        <ul>
          {filteredMenu.map((dish, index) => (
            <li
              key={`${dish.id}-${index}`}
              className="flex items-start justify-between bg-[#FBE3D5] rounded-lg p-4 mb-4 hover:bg-[#FF4C29] hover:text-white transform transition duration-300"
            >
              {/* Dish Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{dish.name}</h3>
                <p className="text-sm text-gray-600 hover:text-white">{dish.description}</p>
                <p className="mt-1 font-medium">
                  ₹{dish.price / 100 || dish.defaultPrice / 100}
                </p>
                {dish.itemAttribute?.vegClassifier === "VEG" && (
                  <span className="text-green-600 font-semibold">🟢 Veg</span>
                )}
              </div>

              {/* Dish Image */}
              {dish.imageId && (
                <img
                  src={FETCH_MENU_IMG_URL + dish.imageId}
                  alt={dish.name}
                  className="w-[120px] h-[120px] object-cover rounded-lg ml-4"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantMenu;
