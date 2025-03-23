const request = require('supertest')
const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()


const trajetsCompose = require('../routes/trajetCompose')
const app = express()
app.use(express.json())
app.use('/api/trajets-compose', trajetsCompose)

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async()=>{
    await mongoose.connection.close()
})


//test Post

describe('POST /api/trajets-compose', () => {
    test('crée un trajet composé', async () => {
      const fakeTrajetCompose = {
        transport: 'tramway',
        ligne: 'T3',
        couleur: '#00ffcc',
        duree: '25min',
        stations: [
          { nom: 'Porte de Vincennes', horaire: '08:00' },
          { nom: 'Porte de Choisy', horaire: '08:25' }
        ]
      }
  
      const res = await request(app)
        .post('/api/trajets-compose')
        .send(fakeTrajetCompose)
  
      expect(res.statusCode).toBe(201)
      expect(res.body.ligne).toBe('T3')
      expect(res.body.transport).toBe('tramway')
      expect(res.body.couleur).toBe('#00ffcc')
      expect(res.body.duree).toBe('25min')
      expect(res.body.stations.length).toBe(2)
    })
  })
