const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();

const app = express()

const alertRoutes = require('./routes/alerts');

const port = 8000;

const mongoURI = process.env.MONGODB_URI;

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello there! Welcome to backend of alerting system');
});

app.use('/api', alertRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connection established")
    app.listen(port, () => {
        console.log(`server running on http://localhost:${port}/`)
    })
})
.catch((error) => {
    console.log("Connection failed", error)
})