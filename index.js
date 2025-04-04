const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Дозволити CORS
app.use(cors({
  origin: "https://family-finance-dl.web.app"  // ← або '*' для всіх, якщо безпека не критична
}));

app.use(express.json());

// 🔁 Далі твій proxy-код (наприклад):
app.post("/api/transactions", async (req, res) => {
  // логіка запиту до Google Apps Script
});

// ✅ Запуск сервера
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
