import { useEffect, useState } from "react";
import { FETCH_MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [data, setData] = useState({
    name: "",
    address: "",
    dishes: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(FETCH_MENU_URL + resId);
        const json = await res.json();

        const cards = json?.data?.cards || [];

        // restaurant name & address
        const name =
          cards?.[0]?.card?.card?.text ||
          cards?.[2]?.card?.card?.info?.name ||
          "Not Found";

        const info = cards?.[2]?.card?.card?.info;
        const address = info ? `${info.locality ?? ""}, ${info.areaName ?? ""}` : "";

        // dishes
        const menuCards =
          cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

        const dishes = [];
        menuCards.forEach((c) => {
          const items = c?.card?.card?.itemCards;
          if (items) {
            items.forEach((i) => dishes.push(i.card.info));
          }
        });

        setData({ name, address, dishes, isLoading: false, error: null });
      } catch (err) {
        setData({ name: "", address: "", dishes: [], isLoading: false, error: err });
      }
    };

    if (resId) fetchData();
  }, [resId]);

  return data;
};

export default useRestaurantMenu;
