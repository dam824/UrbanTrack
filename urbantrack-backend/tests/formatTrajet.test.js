const request = require('supertest')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const trajetsRoute = require('../routes/trajets')

const app = express()
app.use(express.json())
app.use('/api/trajets', trajetsRoute)

beforeAll(async() =>{
    await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe('GET /api/trajets', () =>{
    test('Renvoi un tableau de trajets', async ()=> {
        const res = await request(app).get('/api/trajets')
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })
})