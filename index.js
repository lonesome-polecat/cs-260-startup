const express = require('express');
const app = express();

// The service port defaults to 3000 or is read from the program arguments
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Text to display for the service name
const serviceName = process.argv.length > 3 ? process.argv[3] : 'website';

// Serve up the static content
app.use(express.static('public'));

app.get('/api/orders/:username', (req, res, next) => {
  console.log(req.originalUrl)
  console.log(req.ip)
  res.send({username: req.params.username});
});

// Provide the version of the application
app.get('/config', (_req, res) => {
  res.send({ version: '20221228.075705.1', name: serviceName });
});

// Return the homepage if the path is unknown
app.use((_req, res) => {
  res.sendFile('./public/index.html', { root: './' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

