const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Connected to DB')
}).catch(error => {
    console.error('error on massive', error)
})


const PORT = 3560;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

