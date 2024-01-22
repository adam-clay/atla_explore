import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BranchDetail() {
  const [branch, setBranch] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/branches/${name}`)
      .then(response => setBranch(response.data))
      .catch(error => console.error('Error fetching branch:', error));
  }, [name]);

  if (!branch) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{branch.name}</h2>
      {/* Display other branch details here */}
    </div>
  );
}

export default BranchDetail;