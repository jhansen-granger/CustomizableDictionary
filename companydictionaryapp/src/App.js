// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TermList from './components/TermList';
import AddTermForm from './components/AddTermForm';
import { getTerms, addTerm as addTermService } from './services/termService';

function App() {
  const [terms, setTerms] = useState([]);

  // Fetch terms on component mount
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

  const addTerm = async (term) => {
    try {
      const newTerm = await addTermService(term);
      setTerms([...terms, newTerm]);
    } catch (error) {
      console.error('Error adding term:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Company Dictionary</h1>
      </header>
      <main>
        <AddTermForm onAddTerm={addTerm} />
        <TermList terms={terms} />
      </main>
    </div>
  );
}

export default App;
