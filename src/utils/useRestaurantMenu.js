import { useEffect, useState } from "react";
import { FETCH_MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [data, setData] = useState({
    name: "",
    address: "",
    sections: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(FETCH_MENU_URL + resId);
        console.log("Fetching:", FETCH_MENU_URL + resId);

        // ✅ Check for HTTP and content type before parsing
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        // ✅ Ensure it's JSON
        if (!text || text.trim().length === 0) {
          throw new Error("Empty response body");
        }
        if (!text.startsWith("{")) {
          throw new Error("Response is not JSON (maybe HTML)");
        }

        const json = JSON.parse(text);
        console.log("Fetched JSON:", json);

        const cards = json?.data?.cards || [];

        const name =
          cards?.[0]?.card?.card?.text ||
          cards?.[2]?.card?.card?.info?.name ||
          "Not Found";

        const info = cards?.[2]?.card?.card?.info;
        const address = info
          ? `${info.locality ?? ""}, ${info.areaName ?? ""}`
          : "";

        const menuCards =
          cards?.find((c) => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR
            ?.cards || [];

        console.log("menuCards:", menuCards);

        const sections = [];

        menuCards.forEach((c) => {
          const section = c?.card?.card;
          if (!section?.title) return;

          if (section["@type"]?.includes("ItemCategory") && section.itemCards) {
            sections.push({
              title: section.title,
              subSections: [
                {
                  title: null,
                  items: section.itemCards.map((i) => i.card.info),
                },
              ],
            });
          } else if (
            section["@type"]?.includes("NestedItemCategory") &&
            section.categories
          ) {
            const subSections = section.categories.map((cat) => ({
              title: cat.title,
              items: (cat.itemCards || []).map((i) => i.card.info),
            }));

            sections.push({
              title: section.title,
              subSections,
            });
          }
        });

        console.log("Sections extracted:", sections);

        setData({ name, address, sections, isLoading: false, error: null });
      } catch (err) {
        console.error("Error fetching menu:", err);
        setData({
          name: "",
          address: "",
          sections: [],
          isLoading: false,
          error: err,
        });
      }
    };

    if (resId) fetchData();
  }, [resId]);

  return data;
};

export default useRestaurantMenu;
