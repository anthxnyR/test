// components/ClientList.js
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const ClientList = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // Fetch the client data from the API endpoint
    fetch('http://localhost:3000/api/customers')
      .then((response) => response.json())
      .then((data) => setUsersData(data))
      .catch((error) => console.error('Error fetching client data:', error));
  }, []);

  return (
    <div>
      {usersData.map((user) => (
        <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={user.image}
            alt={`${user.first_name} ${user.last_name}`}
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
          />
          <div>
            <Typography variant="body1">{user.first_name} {user.last_name}</Typography>
            <Typography variant="subtitle2">ID: {user.id}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
