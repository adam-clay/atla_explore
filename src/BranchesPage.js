import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BranchesPage() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/branches')
      .then(response => setBranches(response.data))
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  return (
    <div>
      <h1>Branches</h1>
      <ul>
        {branches.map(branch => (
          <li key={branch.id}>
            <Link to={`/branches/${branch.name}`} className = "branch-item">
            <span>{branch.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BranchesPage;