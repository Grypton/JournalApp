const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment'); // Add this line

const app = express();
const PORT = 3000;

let journalEntries = {}; // In-memory storage, you can replace this with a database

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Home route - displays the grid
app.get('/', (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('index', { year: currentYear, journalEntries: journalEntries });
});

// Journal route - displays the journal entry page for a specific date
app.get('/journal/:date', (req, res) => {
  const date = req.params.date;
  const entry = journalEntries[date] || "";
  res.render('journal', { date: date, entry: entry });
});

// Post route to save the journal entry
app.post('/journal/:date', (req, res) => {
  const date = req.params.date;
  const entry = req.body.entry;
  journalEntries[date] = entry;
  res.redirect(`/journal/${date}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
