// importing the file system module
var fs = require('fs');
// importing the yargs parser module
var parser = require('yargs');
// importing the chalk output module
var chalk = require('chalk');
// importing the custom notes utility modules
var notes = require('./notes.js');

// customize yargs version
parser.version('1.0.0');

parser.command( {
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
            type: 'String'
        }
    },
    handler(arg) 
    {
        notes.addNotes(arg.title, arg.body);
    }
});

parser.command( {
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(arg){
        notes.removeNotes(arg.title);
    }
});

parser.command( {
    command: 'list',
    describe: 'list existing notes',
    handler(){
        notes.listNotes();
    }
});

parser.command( {
    command: 'read',
    describe: 'read a command',
    builder: {
        title : {
            describe: "title of note to read",
            demandOption: true,
            type: "string"
        }
    },
    handler(arg){
        notes.readNotes(arg.title);
    }
})

parser.parse();
