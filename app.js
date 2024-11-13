const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyparser = require('body-parser'); // Ensure body-parser is required if needed
const hbs = require('hbs');
const db = require('./db/db');

const app = express();
const port = 3000;

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');

app.set('view engine', 'hbs');
app.set('views', template_path);
app.use(express.static(static_path));

// Parse application/json and application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, resp) => {
    resp.render("signup");
});

app.get('/signin', (req, resp) => {
    resp.render("signin");
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Error creating user');
        } else {
            console.log('User registered:', result);
            res.send('User successfully registered!');
        }
    });
});

app.post('/signin', (req, resp) => {
    const { email, password } = req.body;


    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return resp.status(500).send('Server error');
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare entered password with stored password
            if (password === user.password) {
                resp.render('index'); // Redirect on successful login
            } else {
                resp.render('signin', { errorMessage: 'Authentication failed! Incorrect password.' });
            }
        } else {
            resp.render('signin', { errorMessage: 'Authentication failed! Incorrect email.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
