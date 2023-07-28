import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddClient = () => {
  const [clientInfo, setClientInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: 'Male',
    image: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate fields before submitting the form
    if (!clientInfo.first_name || !clientInfo.last_name || !clientInfo.email || !clientInfo.gender || !clientInfo.image) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Validate email before submitting the form
    if (!isEmailValid(clientInfo.email)) {
      setEmailError(true); // Show email validation error
      return;
    } else {
      setEmailError(false); // Reset email validation error
    }

    if (clientInfo.gender === 'Other' && !clientInfo.otherGender) {
      setSnackbarMessage('Please specify the gender.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    } else if (clientInfo.gender === 'Other') {
      clientInfo.gender = clientInfo.otherGender;
    }

    // Fetch the client data from the API endpoint based on the entered ID
    fetch('http://localhost:3000/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientInfo),
    })
      .then((response) => {
        if (response.ok) {
          // Client added successfully
          setClientInfo({
            first_name: '',
            last_name: '',
            email: '',
            gender: '',
            image: '',
          });
          setSnackbarMessage('Costumer added successfully.');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        } else {
          // API returned an error
          return response.json().then((data) => {
            if (data.code === 'email_exists') {
              // Show specific error message from the API response
              setSnackbarMessage(data.error);
            } else {
              setSnackbarMessage('An error occurred while adding the costumer.');
            }
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          });
        }
      })
      .catch((error) => {
        console.error('Error adding costumer:', error);
        setSnackbarMessage('An error occurred while adding the costumer.'); 
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
    setSnackbarSeverity('success');
  };

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="first_name"
              value={clientInfo.first_name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              name="last_name"
              value={clientInfo.last_name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={clientInfo.email}
              onChange={handleInputChange}
              required
              error={emailError} // Use the emailError state for showing the error
              helperText={emailError && 'Please enter a valid email address.'}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={clientInfo.gender}
                onChange={handleInputChange}
                label="Gender"
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {clientInfo.gender === 'Other' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Specify Gender"
                variant="outlined"
                name="otherGender"
                value={clientInfo.otherGender}
                onChange={handleInputChange}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              name="image"
              value={clientInfo.image}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Costumer
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddClient;
