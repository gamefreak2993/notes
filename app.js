const yargs = require("yargs");
const notes = require("./notes.js");

const titleOptions = {
    describe: "Title of the note.",
    demand: true,
    alias: "t"
},
    bodyOptions = {
        describe: "Body of the note.",
        demand: true,
        alias: "b"
    };

const argv = yargs
    .command("add", "Add a new note.", {
        title: titleOptions,
        body: bodyOptions
    })
    .command("list", "List all notes.")
    .command("read", "Read a note.", {
        title: titleOptions
    })
    .command("remove", "Remove a note.", {
        title: titleOptions
    })
    .help()
    .argv,
    command = argv._[0];

if (command === "add") {
    const note = notes.addNote(argv.title, argv.body);

    if (note) {
        notes.logNote("created", note);
    } else {
        console.log(`Note was not created. Note title ("${argv.title}") has already been used!`);
    }
} else if (command === "list") {
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote("printed", note));
} else if (command === "read") {
    const note = notes.readNote(argv.title);

    if (note) {
        notes.logNote("found", note);
    } else {
        console.log(`Note ("${argv.title}") has not been found!`);
    }
} else if (command === "remove") {
    const noteRemoved = notes.removeNote(argv.title),
        message = noteRemoved ? `Note ("${argv.title}") has been removed.` : `Note ("${argv.title}") has not been found!`;

    console.log(message);

} else {
    console.log("Command not recognized!");
};
