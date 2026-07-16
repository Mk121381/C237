const express = require('express');
const app = express();

// Setting EJS as the view engine
app.set('view engine', 'ejs');
// Middleware to parse form data from POST requests
app.use(express.urlencoded({ extended: true }));

const clothesList = ['T-shirts', 'Jacket', 'Jeans'];
const toiletriesList = ['Toothbrush', 'Shampoo', 'Sunscreen'];

// Define a route to render travellist.ejs page
app.get('/', (req, res) => {
    res.render("index", { clothesList, toiletriesList});
});

// TASK: Define a route to handle adding items to the list

app.post('/submit', (req, res) => {

    const item = req.body.item;
    const category = req.body.category;

    if (category === 'clothes') {
        clothesList.push(item);
    } else if (category === 'toiletries') {
        toiletriesList.push(item);
    }

    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
