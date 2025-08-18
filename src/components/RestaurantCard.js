import {CDN_URL} from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {cloudinaryImageId, name, cuisines, avgRating, costForTwo} = resData?.info;
  const {deliveryTime} = resData?.info.sla;

  return (
    <div className="res-card" style={{ backgroundColor: "#f9ffe2" }}>
      <img
        src={
          CDN_URL +
          cloudinaryImageId
        }
        alt="Res-logo"
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <p>{avgRating} stars</p>
      <p>{costForTwo}</p>
      <p>{deliveryTime} mins</p>
    </div>
  );
};

export default RestaurantCard;