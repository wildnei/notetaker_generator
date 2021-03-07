
const path = require('path');
const fs = require('fs')
const uuid = require('uuid')
// const index = require('index')

// ROUTING

module.exports = (app) => {

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    // If no matching route is found default to home

    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            res.send(data)
            // console.log(__dirname);
        })
    })


    app.post('/api/notes', (req, res) => {
        //1. capture our request body in newNote
        const newNote = req.body;
        //1b. use uuid package to generate a new id string
        //1c.use our new id string to add an 'id' property to our newNote
        console.log(newNote);
        try {
            //2. read db.json to get the current array of notes
            fs.readFile('./db/db.json', 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }
                //3. parse the string content of db.json into an array we can work with
                const noteArray = JSON.parse(data);
                console.log(noteArray);
                //4. add our new note to th note array
                noteArray.push(newNote)
                console.log(noteArray);
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
            res.status(500).json(e);
        }
    });

  
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
