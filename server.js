const express = require("express");
const fetch = require("node-fetch"); // or global fetch in node 18+
const cors = require("cors");

const app = express();
app.use(cors()); // Allow localhost frontend

app.get("/api/menu", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&restaurantId=${id}`;

  try {
    const response = await fetch(swiggyUrl);
    if (!response.ok) throw new Error("Swiggy API error");
    const data = await response.text(); // Sometimes Swiggy returns text/html
    res.send(data); // Sends raw data back to React
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// In server.js (Express backend)
const response = await fetch(swiggyListUrl, {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*"
  }
});

app.listen(5000, () => console.log("Proxy server ready on port 5000"));

