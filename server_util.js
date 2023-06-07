const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Healthcheck route
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

// Ping route
app.get('/ping', (req, res) => {
  const ipAddresses = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('WakeUP <--', ipAddresses);
  res.sendStatus(200);
});

// Serve the React application for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
