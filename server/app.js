// server/app.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const MEXC_API_URL = 'https://api.mexc.com';

app.get('/trade', async (req, res) => {
    try {
        const response = await axios.get(`${MEXC_API_URL}/some-endpoint`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from MEXC API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
