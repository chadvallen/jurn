const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();
const UC = require('./user_controller');
const PC = require('./posts_controller');

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
});

app.use( express.static( `${__dirname}/../build` ) );

app.get('/auth/callback', UC.login);
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send();
});
app.get('/api/user-data', (req, res) => {
    console.log('req.session--->', req.session)
    res.json({ user: req.session.user });
});

app.get('/api/posts/:username', PC.getPostsPrivate);
app.post('/api/posts', PC.createPost);


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 3560;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

