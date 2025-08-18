import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/demoData";

const Body = () => {
  return (
    <div className="body">
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard resData={restaurant} key={restaurant.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
