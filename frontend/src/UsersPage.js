import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.username}`} className="user-item">
              <span>{user.name}</span> - <span>{user.email}</span>
          </Link>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default UsersPage;
