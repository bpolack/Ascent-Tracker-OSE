const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT;

// Connect database
connectDB();

// Initialize Middlewares
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/time', require('./routes/api/time'));

app.listen(PORT, () => {
    console.log(`Ascent server up on port ${PORT} 🌮`);
});