import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resData?.info;
  const { deliveryTime } = resData?.info.sla;

  return (
    <div className="m-4 p-4 w-[250px] h-[500px] rounded-lg bg-[#FBE3D5] hover:bg-[#FF4C29] transform transition duration-300 hover:scale-105 hover:text-white">
      <img
        className="rounded-lg mb-2"
        src={CDN_URL + cloudinaryImageId}
        alt="Res-logo"
      />
      <h3 className="font-bold text-xl">{name}</h3>
      <h4 className="font-semibold">{cuisines.join(", ")}</h4>
      <p>{avgRating} stars</p>
      <p>{costForTwo}</p>
      <p>{deliveryTime} mins</p>
    </div>
  );
};

export default RestaurantCard;
