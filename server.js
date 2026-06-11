import express from 'express';
import mongoose from 'mongoose';

const app = express();

// 1. Σύνδεση με τη Βάση Δεδομένων (MongoDB) τοπικά στον υπολογιστή σου
mongoose.connect('mongodb://localhost:21017/notesDB')
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// 2. Το Σχέδιο (Schema) της Βάσης
const noteSchema = new mongoose.Schema({
  user: String,
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
// 1. ΝΕΟ ROUTE: Εμφανίζει τη σελίδα Login όταν μπαίνεις στο localhost:3000
app.get('/', (req, res) => {
  res.render('login');
});

// 2. ΑΛΛΑΓΗ ROUTE: Η σελίδα των σημειώσεων φιλτράρει πλέον βάσει χρήστη
app.get('/notes', async (req, res) => {
  const currentUser = req.query.user; // Διαβάζει το ?user=... από το URL
  
  if (!currentUser) {
    return res.redirect('/'); // Αν δεν επέλεξε όνομα, γυρίζει στο login
  }

  // Βρίσκει ΜΟΝΟ τις σημειώσεις που έχουν το όνομα του τρέχοντος χρήστη
  const userNotes = await Note.find({ user: currentUser });
  
  res.render('index', { 
    notes: userNotes, 
    currentUser: currentUser 
  });
});

// 3. ΑΛΛΑΓΗ ROUTE: Η προσθήκη σημείωσης αποθηκεύει και τον χρήστη
app.post('/add', async (req, res) => {
  const currentUser = req.query.user; 
  if (!currentUser) return res.redirect('/');

  const count = await Note.countDocuments();
  
  const newNote = new Note({
    user: currentUser, // <-- Αποθηκεύεται το όνομα αυτού που τη γράφει
    name: req.body.noteTitle,
    content: req.body.noteContent,
    number: count + 1
  });

  await newNote.save();
  res.redirect(`/notes?user=${currentUser}`); // Επιστροφή στις σημειώσεις του
});

// 4. ΑΛΛΑΓΗ ROUTE: Η διαγραφή
app.post('/delete', async (req, res) => {
  const currentUser = req.query.user;
  if (!currentUser) return res.redirect('/');
  
  await Note.findByIdAndDelete(req.body.noteId);
  res.redirect(`/notes?user=${currentUser}`); // Επιστροφή στις σημειώσεις του
});


// Ξεκινάει ο server στην πόρτα 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});