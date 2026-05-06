const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb)=>{
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res)=>{
  res.json({
    imageUrl: "/uploads/" + req.file.filename
  });
});

// static files
app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname));

// 🔥 HOME FIX
app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, ()=>console.log("Server running"));
