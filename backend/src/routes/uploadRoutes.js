import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

// =======================
// 📸 Single Image Upload
// =======================
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const fileUrl = `http://localhost:5050/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        url: fileUrl,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
