// src/components/AddTermForm.js
import React, { useState } from 'react';

const AddTermForm = ({ onAddTerm }) => {
  const [name, setName] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTerm = { name, definition };
      await onAddTerm(newTerm);
      // Clear the form
      setName('');
      setDefinition('');
    } catch (error) {
      console.error('Error adding term:', error);
    }
  };

  return (
    <div>
      <h1>Add Term</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Definition:</label>
          <input type="text" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        </div>
        <button type="submit">Add Term</button>
      </form>
    </div>
  );
};

export default AddTermForm;
