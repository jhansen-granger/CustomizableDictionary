// src/components/AddTermForm.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddTermForm = ({ onAddTerm }) => {
  const [name, setName] = useState('');
  const [definition, setDefinition] = useState('');
  const [acronym, setAcronym] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTerm = { name, definition, acronym };
      await onAddTerm(newTerm);
      // Clear the form
      setName('');
      setDefinition('');
      setAcronym('')
    } catch (error) {
      console.error('Error adding term:', error);
    }
  };

return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Definition"
        variant="outlined"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Acronym"
        variant="outlined"
        value={acronym}
        onChange={(e) => setAcronym(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Term
      </Button>
    </Box>
  );
};

export default AddTermForm;
