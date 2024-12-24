const express = require('express');
const routes = require('./route');
const cors = require("cors");

const app = express();
const PORT = 7000;

// Mengaktifkan CORS agar bisa diakses dari berbagai origin
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());  // Mengganti body-parser dengan express.json()

// Routes
app.use('/api', routes); // Pastikan endpoint api sesuai dengan frontend Anda

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
