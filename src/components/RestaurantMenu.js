import { useState } from "react";
import Shimmer from "./Shimmer";
import { FETCH_MENU_IMG_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { Plus, Minus } from "lucide-react"; // icon library

const RestaurantMenu = () => {
  const [showVegOnly, setShowVegOnly] = useState(false);
  const { resId } = useParams();

  const { name, address, sections, isLoading, error } =
    useRestaurantMenu(resId);

  const [openSection, setOpenSection] = useState(null);
  const [openSubSection, setOpenSubSection] = useState({}); // {sectionIdx: subIdx}

  if (isLoading) return <Shimmer />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-6">❌ Failed to load menu.</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Restaurant Info */}
      <h1 className="text-3xl font-bold text-[#FF4C29] mb-2">{name}</h1>
      <p className="text-gray-600 mb-6">{address}</p>

      {/* Sections */}
      {sections.map((section, sIdx) => (
        <div key={sIdx} className="bg-[#FF4C29] rounded-lg mb-2">
          {/* Section Header */}
          <button
            onClick={() => setOpenSection(openSection === sIdx ? null : sIdx)}
            className="w-full flex justify-between items-center px-4 py-3 text-white font-semibold border-none outline-none"
          >
            {/* Title + Count together */}
            <span className="flex items-center space-x-2">
              <span>{section.title}</span>
              <span className="text-sm font-normal">
                (
                {section.subSections
                  ? section.subSections.reduce(
                      (total, sub) => total + (sub.items?.length || 0),
                      0
                    )
                  : section.items?.length || 0}
                )
              </span>
            </span>

            {/* Icon */}
            <span className="ml-2 text-xl">
              {openSection === sIdx ? "−" : "+"}
            </span>
          </button>

          {/* Sub-sections */}
          {openSection === sIdx && (
            <div className="p-4 bg-[#FBE3D5]">
              {section.subSections.map((sub, subIdx) => {
                const filteredItems = showVegOnly
                  ? sub.items.filter(
                      (dish) => dish.itemAttribute?.vegClassifier === "VEG"
                    )
                  : sub.items;

                return (
                  <div key={subIdx} className="mb-4">
                    {sub.title && (
                      <button
                        onClick={() =>
                          setOpenSubSection((prev) => ({
                            ...prev,
                            [sIdx]: prev[sIdx] === subIdx ? null : subIdx,
                          }))
                        }
                        className="w-full flex justify-between items-center px-3 py-2 bg-white rounded text-gray-800 font-medium"
                      >
                        <span className="text-base">{sub.title}</span>
                        {openSubSection[sIdx] === subIdx ? (
                          <Minus size={18} />
                        ) : (
                          <Plus size={18} />
                        )}
                      </button>
                    )}

                    {/* Dishes */}
                    {(sub.title === null ||
                      openSubSection[sIdx] === subIdx) && (
                      <ul className="mt-2">
                        {filteredItems.length === 0 ? (
                          <p className="text-gray-500">No dishes available.</p>
                        ) : (
                          filteredItems.map((dish) => (
                            <li
                              key={dish.id}
                              className="flex items-start justify-between bg-white rounded-lg p-4 mb-4 shadow hover:bg-[#FF4C29] hover:text-white transform transition duration-300"
                            >
                              {/* Dish Info */}
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">
                                  {dish.name}
                                </h3>
                                <p className="text-sm text-gray-600 hover:text-white">
                                  {dish.description}
                                </p>
                                <p className="mt-1 font-medium">
                                  ₹{dish.price / 100 || dish.defaultPrice / 100}
                                </p>
                                {dish.itemAttribute?.vegClassifier ===
                                  "VEG" && (
                                  <span className="text-green-600 font-semibold">
                                    🟢 Veg
                                  </span>
                                )}
                              </div>

                              {/* Dish Image */}
                              {dish.imageId && (
                                <img
                                  src={FETCH_MENU_IMG_URL + dish.imageId}
                                  alt={dish.name}
                                  className="w-[100px] h-[100px] object-cover rounded-lg ml-4"
                                />
                              )}
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
