// src/components/NewTermDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const NewTermDialog = ({ open, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [definition, setDefinition] = useState('');
  const [acronym, setAcronym] = useState('');

  const handleSubmit = async () => {
    await onSave({ name, definition, acronym });
    setName('');
    setDefinition('');
    setAcronym('');
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add New Term</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Definition"
          type="text"
          fullWidth
          multiline
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Acronym"
          type="text"
          fullWidth
          value={acronym}
          onChange={(e) => setAcronym(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTermDialog;
