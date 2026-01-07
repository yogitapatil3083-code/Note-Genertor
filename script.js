const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const errorMsg = document.getElementById("errorMsg");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Display notes on page load
displayNotes();

// Add Note
addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        errorMsg.textContent = "Please write something!";
        return;
    }

    errorMsg.textContent = "";
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    displayNotes();
});

// Display Notes
function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        const notePara = document.createElement("p");
        notePara.textContent = note;

        const btnDiv = document.createElement("div");
        btnDiv.className = "note-buttons";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editNote(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteNote(index);

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);

        noteDiv.appendChild(notePara);
        noteDiv.appendChild(btnDiv);

        notesContainer.appendChild(noteDiv);
    });
}

// Edit Note
function editNote(index) {
    const updatedNote = prompt("Edit your note:", notes[index]);

    if (updatedNote !== null && updatedNote.trim() !== "") {
        notes[index] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}

// Delete Note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}



