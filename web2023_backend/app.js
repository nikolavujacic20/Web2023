// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
const profileRoute = require('./routes/profileRoute');
const postRoute = require('./routes/postRoute');
const usersRoute = require('./routes/usersRoute');
const pictureRoute = require('./routes/pictureRoute');
const messageRoute = require('./routes/messageRoute');

const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);


app.use('/api', loginRoute);
app.use('/profile', profileRoute);
app.use('/posts', postRoute);
app.use('/users', usersRoute);
app.use('/pictures', pictureRoute);
app.use('/messages', messageRoute);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});