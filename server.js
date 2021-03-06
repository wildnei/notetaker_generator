// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const path = require("path")
const express = require('express');

// EXPRESS CONFIGURATION

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTER
require('./routes/htmlRoutes')(app);


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});

