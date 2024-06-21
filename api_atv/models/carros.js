const mongoose = require('mongoose');


const carrosSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true, 
  },
  marca: {
    type: String,
    required: true, 
  },
  modelo: {
    type: String,
    required: true, 
  },
  ano: {
    type: Number,
    required: true, 
  },
  tipo: {
    type: String,
    required: true, 
  },
  foto: {
    type: String,
    required: true, 
  },
});

const Carros = mongoose.model('carro', carrosSchema);

module.exports = Carros;
