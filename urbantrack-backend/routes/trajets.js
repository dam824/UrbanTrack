const express = require('express');
const Trajet = require('../models/Trajets');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const trajets = await Trajet.find();
        res.json(trajets);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req,res) => {
    try{
        const newTrajet = new Trajet(req.body);
        await newTrajet.save();
        res.status(201).json(newTrajet);
    }catch(err){
        console.error('Erreur POST trajet:', err)
        res.status(500).json({error: err.message})
    }
});

router.get('/:id', async(req,res)=>{
    try  {
        const trajet = await Trajet.findById(req.params.id);
        if(!trajet){
            return res.status(400).json({message : "Trajet non trouvé"});
        }
        res.json(trajet);
    }catch(err){
        res.status(500).json({message:'Erreur serveur'});
    }
});

module.exports= router;