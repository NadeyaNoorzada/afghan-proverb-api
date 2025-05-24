const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/proverbs.json');

function readData() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

exports.getAllProverbs = (req, res) => {
    const proverbs = readData();
    res.json(proverbs);
};

exports.getProverbById = (req, res) => {
    const proverbs = readData();
    const proverb = proverbs.find(p => p.id === parseInt(req.params.id));
    if (!proverb) return res.status(404).json({ error: 'Proverb not found' });
    res.json(proverb);
};

exports.addProverb = (req, res) => {
    const proverbs = readData();
    const newProverb = { id: Date.now(), ...req.body };
    proverbs.push(newProverb);
    writeData(proverbs);
    res.redirect('/');
};

exports.updateProverb = (req, res) => {
    const proverbs = readData();
    const index = proverbs.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Proverb not found' });
    proverbs[index] = { ...proverbs[index], ...req.body };
    writeData(proverbs);
    res.json(proverbs[index]);
};


exports.updateProverbView = (req, res) => {
    const proverbs = readData();
    const index = proverbs.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Proverb not found');

    proverbs[index] = { ...proverbs[index], ...req.body };
    writeData(proverbs);

    res.redirect('/');
};

exports.deleteProverb = (req, res) => {
  try {
    let proverbs = readData();
    const index = proverbs.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send('Proverb not found');
    }
    proverbs.splice(index, 1);
    writeData(proverbs);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getRandomProverb = (req, res) => {
    const proverbs = readData();
    const random = proverbs[Math.floor(Math.random() * proverbs.length)];
    res.json(random);
};

exports.searchProverbs = (req, res) => {
    const { category, q } = req.query;
    let proverbs = readData();

    if (category) {
        proverbs = proverbs.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
        proverbs = proverbs.filter(p =>
            p.textDari.includes(q) ||
            p.textPashto.includes(q) ||
            p.translationEn.includes(q)
        );
    }

    res.json(proverbs);
};
