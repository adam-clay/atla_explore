import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserDetail() {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/users/${username}`)
      .then(response => {
        setUser(response.data);
        return axios.get(`http://localhost:8000/users/perms/${response.data.role_id}`);
      })
      .then(response => {
        setUser(user => ({ ...user, perms: response.data }));
      })
      .catch(error => console.error('Error:', error));
  }, [username]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role_name}</p>
      <h3>Permissions:</h3>
      <ul>
        {user.perms && user.perms.map((perm, index) => (
          <li key={index}>{perm.name}</li>
        ))}
      </ul>
      {/* Display other user details here */}
    </div>
  );
}

export default UserDetail;