// src/components/TermList.js
import React, { useEffect, useState } from 'react';
import { getTerms, addTerm, updateTerm, deleteTerm } from '../services/termService';
import EditTermForm from './EditTermForm';
import NewTermDialog from './NewTermDialog';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const TermList = () => {
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTerm, setEditingTerm] = useState(null);
  const [openNewTermDialog, setOpenNewTermDialog] = useState(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const terms = await getTerms();
        const sortedTerms = terms.sort((a, b) => a.name.localeCompare(b.name));
        setTerms(terms);
        setFilteredTerms(terms);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = terms.filter(term =>
        term.name.toLowerCase().includes(lowercasedQuery) ||
        term.definition.toLowerCase().includes(lowercasedQuery) ||
        (term.acronym && term.acronym.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredTerms(filtered);
    } else {
      setFilteredTerms(terms);
    }
  }, [searchQuery, terms]);

  const handleEdit = (term) => {
    setEditingTerm(term);
  };

  const handleSave = async (id, updatedTerm) => {
    try {
      const savedTerm = await updateTerm(id, updatedTerm);
      const updatedTerms = terms.map(term => (term.id === id ? savedTerm : term));
      const sortedTerms = updatedTerms.sort((a, b) => a.name.localeCompare(b.name));
      setTerms(sortedTerms);
      setFilteredTerms(sortedTerms);
      setEditingTerm(null);
    } catch (error) {
      console.error('Error updating term:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTerm(id);
      const updatedTerms = terms.filter(term => term.id !== id);
      const sortedTerms = updatedTerms.sort((a, b) => a.name.localeCompare(b.name));
      setTerms(sortedTerms);
      setFilteredTerms(sortedTerms);
      setEditingTerm(null);
    } catch (error) {
      console.error('Error deleting term:', error);
    }
  };

  const handleCancel = () => {
    setEditingTerm(null);
  };

  const handleAddTerm = async (newTerm) => {
    try {
      const savedTerm = await addTerm(newTerm);
      const updatedTerms = [...terms, savedTerm];
      const sortedTerms = updatedTerms.sort((a, b) => a.name.localeCompare(b.name));
      setTerms(sortedTerms);
      setFilteredTerms(sortedTerms);
      setOpenNewTermDialog(false);
    } catch (error) {
      console.error('Error adding term:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: '800px', margin: 'auto' }}>
      <h1>Terms</h1>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenNewTermDialog(true)}
        sx={{ marginBottom: 2 }}
      >
        Add New Term
      </Button>
      <List>
        {filteredTerms.map((term) => (
          <ListItem key={term.id}>
            <ListItemText
              primary={`${term.name} ${term.acronym ? `(${term.acronym})` : ''}`}
              secondary={term.definition}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(term)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {editingTerm && (
        <EditTermForm
          open={Boolean(editingTerm)}
          term={editingTerm}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
      {openNewTermDialog && (
        <NewTermDialog
          open={openNewTermDialog}
          onSave={handleAddTerm}
          onCancel={() => setOpenNewTermDialog(false)}
        />
      )}
    </Box>
  );
};

export default TermList;
