const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GAS_URL = "https://script.google.com/macros/s/AKfycbx1TTMs7VLcOsy7L7C5GtPQwzna35zdkCG_n1OCEBtcwBTvge5rdhQ_7q7e-ZSDik8l/exec";

app.get("/api/transactions", async (req, res) => {
  try {
    const response = await fetch(GAS_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

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
    res.status(500).json({ error: "Failed to post transaction" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
