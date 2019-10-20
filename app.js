const express = require('express');
const app = express();

const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://learning-firebase-eac7e.firebaseio.com"
});

let db = admin.firestore();

db.collection('tutors').where('subjects', 'array-contains', 'physics').get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data())
        })
    })
    .catch(err => {
        return console.log(`there has been an error of: ${err}`)
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('views', './views');
app.set('view engine', 'ejs');

const routes = require('./routes');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('started listening'));