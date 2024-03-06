const express = require('express');

/*** SERVER ROUTING ***/
const app = express();

// The service port defaults to 3000 or is read from the program arguments
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Text to display for the service name
const serviceName = process.argv.length > 3 ? process.argv[3] : 'website';

// Serve up the static content
app.use(express.static('public'));

app.use(express.json());

const logger = (req, res, next) => {
  console.log(`RECEIVED ${req.method} REQUEST`);
  console.log(req.body);
  next();
}

app.use(logger);

let apiRouter = express.Router();

app.use('/api', apiRouter);
// app.route('/api'); // This is like an alias, saying "Use this route too"

apiRouter.get('/orders/:username', (req, res, next) => {
  console.log(req.originalUrl)
  console.log(req.ip)
  res.send({username: req.params.username});
});

apiRouter.post('/order', (req, res) => {
  try {
    createOrder(req);
    res.send({status: 200, message: 'You made an order!'})
  } catch (e) {
    res.send({status: 400, message: e})
  }
})

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

/*** BACKEND FUNCTIONS & DATA ***/
let orders = [];

/* Login page */
// method: POST
function createUser() {
}

// method: POST?
function login() {

}

// method: DELETE
function logout() {

}

/* Menu Page */
// method: GET
function getMenu() {

}

// method:POST
function createOrder(req) {
  console.log("Creating new order from request")
  orders.push(req.body)
  console.log(`Number of orders: ${orders.length}`)
  return true;
}

/* Orders Page */
// method: GET
function getOrders() {

}

// method: PUT
function updateOrder() {

}

// method: DELETE
function deleteOrder() {

}
