const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const proverbRoutes = require('./routes/proverbs');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/proverbs', proverbRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Afghan Proverbs API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
