const mongoose = require('mongoose')

const arretSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    horaire: { type: String, required: true }
})

const trajetComposeSchema = new mongoose.Schema({
    transport: { type: String, required: true },
    ligne: { type: String, required: true },
    couleur: { type: String, required: true },
    duree: { type: String, required: true },
    stations: [arretSchema]
})

module.exports = mongoose.model('TrajetCompose', trajetComposeSchema)