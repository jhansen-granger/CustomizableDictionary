// src/components/TermList.js
import React, { useEffect, useState } from 'react';
import { getTerms } from '../services/termService';

const TermList = () => {
  const [terms, setTerms] = useState([]);

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

  return (
    <div>
      <h1>Terms</h1>
      <ul>
        {terms.map((term) => (
          <li key={term.id}>
            <strong>{term.name}:</strong> {term.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TermList;
