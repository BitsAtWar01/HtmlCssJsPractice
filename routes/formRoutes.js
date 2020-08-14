const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../files/form-exercise')});
})

router.post('/details',(req, res) => {
    res.json(req.body);
})

module.exports = router;