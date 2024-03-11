const express = require('express');
const fs = require('fs')

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

apiRouter.get('/times', (req, res) => {
  try {
    let body = getAvailableDaysTimes()
    let response = {status: 200, body: body}
    res.send(response)
  } catch (e) {
    console.log(`Error trying to fetch available times: ${e}`)
    res.send({status: 500, message: `Error trying to fetch available times: ${e}`})
  }
})

apiRouter.get('/orders/:username', (req, res, next) => {
  let response = getOrders(req.params.username);
  res.send(response);
});

apiRouter.post('/order', (req, res) => {
  try {
    createOrder(req);
    res.send({status: 200, message: 'You made an order!'})
  } catch (e) {
    res.send({status: 400, message: e})
  }
})

// Needs auth checking
apiRouter.delete('/order/:id', (req, res) => {
  try {
    let success = deleteOrder(req.params.id);
    if (success) {
      res.send({status: 200, message:`Successfully deleted order ${req.params.id}`});
    } else {
      res.send({status: 400, message:`Unable to find order ${req.params.id}`});
    }
  } catch (e) {
    console.log(`ERROR: Unable to cancel order : ${e} `);
    res.send({status: 500, message:'Error: unable to cancel order'})
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
let availableDaysTimes = [];
// availableDaysTimes = [ {date: string, times: string[ format: 24h:mm ] } ]

function createAvailableTimes() {
  let jsonfile = JSON.parse(fs.readFileSync('./available_times.json'))
  let workDays = jsonfile.work_days
  workDays.forEach(day => {
    let dayObj = {}
    dayObj.date = day.date
    dayObj.times = createTimes(day.open_time, day.close_time)
    availableDaysTimes.push(dayObj)
  })
}

createAvailableTimes()

function createTimes(open_time, close_time) {
  let times = []
  let [hour, minutes] = open_time.split(":")
  hour = parseInt(hour)
  minutes = parseInt(minutes)
  let interval = 15

  let time = open_time
  while(time !== close_time) {
    times.push(time)
    minutes += interval
    if (minutes === 60) {
      minutes = 0
      hour += 1
    }
    let minString = minutes.toString().padEnd(2, "0")
    time = `${hour}:${minString}`
  }

  return times
}

function getAvailableDaysTimes() {
  return availableDaysTimes
}

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
// {
//   string: id
//   string: name_on_order
//   string: time
//   string total_cost
//   object items: {
//     string: id
//     float: price
//     int: amount
//   }
// }
/* Orders Page */
// method: GET
function getOrders(username) {
  let userOrders = orders.filter(order => order.name_on_order === username);
  let response = {}
  response.username = username;
  response.order_count = userOrders.length;
  response.orders = userOrders;
  return response;
}

// method: PUT
function updateOrder() {

}

// method: DELETE
function deleteOrder(order_id) {
  let deleteSuccessful = false;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id === order_id) {
      orders.splice(i, 1);
      deleteSuccessful = true;
      break;
    }
  }
  return deleteSuccessful;
}
