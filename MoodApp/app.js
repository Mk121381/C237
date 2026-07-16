// Import the Express.js framework
const express = require('express');

//code for body-parser
const bodyParser = require('body-parser');
// Create an instance of the Express application
const app = express();

//Middleware to parse request bodies
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));
// Specify the port for the server to listen on
const port = 3000;

//set EJS as the view engine
app.set('view engine', 'ejs');

// In-memory data for moods 
let moods = [
  { id: 1, date: '2026-05-18', mood: 'Happy', energy: 5, comment: 'The weather was particularly nice, so I went for a walk.' },
  { id: 2, date: '2026-05-19', mood: 'Calm', energy: 3, comment: 'Normal day, nothing special.' },
  { id: 3, date: '2026-05-20', mood: 'Excited', energy: 4, comment: 'learn some new things..' }
];

// Routes for CRUD operations

// Home page (bubble view)
app.get('/', function(req, res) {
    res.render('index', { moods });
});

// New: Mood List page (table view)
app.get('/moodlist', function(req, res) {
    res.render('moodlist', { moods });
});

app.get('/moods', function(req, res) {
    res.redirect('/moodlist');
});

// About page
app.get('/about', function(req, res) {
    res.render('about');
});
 
// Route to get a specific mood by ID
app.get('/moods/:id', function(req, res) {
    const moodId = parseInt(req.params.id);
    const mood = moods.find(function(mood) {
        return mood.id === moodId;
    });
    
    if (mood) {
        res.render('moodInfo', { mood });
    } else {
        res.redirect('/moodlist');
    }
});

// Add a new mood form
app.get('/addmoods', function(req, res) {
    res.render('addMood');
});

// Add a new mood
app.post('/moods', function(req, res) {
    const { date, mood, energy, comment } = req.body;
    const id = moods.length > 0 ? moods[moods.length - 1].id + 1 : 1;
    const newMood = { 
        id: id, 
        date: date, 
        mood: mood, 
        energy: parseInt(energy), 
        comment: comment 
    };
    moods.push(newMood);
    res.redirect('/moodlist'); 
});

// Update - Show edit form
app.get('/moods/:id/update', function(req, res) {
    const moodId = parseInt(req.params.id);
    const updateMood = moods.find(function(mood) {
        return mood.id === moodId;
    });
    
    if (updateMood) {
        res.render('updateMood', { updateMood });
    } else {
        res.redirect('/moodlist');
    }
});

// Update a mood by ID
app.post('/moods/:id/update', function(req, res) {
    const moodId = parseInt(req.params.id);
    const { date, mood, energy, comment } = req.body;
    
    moods = moods.map(function(m) {
        if (m.id === moodId) {
            return { ...m, date, mood, energy: parseInt(energy), comment };
        }
        return m;
    });
    
    res.redirect('/moodlist');
});

// Delete a mood
app.get('/moods/:id/delete', function(req, res) {
    const moodId = parseInt(req.params.id);
    moods = moods.filter(function(m) {
        return m.id !== moodId;
    });
    res.redirect('/moodlist');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});