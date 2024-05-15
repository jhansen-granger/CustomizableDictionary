// src/components/EditTermForm.js
import React, { useState, useEffect } from 'react';

const EditTermForm = ({ term, onSave, onCancel }) => {
  const [name, setName] = useState(term.name);
  const [definition, setDefinition] = useState(term.definition);
  const [acronym, setAcronym] = useState(term.acronym);

  useEffect(() => {
    setName(term.name);
    setDefinition(term.definition);
    setAcronym(term.acronym);
  }, [term]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(term.id, { name, definition, acronym });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Definition:</label>
        <textarea value={definition} onChange={e => setDefinition(e.target.value)} />
      </div>
      <div>
        <label>Acronym:</label>
        <input type="text" value={acronym} onChange={e => setAcronym(e.target.value)} />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTermForm;
