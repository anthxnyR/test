// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import CreateClient from './components/CreateClient';
import { Dialog, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

import './styles.css'; // Import the custom CSS file

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setOpenModal(true);
    setSelectedOption(option);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedOption('');
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'View Customer List':
        return <ClientList />;
      case 'Check Specific Customer':
        return <ClientDetails />; // Replace with appropriate component or data fetching logic
      case 'Add Customer':
        return <CreateClient />; // Replace with appropriate component for adding a client
      default:
        return null;
    }
  };

  return (
    <Router>
      <div className="container">
        <div className="main-content">
          <Typography variant="h4" gutterBottom>
            Welcome! Please Choose an Option:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOptionClick('View Customer List')}
          >
            View Costumer List
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOptionClick('Check Specific Customer')}
          >
            Check Specific Costumer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOptionClick('Add Customer')}
          >
            Add Costumer
          </Button>
        </div>
      </div>

      {/* Rest of the code remains the same */}
      {/* ... */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>{selectedOption}</DialogTitle>
        <DialogContent>{renderContent()}</DialogContent>
      </Dialog>
    </Router>
  );
};

export default App;
