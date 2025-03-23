const mongoose = require('mongoose');

const trajetSchema = new mongoose.Schema({
    depart: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },  
    heure: { type: String, required: true },
    synoptique: {
      type: String,
      enum: ['normal', 'retard', 'incident'],
      default: 'normal'
    }
  });
 
const Trajet = mongoose.model('Trajet', trajetSchema);

module.exports = Trajet;