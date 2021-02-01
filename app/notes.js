const fs=require('fs');

const chalk=require('chalk');

const getNotes = function(){
    return 'Your Notes ...';
}

const addNotes = function( title, body )
{
    const notes = loadNotes();

    const duplicateNotes = notes.filter( (note) => note.title === title )

    if( duplicateNotes.length === 0 )
    {
        notes.push(
            {
                title : title,
                body : body
            }
        )
        saveNotes(notes);
        console.log(chalk.green("Note saved !"));
    }
    else{
        console.log(chalk.red("A note with same name already exists !"));
    }
}

const removeNotes = function(title){
    const notes = loadNotes();

    const notesToSave = notes.filter( (note) => !(note.title === title)  );

    if(notes.length == notesToSave.length )
    {
        console.log(chalk.red("Note '"+title + "' does not exist !"));
    }
    else{
        saveNotes( notesToSave );
        console.log(chalk.green("Note '"+title + "' Removed !"));
    }
}

const listNotes = () => {
    let notes = loadNotes();

    debugger;

    for (note of notes ){
        console.log(chalk.greenBright(note.title)+'\n');
    }
}

const readNotes = (title) => {
    let notes = loadNotes();

    let note = notes.filter( (elm) => elm.title === title );

    if( note.length === 0 )
    {
        console.log(chalk.red('This note does not exist'));
    }
    else
    {
        console.log(chalk.blueBright(note[0].title));
        console.log(chalk.green(note[0].body));
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes);

    fs.writeFileSync('notes.json', data);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataBufferString = dataBuffer.toString();
        var dataJSON = JSON.parse(dataBufferString);
        return dataJSON;
    }
    catch(err)
    {
        return [];
    }
}

module.exports = {
    getNotes : getNotes,
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
}