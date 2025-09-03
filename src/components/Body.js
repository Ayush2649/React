import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  // State Variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("Body render");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/v3?lat=19.7986096&lng=72.7614952&str=Restaurant&trackingId=1df61e06-71cb-cea8-be8c-61c7faa75a51&submitAction=ENTER&queryUniqueId=b4e2c48a-3738-ae35-4bb0-2f7150a8bf80"
    );

    const json = await data.json();

    console.log(json);

    const restaurants =
      json?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
        ?.map((c) => c.card?.card)
        .filter((c) => c && c.info) || [];

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  return !listOfRestaurants || listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setFilteredRestaurants(filtered);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              console.log(searchText);
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filtered);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => parseFloat(res.info.avgRating) > 4
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
