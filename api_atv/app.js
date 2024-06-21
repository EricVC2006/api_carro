const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.set('strictQuery', false);

dotenv.config();

const app = express();
app.use(express.json());

const carrosRouter = require('./routes/carrosRoutes.js');
app.use('/carros', carrosRouter); // Corrigido para '/carros'

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB Atlas!');
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
