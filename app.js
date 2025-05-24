const express = require('express');
const path = require('path');
const app = express();
const proverbRoutes = require('./routes/proverbs');
const PORT = process.env.PORT || 3000;

//  view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'afgan-proverb-front', 'views'));

// middles
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// rout path
app.use('/', proverbRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
