const express = require('express');
const router = express.Router();
const Carro = require('../models/carros'); 


router.get('/', async (req, res) => {
    try {
        const carros = await Carro.find();
        res.json(carros);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id', getCarro, (req, res) => {
    res.json(res.carro);
});


router.post('/', async (req, res) => {
    const carro = new Carro({
        nome: req.body.nome,
        modelo: req.body.modelo,
        marca: req.body.marca,
        ano: req.body.ano,
        foto: req.body.foto,
    });

    try {
        const newCarro = await carro.save();
        res.status(201).json(newCarro);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', getCarro, async (req, res) => {
    if (req.body.nome != null) {
        res.carro.nome = req.body.nome;
    }
    if (req.body.modelo != null) {
        res.carro.modelo = req.body.modelo;
    }
    if (req.body.marca != null) {
        res.carro.marca = req.body.marca;
    }
    if (req.body.ano != null) {
        res.carro.ano = req.body.ano;
    }
    if (req.body.foto != null) {
        res.carro.foto = req.body.foto;
    }

    try {
        const updatedCarro = await res.carro.save();
        res.json(updatedCarro);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', getCarro, async (req, res) => {
    try {
        await res.carro.deleteOne();
        res.json({ message: 'Carro excluído com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCarro(req, res, next) {
    let carro;
    try {
        carro = await Carro.findById(req.params.id);
        if (carro == null) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.carro = carro;
    next();
}

module.exports = router;
