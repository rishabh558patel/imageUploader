import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// ✅ Always first
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());

// ✅ Ensure uploads folder exists
const dir = "uploads";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// ✅ Use upload routes
app.use("/api", uploadRoutes);


// Serve static uploads safely for CORS + binary fetch
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cross-Origin-Resource-Policy", "cross-origin");

    // ✅ Add this to ensure browser knows it's binary
    res.header("Cache-Control", "no-cache");
    res.header("Content-Disposition", "inline");

    next();
  },
  express.static(path.join(process.cwd(), "uploads"))
);

// ✅ Start server
app.listen(5050, () => console.log("✅ Server running on port 5050"));