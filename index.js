const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { URL } = require("url"); // 👈 обов’язково для використання URL

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", // заміни на свій фронтенд-домен при потребі
}));
app.use(express.json());

const GAS_URL = "https://script.google.com/macros/s/AKfycbx1TTMs7VLcOsy7L7C5GtPQwzna35zdkCG_n1OCEBtcwBTvge5rdhQ_7q7e-ZSDik8l/exec";

// 🔁 GET — для транзакцій і рахунків
app.get("/api/transactions", async (req, res) => {
  try {
    const url = new URL(GAS_URL);
    
    // Додаємо параметри запиту, якщо вони є
    Object.keys(req.query).forEach(key =>
      url.searchParams.append(key, req.query[key])
    );

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
});

// 🔁 POST — для додавання, оновлення, видалення
app.post("/api/transactions", async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to post data", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server is running on port ${PORT}`);
});
