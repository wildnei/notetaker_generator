
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');


module.exports = (app) => {


    // directs to notes page
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });


    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            res.send(data)
        })
    })


    app.post('/api/notes', (req, res) => {
        //1. capture our request body in newNote
        const newNote = req.body;
    
        //1b. Read current array of notes
        let genID = require('../db/db.json');
        //1D. Generate a new ID using uuidv4()
        newNote.id = genID.length + uuidv4()
        //1D.use our new id string to add an 'id' property to our newNote
        genID.push(newNote);

        try {
            //2. read db.json to get the current array of notes
            fs.readFile('./db/db.json', 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }
                //3. parse the string content of db.json into an array we can work with
                const noteArray = JSON.parse(data);
                
                //4. add our new note to the note array
                noteArray.push(newNote)
          
                //5. After we push our new note, write our note array back into db.json
                fs.writeFile('./db/db.json', JSON.stringify(noteArray), (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("Note Saved");
                    }
                    res.json(noteArray);
                });
            });
        } catch (e) {
            // if error executing show 500
            res.status(500).json(e);
        }

        app.delete('/api/notes/:id', (req, res) => {
            const selectById = req.params.id;
            // Read current array 
            let currentFile = require('../db/db.json');
            // select by ID
            currentFile.splice((selectById - 1), 1)
            // Write a new file after removing the information
            fs.writeFile('./db/db.json', JSON.stringify(currentFile), function (err) {
                if (err) 
                console.log(err);
            });
            res.json()
        });
    });

    // If no matching route is found default to home

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};

