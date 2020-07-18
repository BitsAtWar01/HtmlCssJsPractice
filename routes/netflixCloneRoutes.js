const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../files/netflix-clone')});
})

module.exports = router;