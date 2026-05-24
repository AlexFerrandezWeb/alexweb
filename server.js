const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.post("/api/chat", (req, res, next) => {
  console.log("Petición recibida");
  next();
});

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("Respuesta API:", JSON.stringify(data));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error conectando con la API" });
  }
});

app.listen(3001, () => {
  console.log("Servidor proxy corriendo en puerto 3001");
});
