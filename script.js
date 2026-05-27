// Starter file for students.
// Goal: build a simple notes app using arrays + loops.
const notes = [];

const form = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");
const totalCounter = document.getElementById("total-notes");
const doneCounter = document.getElementById("done-notes");

function renderNotes() {
  // TODO 1: clear the list before re-rendering
  // notesList.innerHTML = "";

  // TODO 2: calculate done notes using a loop
  // let doneCount = 0;
  // for (const note of notes) {
  //   if (note.done) doneCount += 1;
  // }

  // TODO 3: update counters
  totalCounter.textContent = String(notes.length);
  doneCounter.textContent = "0";

  // TODO 4: loop through notes and create <li> items
  // Hints:
  // - createElement("li")
  // - textContent = `${note.title}: ${note.content}`
  // - appendChild(...)
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    return;
  }

  // TODO 5: create note object and push to notes array
  // const newNote = { id: Date.now(), title, content, done: false };
  // notes.push(newNote);

  // TODO 6: reset form and re-render
  // form.reset();
  // renderNotes();
});

renderNotes();
