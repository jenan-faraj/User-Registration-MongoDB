require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',  // تحديد مصدر الـ Frontend هنا
  credentials: true,                // السماح بإرسال الكوكيز والتوكن
};

app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  
// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
