const express = require('express');
const session = require('express-session');
const ejs = require('ejs');

const body_parser = require('body-parser');
const path = require('path');

const app = express();
const port = 80;
const hostname = '127.0.0.1';

const constants = require('./constants.js');
const mysql = require('mysql');
constants.CONNECTIONS.RADIUS = mysql.createConnection({
    host: "192.168.1.10",
    user: "webserver",
    password: "12345678",
    database: "radius"
});

constants.CONNECTIONS.VMAIL = mysql.createConnection({
    host: "192.168.1.10",
    user: "webserver",
    password: "12345678",
    database: "vmail"
})

constants.CONNECTIONS.RADIUS.connect((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Connected to MYSQL RADIUS!");

        constants.CONNECTIONS.VMAIL.connect((error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Connected to MYSQL VMAIL!");
                constants.CONNECTION_SUCCESS = true
            }
        });
    }
});



const session_posts = require('./routes/session_post.js');
const session_gets = require('./routes/session_get.js');
const profile_gets = require('./routes/profile_get.js');

// Set the view engine to 'ejs'
app.set('view engine', 'ejs');
// Set the views directory where ejs gets the templates from
app.set('views', path.join(__dirname, 'views'));

// Middleware BodyParser
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
// Set the static directory for the client resources like css, client js, ...
app.use(express.static(path.join(__dirname, 'public')));
// Configure the sessions
app.use(session({resave: false, saveUninitialized: true, secret: "ajs123lmsad9123möl9undj"}));

app.listen(port, () => {
    console.log(`Server is running on http://${hostname}:${port}.`);
});

app.get('/', (request, response) => {
    if (!constants.CONNECTION_SUCCESS) {
        return response.status(500).render("error/500")
    }
    response.redirect("/login");
});

app.get('/register', session_gets.register);
app.post('/register', session_posts.register);

app.get('/login', session_gets.login);
app.post('/login', session_posts.login);

app.get('/logout', session_gets.logout);
app.get('/stats', profile_gets.view);

app.get('*', (request, response) => {
    if (!constants.CONNECTION_SUCCESS) {
        return response.status(500).render("error/500")
    }
    return response.status(404).render("error/404")
})