const express = require('express');
const path = require('path');
const cors = require('cors');
const urlsRouter = require('./routes/urls');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/api/urls', urlsRouter);

app.use((req, res) => res.status(404).send('Not Found'));

module.exports = app;