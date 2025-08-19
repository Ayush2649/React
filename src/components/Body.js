import RestaurantCard from "./RestaurantCard";

const Body = () => {
  let listOfRestaurants = [
    {
      info: {
        id: "234875",
        name: "Adil Hotel",
        cloudinaryImageId: "gp1ityra6utvzqn6ghnv",
        costForTwo: "₹150 for two",
        cuisines: ["Biryani", "Tandoor"],
        avgRating: 4.4,
        sla: {
          deliveryTime: 28,
        },
      },
    },
    {
      info: {
        id: "234876",
        name: "Adi Hotel",
        cloudinaryImageId: "gp1ityra6utvzqn6ghnv",
        costForTwo: "₹150 for two",
        cuisines: ["Biryani", "Tandoor"],
        avgRating: 3.4,
        sla: {
          deliveryTime: 28,
        },
      },
    },
  ];

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            listOfRestaurants = listOfRestaurants.filter((res) => res.info.avgRating > 4);
            console.log(listOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
