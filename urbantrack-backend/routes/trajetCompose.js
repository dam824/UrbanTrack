const express = require('express');
const TrajetCompose = require('../models/TrajetCompose');

const router = express.Router(); 





//Get trajet composé 
router.get('/', async (req, res) =>{
  try{
    const trajets = await TrajetCompose.find();
    res.json(trajets)
  }catch(err){
    res.status(500).json({error: err.message})
  }
})
//Post trajet composé
router.post('/', async(req, res)=> {
    try{
            const newTrajet = new TrajetCompose(req.body)
            await newTrajet.save()
            res.status(201).json(newTrajet)
             
    }catch(err){
        res.status(500).json({error : err.message})
    }
})

//Tout les trajets composés
router.get('/:id', async (req, res) => {
    try {
      const trajet = await TrajetCompose.findById(req.params.id);
      if (!trajet) {
        return res.status(404).json({ message: 'Trajet non trouvé' });
      }
      res.json(trajet);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



module.exports = router