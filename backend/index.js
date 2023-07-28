const express = require('express');
const app = express();
const userRoutes = require('./routes/customerRoutes.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/customers', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});