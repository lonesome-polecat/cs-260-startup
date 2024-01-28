const express = require('express');
const app = express();

// The service port defaults to 3000 or is read from the program arguments
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Text to display for the service name
const serviceName = process.argv.length > 3 ? process.argv[3] : 'website';

// Serve up the static content
app.use(express.static('src'));

// Provide the version of the application
app.get('/config', (_req, res) => {
  res.send({ version: '20221228.075705.1', name: serviceName });
});

// Return the homepage if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'src' });
});

app.get('/home', (_req, res) => {
  res.sendFile('home.html');
});

app.get('/menu', (_req, res) => {
  res.sendFile('menu.html');
});

app.get('/orders', (_req, res) => {
  res.sendFile('orders.html');
});

app.get('/contact', (_req, res) => {
  res.sendFile('contact.html');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
