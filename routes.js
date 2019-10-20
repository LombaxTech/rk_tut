const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
let db = admin.firestore();

router.get('/', (req, res) => {
    // res.render('home', {loggedIn: 'Logged in', tutors: [
    //     {
    //         email: 'rakibkhan@live.co.uk',
    //         name: 'Rakib Khan',
    //         subjects: ['math', 'physics']
    //     },
    //     {
    //         email: 'shinton@live.co.uk',
    //         name: 'Craig Shinton',
    //         subjects: ['math']
    //     }
    // ]});

    db.collection('tutors').get()
        .then(snapshot => {
            let tutorArray = [];
            snapshot.docs.forEach(doc => {
                tutorArray.push(doc.data())
            });
            res.render('home', {loggedIn: 'Logged in', tutors: tutorArray})
        })
        .catch(err => {
            return res.send(`there has been an error of: ${err}`)
        })
})

router.get('/tutors/:tutorEmail', (req, res) => {
    // res.send(req.params.tutorEmail);
    db.collection('tutors').where('email','==',`${req.params.tutorEmail}`).get()
        .then(snapshot => {
            let user = snapshot.docs[0].data();
            res.render('tutorPage', {user});
        })
        .catch(err => {
            return res.send(`error of: ${err}`);
        })

    // res.render('tutorPage', {tutorEmail: req.params.tutorEmail});
})

router.get('/findatutor', (req, res) => {
        // db.collection('characters').get()
        //     .then(snapshot => {
        //         res.send(snapshot.docs[0].data())
        //     })
        //     .catch(err => res.send(`error of: ${err}`))

        res.render('findatutor')
})

router.post('/findatutorFiltered', (req, res) => {
    // res.send(req.body.subject);
    db.collection('tutors').where('subjects', 'array-contains', `${req.body.subject}`).get()
        .then(snapshot => {
            let filteredTutors = [];
            snapshot.docs.forEach(doc => filteredTutors.push(doc.data()));
            // res.send(filteredTutors);
            res.render('findatutor', {filteredTutors});
        })
        .catch(err => {
            return res.send(`there has been an error of: ${err}`)
        })
})

router.post('/signUp', (req, res) => {
    res.send(req.body)
    // Validate input
    // Save user to DB 
    // Redirect to logged in homepage with cookies for account 
})

module.exports = router;
