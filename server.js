const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// 🔥 storage setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb)=>{
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🔥 upload API
app.post("/upload", upload.single("image"), (req, res)=>{
  res.json({
    imageUrl: "/uploads/" + req.file.filename
  });
});

// 🔥 static folder
app.use("/uploads", express.static("uploads"));

app.listen(3000, ()=>console.log("Server running on 3000"));