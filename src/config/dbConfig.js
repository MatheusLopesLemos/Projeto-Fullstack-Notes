const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://matheusll:PZ8kkYGLtPaKK4Ei@cluster0.rtz8i2x.mongodb.net/annotations?retryWrites=true&w=majority&appName=Cluster0'

const connection = mongoose.connect(dbConfig);

module.exports = connection;

