// Add web token authorization for API calls to MEXC
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware for token verification
app.use((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied.');
    try {
        const verified = jwt.verify(token, 'your_secret_key'); // replace with your secret key
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token.');
    }
});

// Your existing routes here...

module.exports = app;