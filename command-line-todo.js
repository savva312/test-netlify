import readlineSync from "readline-sync";

const notes = [
  {
    id: 1,
    name: "Note 1",
    content: "This is the first note",
  },
  {
    id: 2,
    name: "Note 2",
    content: "This is the second note",
  },
  {
    id: 3,
    name: "Note 4",
    content: "This is the third note",
  },
];

while (true) {
  console.log("Welcome to the note-taking app!");
  console.log("What do you want to do?");
  console.log("1. Προβολή σημείωσης");
  console.log("2. Πρόσθεσε νέα σημείωση");
  console.log("3. Ενημέρωση σημείωσης");
  console.log("4. Διαγραφή σημείωσης");
  console.log("5. Έξοδος");

  const option = readlineSync.question("Επίλεξε μια επιλογή: ");
  console.log("Έβαλες:", option);

  if (option == "1") {
    console.log(notes);
  } else if (option == "2") {
    const name = readlineSync.question("Όνομα νέας σημείωσης: ");
    const content = readlineSync.question("Περιεχόμενο νέας σημείωσης: ");
    const newId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
    notes.push({ id: newId, name, content });
    console.log("Η νέα σημείωση προστέθηκε:");
    console.log(notes[notes.length - 1]);
  } else if (option == "3") {
    console.log("Πριν την ενημέρωση:");
    console.log(notes);

    const id_that_the_user_needs_to_update = Number(
      readlineSync.question(
        "Από ποια σημείωση θέλεις να κάνεις ενημέρωση (id): ",
      ),
    );
    const updated_version_note = readlineSync.question(
      "Γράψε την ενημερωμένη έκδοση της σημείωσης: ",
    );

    let found = false;
    for (const note of notes) {
      if (note.id === id_that_the_user_needs_to_update) {
        note.content = updated_version_note;
        found = true;
      }
    }

    if (!found) {
      console.log("Δεν βρέθηκε σημείωση με αυτό το id.");
    } else {
      console.log("Μετά την ενημέρωση:");
      console.log(notes);
    }
  } else if (option == "4") {
    const delete_id = Number(
      readlineSync.question("Ποια σημείωση θέλεις να διαγράψεις (id): "),
    );
    const index = notes.findIndex((note) => note.id === delete_id);
    if (index === -1) {
      console.log("Δεν βρέθηκε σημείωση με αυτό το id.");
    } else {
      const deleted = notes.splice(index, 1)[0];
      console.log("Η σημείωση διαγράφηκε:");
      console.log(deleted);
      console.log("Μετά την διαγραφή:");
      console.log(notes);
    }
  } else if (option == "5") {
    console.log("Αντίο");
    break;
  } else {
    console.log("Μη έγκυρη επιλογή. Δοκίμασε ξανά.");
  }
}
