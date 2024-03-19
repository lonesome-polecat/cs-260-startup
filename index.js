const express = require('express');
const fs = require('fs')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const { dbClient } = require('./db.js')

const db = new dbClient();
const authCookieName = 'token';

/*** SERVER ROUTING ***/
const app = express();

// The service port defaults to 3000 or is read from the program arguments
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Text to display for the service name
const serviceName = process.argv.length > 3 ? process.argv[3] : 'website';

// Serve up the static content
app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser());

const logger = (req, res, next) => {
  console.log(`RECEIVED ${req.method} REQUEST`);
  console.log(`DateTime: ${new Date()}`)
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

let secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (res, req, next) => {
  let token = req.cookie[authCookieName]
  const user = await db.getUserByToken(token)
  if (user) {
    next()
  } else {
    res.send({status: 401, message: 'Unauthorized'})
  }
})

// Needs auth checking
secureApiRouter.get('/orders/:username', (req, res, next) => {
  let response = getOrders(req.params.username);
  res.send(response);
});

apiRouter.get('/order/count', (req, res, next) => {
  let counts = getOrderCount();
  res.send({status: 200, count: counts});
});

// Needs auth checking
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

apiRouter.get('/menu', (req, res) => {
  try {
    let menu = getMenu()
    res.send(menu)
  } catch (e) {
    console.log(`ERROR: Unable to load menu : ${e}`)
  }
})

// Provide the version of the application
app.get('/config', (_req, res) => {
  res.send({ version: '20221228.075705.1', name: serviceName });
});

app.post('/auth/new', async (req, res) => {
  try {
    console.log("REQUEST BODY :")
    console.log(req.body)
    if (await db.getUser(req.body.email)) {
      res.send({status: 409, message: 'User already exists'})
    } else {
      const user = await db.createUser(req.body)

      setAuthCookie(res, user.token);

      res.send({status: 200, message: 'Created new user'})
    }
  } catch (e) {
    console.log(e)
    res.send({status: 500, message: 'Unable to create new user'})
  }
})
/*
body: {
  string: firstname,
  string: lastname,
  string: username,
  string: password,
  string: phone-number
  string: token
}
 */

app.post('/auth/login', async (req, res) => {
  const user = await db.getUser(req.body.username)
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token)
      res.send({status: 200, message: 'successfully logged in'})
      return
    }
  }
  res.send({status: 401, message: 'Unauthorized'})
})

app.get('/auth/me', (req, res) => {
  // Use cookie to return info about user
})

// Return the homepage if the path is unknown
app.use((_req, res) => {
  res.sendFile('./public/index.html', { root: './' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/*** BACKEND FUNCTIONS & DATA ***/
let orders = [];
let orderCount = {};
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

function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
    //expires: 1800
  })
}

// method: DELETE
function userLogout() {

}

/* Menu Page */
// method: GET
function getMenu() {
  console.log('Getting menu...')
  let response = JSON.parse(fs.readFileSync('./menu.json'))
  response.menu_items.forEach(item => {
    if (orderCount[item.id] === undefined) {
      console.log('order id is undefined')
      orderCount[item.id] = 0
    }
  })
  return response;
}

// method:POST
function createOrder(req) {
  console.log("Creating new order from request")
  console.log(req.body)
  orders.push(req.body)
  req.body.items.forEach(item => {
    console.log(item.amount)
    orderCount[item.id] += item.amount
  })
  console.log(`Number of orders: ${orders.length}`)
  return true;
}
// {
//   string: id
//   string: name_on_order
//   string: time
//   string: pickup_time
//   string total_cost
//   object items: [{
//     string: id
//     float: price
//     int: amount
//   }]
// }

// method: GET
function getOrderCount() {
  return orderCount;
}

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
