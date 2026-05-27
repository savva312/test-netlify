import readlineSync from "readline-sync";
const notes =[
    {
        "id": 1,
        "name": "Note 1",
        "content": "This is the first note"
    },
    {       
        "id": 2,    
        "name": "Note 2",
        "content": "This is the second note"
    },
    {       
        "id": 2,    
        "name": "Note 2",
        "content": "This is the second note"
    }
]

console.log("Welcome to the note-taking app!");
console.log("What do you want to do?");
console.log("1. View notes");
console.log("2. Add a note");
console.log("3. Update a note");
console.log("4. Delete a note");


const option = readlineSync.question("Select an option: ");
console.log("You entered:", option);

console.log("Before update:");
console.log(notes);
for (const note of notes) { 
    if(note.id === 2) {
        note.content = "This is the updated second note";
    }
}
console.log("After update:");
console.log(notes);