const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/devs', {useUnifiedTopology: true, useNewUrlParser: true});

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333);
