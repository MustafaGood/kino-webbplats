const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 5080;

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Ersätt 'ejs' med din valda template-motor

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Get list of movies and render on homepage
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
        const movies = response.data.data;
        res.render('index', { movies });
    } catch (error) {
        res.status(500).send('Error fetching movies');
    }
});

// Get individual movie and render on its page
app.get('/movies/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${req.params.id}`);
        const movie = response.data.data;
        res.render('movie', { movie });
    } catch (error) {
        res.status(404).send('Movie not found');
    }
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = server; // Exportera server istället för app
