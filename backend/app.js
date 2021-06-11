const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Connect database
connectDB();

// Initialize Middlewares
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/time', require('./routes/api/time'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Ascent server up on port ${PORT} 🌮`);
});