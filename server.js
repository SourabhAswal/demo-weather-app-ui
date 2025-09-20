import express from "express";
import path from "path";
import fetch from "node-fetch";

const app = express();
const __dirname = path.resolve();

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

// Proxy endpoint (frontend → backend)
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const backendUrl = `https://demo-weather-backend-1023393735816.us-central1.run.app/weather?city=${city}`;

  try {
    // Forward request to backend
    const response = await fetch(backendUrl, {
      headers: {
        "Authorization": `Bearer ${process.env.BACKEND_IDENTITY_TOKEN || ""}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error calling backend:", err);
    res.status(500).json({ error: "Backend call failed" });
  }
});

// Fallback to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
