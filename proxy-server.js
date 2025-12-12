const express = require("express");
const fetch = require("node-fetch"); // v2 version
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/menu", async (req, res) => {
  const { id } = req.query;
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.2004765&lng=72.8736892&restaurantId=${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching menu:", err.message);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Proxy running on http://localhost:${PORT}`));
