const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://mustafaobiedat3:mustafa1234@cluster0.p4u02.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0",
  console.log("✅ Connected to MongoDB successfully!"), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use("/auth", require("./routes/authRoute"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
