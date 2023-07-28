// components/ClientDetails.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const ClientDetails = () => {
  const [clientId, setClientId] = useState('');
  const [clientData, setClientData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleInputChange = (event) => {
    setClientId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch the client data from the API endpoint based on the entered ID
    fetch(`http://localhost:3000/api/customers/${clientId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Client ID not found');
        }
      })
      .then((data) => {
        setClientData(data);
        setSnackbarOpen(false); // Close the Snackbar if it was open from a previous error
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
        setClientData(null);
        setSnackbarMessage('Client ID not found');
        setSnackbarOpen(true); // Open the Snackbar with the error message
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', marginBottom: '10px' }}>
              Enter Client ID
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={clientId}
              onChange={handleInputChange}
              inputProps={{ style: { textAlign: 'center' } }} // Center the text in the text field
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      {clientData && (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5">Client Information</Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <img
              src={clientData.image}
              alt={`${clientData.first_name} ${clientData.last_name}`}
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
            />
            <div>
              <Typography variant="body1">
                Name: {clientData.first_name} {clientData.last_name}
              </Typography>
              <Typography variant="body1">Gender: {clientData.gender}</Typography>
              <Typography variant="body1">Email: {clientData.email}</Typography>
            </div>
          </div>
        </Paper>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ClientDetails;
