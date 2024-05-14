// backend/app.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const app = express();
const port = process.env.PORT || 3001;
const host = 'localhost';

// Define Term model
const Term = sequelize.define('Term', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  definition: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Middleware
app.use(express.json());

// Routes
app.get('/api/terms', async (req, res) => {
  try {
    const terms = await Term.findAll();
    res.json(terms);
  } catch (error) {
    console.error('Error fetching terms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/terms', async (req, res) => {
  try {
    const { name, definition } = req.body;
    const newTerm = await Term.create({ name, definition });
    res.json(newTerm);
  } catch (error) {
    console.error('Error adding term:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

