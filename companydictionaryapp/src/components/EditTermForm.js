// src/components/EditTermForm.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditTermForm = ({ open, term, onSave, onCancel, onDelete}) => {
  const [name, setName] = useState(term.name);
  const [acronym, setAcronym] = useState(term.acronym);
  const [definition, setDefinition] = useState(term.definition);

  useEffect(() => {
    setName(term.name);
    setDefinition(term.definition);
    setAcronym(term.acronym);
  }, [term]);

  const handleSubmit = async () => {
    await onSave(term.id, { name, definition, acronym });
  };

   const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this term?')) {
      await onDelete(term.id);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Edit Term</DialogTitle>
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
          label="Acronym (optional)"
          type="text"
          fullWidth
          value={acronym}
          onChange={(e) => setAcronym(e.target.value)}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
         <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTermForm;
