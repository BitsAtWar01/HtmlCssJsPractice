const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

//Middleware for static files - assets
app.use(express.static(path.join(__dirname, 'assets')))

//Landing Page Route
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, './files')});
});

// //Handle Production
// if(process.env.NODE_ENV === 'production'){
    
// }

//Listen
app.listen(port, ()=> console.log(`Server started on port ${port}`))