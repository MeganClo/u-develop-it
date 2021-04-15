const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 4000;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'password',
      database: 'election'
    },
    console.log('Connected to the election database.')
);

app.get('/', (req, res) => {
    res.json({
      message: "Let's get this sorted!"
    });
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

// default response for any other request (not found) **MUST GO AT BOTTOM OF OTHER ROUTES**
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});