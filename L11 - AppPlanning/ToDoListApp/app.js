const express = require('express');
const app = express();

// Setting EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Define a route to render the fruits.ejs page
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/addtask', (req, res) => {
    res.render('addtask');
});

app.get('/viewtasks', (req, res) => {
    res.render('viewtask');
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    console.log(`Server running at http://localhost:${PORT}/`); 
});