// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

//Define a route to render the contact us page
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/submit', (req, res) => {
    // Activity 3: Edit the lines below to include the additional form fields sent by the form
    const { name, email, contact, comments} = req.body;
    
    res.render('submitted', {name, email, contact, comments})
});

// Define route to display task form
app.get('/task', (req, res) => {
    res.render('task');
});

// define route to process task form submission
app.post('/comfirm', (req, res) => {
    const { title, description, deadline, priority} = req.body;
    
    res.render('confirm', {title, description, deadline, priority});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});