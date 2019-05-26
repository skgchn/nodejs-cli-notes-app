const jsonfile = require('jsonfile');
const chalk = require('chalk');

const notesFile = './notes.json';

const loadNotes = () => {
    let notes = [];

    try {
      notes = jsonfile.readFileSync(notesFile);
    }
    catch (e) {
        // do nothing
    }

    //console.log('loadNotes: notes', notes);
    
    return notes;
};

const persistNotes = notes => {
    //console.log('persistNotes: notes', notes);
    jsonfile.writeFileSync(notesFile, notes);
}

const addNote = (title, body) => {
    let notes = loadNotes();

    console.log('Adding a new note.');
    console.log('Title: ' + title);
    console.log('Body: ' + body);

    const duplicateNote = notes.find(note => note.title === title)

     if (duplicateNote) {
        console.log(chalk.red.inverse('Note is already present.'));
        return;
    }

    notes.push({
       title: title,
       body: body
   });

   persistNotes(notes);
   console.log(chalk.green.inverse('Note is added.'));
}

const rmNote = title => {
    let notes = loadNotes();

    console.log('Removing a note.');
    console.log('Title: ' + title);

    const notesToKeep = notes.filter(note => note.title !== title);

    if (notesToKeep.length === notes.length) {
      console.log(chalk.red.inverse('No note was removed.'));
      return;
    }

    persistNotes(notesToKeep);
    console.log(chalk.green.inverse('Note is removed.'));
}

const listNotes = () => {
    let notes = loadNotes();

    console.log('');
    console.log(chalk.cyan.underline.bold('Your notes'));
    console.log('');

    notes.forEach(note => {
        console.log(chalk.yellow.bold(note.title));
        console.log('');
    });
}

const viewNote = title => {
    let notes = loadNotes();

    const note = notes.find(note => note.title === title);

    debugger;
    // Run with inspect option - node inspect app.js view --title 'Funny2'
    // visit chrome://inspect in Chrome browser

    if (note) {
        console.log(chalk.yellow.bold(note.title));
        console.log(chalk.cyan.italic(note.body));
        return;
   }

   console.log(chalk.red.inverse('Note was not found.'));
}

module.exports = {
  addNote,
  rmNote,
  listNotes,
  viewNote
}
