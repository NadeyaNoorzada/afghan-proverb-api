const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {
    getAllProverbs,
    getProverbById,
    addProverb,
    updateProverb,
    deleteProverb,
    getRandomProverb,
    searchProverbs,
    updateProverbView
} = require('../controllers/proverbController');

// showing proveb path
router.get('/', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/proverbs.json');
    const proverbs = JSON.parse(fs.readFileSync(dataPath));
    res.render('index', { proverbs });
  } catch (error) {
    console.error(error);
    res.status(500).send('error ');
  }
});

router.get('/add', (req, res) => {
  res.render('add');
});
router.post('/add', addProverb);

router.get('/edit/:id', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/proverbs.json');
    const proverbs = JSON.parse(fs.readFileSync(dataPath));
    const proverb = proverbs.find(p => p.id === parseInt(req.params.id));
    if (!proverb) return res.status(404).send('could not find any proverb ');
    res.render('edit', { proverb });
  } catch (error) {
    console.error(error);
    res.status(500).send('error');
  }
});
// router.post('/edit/:id', updateProverb);
router.post('/edit/:id',updateProverbView);
router.post('/delete/:id', deleteProverb);

//api 
router.get('/api', searchProverbs);
router.get('/api/random', getRandomProverb);
router.get('/api/:id', getProverbById);
router.post('/api', addProverb);
router.put('/api/:id', updateProverb);
router.delete('/api/:id', deleteProverb);

module.exports = router;
