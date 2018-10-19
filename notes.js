const fs = require("fs");

const fetchNotes = _ => {
    try {
        const notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch (err) {
        return [];
    };
};

const saveNotes = notes => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

const addNote = (title, body) => {
    const notes = fetchNotes(),
        note = {
            title,
            body
        };

    const duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = _ => {
    return fetchNotes();
};

const readNote = title => {
    const notes = fetchNotes(),
        filteredNotes = notes.filter(note => note.title === title);

    return filteredNotes[0];
};

const removeNote = title => {
    const notes = fetchNotes(),
        filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

const logNote = (action, note) => {
    console.log(`Note ${action}.`);
    console.log("=== Note Contents ===");
    console.log(`title: ${note.title}`);
    console.log(`body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
};
