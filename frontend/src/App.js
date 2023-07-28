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
      case 'View Client List':
        return <ClientList />;
      case 'Check Specific Client':
        return <ClientDetails />; // Replace with appropriate component or data fetching logic
      case 'Add Client':
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
            onClick={() => handleOptionClick('View Client List')}
          >
            View Client List
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOptionClick('Check Specific Client')}
          >
            Check Specific Client
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOptionClick('Add Client')}
          >
            Add Client
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
