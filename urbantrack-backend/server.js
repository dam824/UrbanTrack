require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const trajetsRoutes = require('./routes/trajets');
const trajetComposeRoute = require('./routes/trajetCompose')

const app = express();

 
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  

app.use(express.json());

app.use('/api/trajets', trajetsRoutes);
app.use('/api/trajets-compose', trajetComposeRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connexion db ok'))
  .catch(err => console.error('erreur', err));

app.get('/', (req, res) => {
  res.send('bienvenu sur urbantracker');
});

app.listen(PORT, () => {
  console.log(`port ecoute ${PORT}`);
});
