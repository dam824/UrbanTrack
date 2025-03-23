function formatTrajet(trajet){
    return `${trajet.ligne.toUpperCase()} - ${trajet.transport} (${trajet.duree})`
}

module.exports = { formatTrajet}