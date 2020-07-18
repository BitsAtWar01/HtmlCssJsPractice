const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../files/coffee')});
});
router.get('/roasting', (req, res) => {
    res.sendFile('roasting.html', {root: path.join(__dirname, '../files/coffee')});
});
router.get('/grinding', (req, res) => {
    res.sendFile('grinding.html', {root: path.join(__dirname, '../files/coffee')});
});
router.get('/brewing', (req, res) => {
    res.sendFile('brewing.html', {root: path.join(__dirname, '../files/coffee')});
});
router.get('/drinks', (req, res) => {
    res.sendFile('drinks.html', {root: path.join(__dirname, '../files/coffee')});
});

router.get('/survey', (req, res) => {
    res.sendFile('survey.html', {root: path.join(__dirname, '../files/coffee')});
});

module.exports = router;