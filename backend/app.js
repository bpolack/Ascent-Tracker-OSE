const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => {
    res.send('API Test');
});

app.listen(PORT, () => {
    console.log(`Snippet Store server up on port ${PORT} 🌮`);
});