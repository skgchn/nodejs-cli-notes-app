const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

// Set yargs version
yargs.version('1.0.0');

// add, rm, view, list
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
         title: {
             describe: 'Note title',
             demandOption: true,
             type: 'string'
         },
         body: {
             describe: 'Note body',
             demandOption: true,
             type: 'string'
         }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'rm',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
   },
    handler(argv) {
        notes.rmNote(argv.title)
    }
});

yargs.command({
    command: 'view',
    describe: 'View a note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
   },
   handler(argv) {
        notes.viewNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler() {
        notes.listNotes();
    }
});

yargs.parse();