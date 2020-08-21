const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

//MIDDLEWARES
//Form Data Middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
//Json Body Middleware
app.use(bodyParser.json());

//Middleware for static files - assets
app.use(express.static(path.join(__dirname, 'assets')))

//Landing Page Route
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, './files')});
});

//Routes for Projects
app.use('/netflix-clone', require('./routes/netflixCloneRoutes'));
app.use('/coffee', require('./routes/coffeeRoutes'));
app.use('/form', require('./routes/formRoutes'));
app.use('/tictactoe', require('./routes/tictactoeRoutes'));

//Listen
app.listen(port, ()=> console.log(`Server started on port ${port}`))