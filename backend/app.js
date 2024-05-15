// backend/app.js
const express = require('express');
const cors = require('cors');
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
  },
  acronym: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Middleware
app.use(cors()); // Enable CORS
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
    const { name, definition, acronym } = req.body;
    const newTerm = await Term.create({ name, definition, acronym });
    res.json(newTerm);
  } catch (error) {
    console.error('Error adding term:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/terms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, definition, acronym } = req.body;
    const term = await Term.findByPk(id);
    if (term) {
      term.name = name;
      term.definition = definition;
      term.acronym = acronym;
      await term.save();
      res.json(term);
    } else {
      res.status(404).json({ error: 'Term not found' });
    }
  } catch (error) {
    console.error('Error updating term:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/terms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const term = await Term.findByPk(id);
    if (term) {
      await term.destroy();
      res.json({ message: 'Term deleted successfully' });
    } else {
      res.status(404).json({ error: 'Term not found' });
    }
  } catch (error) {
    console.error('Error deleting term:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
