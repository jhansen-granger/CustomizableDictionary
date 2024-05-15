// src/components/TermList.js
import React, { useEffect, useState } from 'react';
import { getTerms, updateTerm } from '../services/termService';
import EditTermForm from './EditTermForm';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const TermList = () => {
  const [terms, setTerms] = useState([]);
  const [editingTerm, setEditingTerm] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const terms = await getTerms();
        setTerms(terms);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  const handleEdit = (term) => {
    setEditingTerm(term);
  };

  const handleSave = async (id, updatedTerm) => {
    try {
      const savedTerm = await updateTerm(id, updatedTerm);
      setTerms(terms.map(term => (term.id === id ? savedTerm : term)));
      setEditingTerm(null);
    } catch (error) {
      console.error('Error updating term:', error);
    }
  };

  const handleCancel = () => {
    setEditingTerm(null);
  };

    return (
    <div>
      <h1>Terms</h1>
      {editingTerm ? (
        <EditTermForm term={editingTerm} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <List>
          {terms.map((term) => (
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
      )}
    </div>
  );
};

export default TermList;
