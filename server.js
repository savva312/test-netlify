import express from 'express';
import mongoose from 'mongoose';

const app = express();

// 1. Σύνδεση με τη Βάση Δεδομένων (MongoDB) τοπικά στον υπολογιστή σου
mongoose.connect('mongodb://localhost:21017/notesDB')
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// 2. Το Σχέδιο (Schema) της Βάσης
const noteSchema = new mongoose.Schema({
  number: Number,
  name: String,
  content: String
});

// Το Μοντέλο (Model) για να κάνουμε πράξεις στη βάση
const Note = mongoose.model('Note', noteSchema);

// 3. Ρυθμίσεις Express & EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Για να διαβάζει τις φόρμες

// 4. ΔΙΑΔΡΟΜΕΣ (ROUTES)

// Αρχική Σελίδα: Διαβάζει τις σημειώσεις από τη βάση και τις δείχνει
app.get('/', async (req, res) => {
  try {
    const allNotes = await Note.find(); // Παίρνει ΟΛΕΣ τις σημειώσεις από τη βάση
    res.render('index', { notes: allNotes }); // Τις στέλνει στο index.ejs
  } catch (err) {
    res.status(500).send("Error fetching notes");
  }
});

// Προσθήκη Σημείωσης: Παίρνει τα δεδομένα από τη φόρμα και τα σώζει στη βάση
app.post('/add', async (req, res) => {
  try {
    const totalNotes = await Note.countDocuments();
    
    const newNote = new Note({
      number: totalNotes + 1,
      name: req.body.noteTitle,
      content: req.body.noteContent
    });

    await newNote.save(); // Αποθήκευση στη βάση για πάντα!
    res.redirect('/');    // Ανανέωση της σελίδας
  } catch (err) {
    res.status(500).send("Error saving note");
  }
});

// Διαγραφή Σημείωσης: Βρίσκει τη σημείωση με το ID της και τη σβήνει
app.post('/delete', async (req, res) => {
  try {
    const idToDelete = req.body.noteId;
    await Note.findByIdAndDelete(idToDelete); // Σβήσιμο από τη βάση
    res.redirect('/');
  } catch (err) {
    res.status(500).send("Error deleting note");
  }
});

// Ξεκινάει ο server στην πόρτα 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});