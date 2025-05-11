const express = require('express');
const router = express.Router();
const {
    getAllProverbs,
    getProverbById,
    addProverb,
    updateProverb,
    deleteProverb,
    getRandomProverb,
    searchProverbs
} = require('../controllers/proverbController');

router.get('/', searchProverbs);
router.get('/random', getRandomProverb);
router.get('/:id', getProverbById);
router.post('/', addProverb);
router.put('/:id', updateProverb);
router.delete('/:id', deleteProverb);

module.exports = router;
