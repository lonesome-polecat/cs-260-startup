// menu.js
class Arizonut {
    /*
    @Params
      obj {
      string: name
      string: id
      string: description
      string: img
      float: price
      object : style (css format)
      }
    @Returns
      Arizonut object
     */
    constructor(obj) {
        this.name = obj.name;
        this.id = obj.id;
        this.description = obj.description;
        this.img = obj.img;
        this.price = obj.price;
        this.style = obj.style;
    }
}

let arizonuts = [];
let timeDrops = {}
const orderDialog = document.getElementById("order-dialog");

const wsPort = 9900
const url = `ws://${window.location.hostname}:${wsPort}`
console.log(url)
const socket = new WebSocket(url)
let availableDaysTimes;
socket.onopen = (event) => {
    console.log('WebSocket is now open')
}
socket.onmessage = async (message) => {
    console.log(message)
    availableDaysTimes = JSON.parse(message.data)
    availableDaysTimes = availableDaysTimes.days_and_times
    let rowElement = document.getElementsByClassName('time-selection-row')[0]
    rowElement.innerHTML = ''
    await loadTimePicker(rowElement)
    console.log(availableDaysTimes)
}
socket.onclose = (event) => {
    console.log('WebSocket is now closed')
}

async function Order(order_items) {
    let order = {};
    let username = window.localStorage.getItem('username');
    let userOrderCount = window.localStorage.getItem(`${username}-order-count`);
    order.id = username+"_"+userOrderCount;
    order.time = new Date(Date.now()).toDateString()
    let pickupDate = document.getElementsByClassName('date-selector')[0].innerText
    let pickupTime = document.getElementsByClassName('time-selector')[0].innerText
    order.pickup_time = pickupDate + " " + pickupTime
    availableDaysTimes.forEach(date => {
        if (date.date === pickupDate) {
            date.times.findIndex((time, i) => {
                if (time === pickupTime) {
                    date.times.splice(i, 1)
                }
            })
        }
    })
    let timesObj = {days_and_times: availableDaysTimes}
    timesObj = JSON.stringify(timesObj)
    socket.send(timesObj)
    const init_val = 0;
    order.total_cost = order_items.reduce((accum, curr) =>
        accum + curr.amount*curr.price, init_val
    )
    order.items = order_items;
    console.log(order);
    // window.localStorage.setItem(`${order.id}`, JSON.stringify(order))
    let req = {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(order)}
    let response = await fetch(`${window.location.origin}/api/order`, req)
    response = await response.json()
    if (response.status === 200) {
        alert('You successfully made an order!')
    } else {
        alert('Error: something went wrong while making the order')
    }
    console.log(response)
}

async function loadMenu() {
    // JQuery
    $("main.menu").hide();
    let response = await fetch(`${window.location.origin}/api/menu`)
    response = await response.json()
    response.menu_items.forEach(item => {
        arizonuts.push(new Arizonut(item))
    })
    createMenuOptions();
    createOrderDialog();
    // await updateOrderCount();

    $("main.menu").fadeIn();
    $("footer").fadeIn();
}

/*
  @Params:
    Arizonut[] : arizonuts
  @Returns:
    void
  Inserts menu items into DOM
 */
function createMenuOptions() {
    let menu = document.getElementById("menu-container");
    arizonuts.forEach(arizonut => {
        let option = document.createElement("div");
        option.id = `${arizonut.id}`;
        option.class = "menu-option";

        // Create title
        let title = document.createElement("h3");
        title.classList.add('menu-option-title');
        title.style = `color: ${arizonut.style.title_color}`;
        title.innerText = `${arizonut.name}`;
        // Create image
        let img = document.createElement("img");
        img.classList.add('menu-option-img');
        img.src = `${arizonut.img}`;
        img.alt = `${arizonut.name}`;
        // Create order count
        // if (window.localStorage.getItem(`${arizonut.id}-total-order-count`) === null) {
        //     window.localStorage.setItem(`${arizonut.id}-total-order-count`, 0);
        // }
        // let orderCount = document.createElement("p");
        // orderCount.classList.add('menu-option-count');
        // orderCount.innerHTML = `Order Count: <em id="${arizonut.id}-total-order-count"><em>`;
        // Append all to option container
        option.appendChild(title);
        option.appendChild(img);
        // option.appendChild(orderCount);
        // Append option to main menu container
        menu.appendChild(option);
    })
}

function createOrderDialog() {
    //<span onclick="document.getElementById('YourModalBox').style.display='none'" class="close-button topright">&times;</span>
    let header = document.createElement("p");
    header.id = "order-dialog-header";
    header.innerText = "Complete your order";
    let closeDialogButton = document.createElement('span');
    closeDialogButton.classList.add('close-button');
    closeDialogButton.classList.add('topright');
    closeDialogButton.innerHTML = '&times;';
    closeDialogButton.addEventListener("click", closeDialog);
    orderDialog.appendChild(closeDialogButton);
    orderDialog.appendChild(header);
    // Add each menu option
    arizonuts.forEach(arizonut => {
        let option = document.createElement("div");
        option.classList.add("order-dialog-option-container");
        // Create title
        let name = document.createElement("h3");
        name.classList.add("menu-option-title");
        name.style.color = `${arizonut.style.title_color}`;
        name.innerText = arizonut.name;
        // Create amount input
        let amount = document.createElement("input");
        amount.id = `${arizonut.id}-order-amount`;
        amount.classList.add("amount-input");
        amount.type = "number";
        amount.value = "0";
        amount.min = "0";
        amount.step = "1";
        amount.addEventListener("change", updateTotalCost);
        // Append elements to parents
        option.appendChild(name);
        option.appendChild(amount);
        orderDialog.appendChild(option);
    })
    let totalCost = document.createElement("p");
    totalCost.classList.add("total-cost");
    totalCost.innerHTML = "Total cost for deliciousness: <em id='total-cost'>$0</em>";

    let timeSelection = document.createElement('div')
    timeSelection.classList.add('time-selection-container')

    let timeSelectionBanner = document.createElement('p')
    timeSelectionBanner.innerText = 'Pickup Date and Time'
    timeSelectionBanner.classList.add('time-selection-banner')
    timeSelection.appendChild(timeSelectionBanner)
    let rowElement = document.createElement('div')
    rowElement.classList.add('time-selection-row')
    timeSelection.appendChild(rowElement)
    loadTimePicker(rowElement);

    let confirmBtn = document.createElement("button");
    confirmBtn.innerText = 'Confirm';
    confirmBtn.addEventListener("click", submitOrder);

    orderDialog.appendChild(timeSelection);
    orderDialog.appendChild(totalCost);
    orderDialog.appendChild(confirmBtn);
}

async function loadTimePicker(rowElement) {
    // TODO: This function is so messy. Cleanup
    // let response = await fetch(`${window.location.origin}/api/times`, {method: 'GET'})
    // response = await response.json()
    // let days = response.body

    let days = availableDaysTimes

    let dateSelector = document.createElement('button')
    dateSelector.classList.add('date-selector')
    dateSelector.addEventListener("click", showDateDropdown)

    let timeSelector = document.createElement('button')
    timeSelector.classList.add('time-selector')
    timeSelector.addEventListener("click", showTimeDropdown)

    rowElement.appendChild(dateSelector)
    rowElement.appendChild(timeSelector)

    let dateDropdown = document.createElement('div')
    dateDropdown.id = 'date-dropdown'
    dateDropdown.style.display = 'none'
    dateDropdown.addEventListener("focusout", hideDateDropdown)

    days.forEach(day => {
        let dateElement = document.createElement('button')
        dateElement.innerText = day.date
        dateElement.id = day.date.replace('/\s/g', '')
        dateElement.addEventListener("click", updateSelectedDate)
        let timeSelectDropdown = document.createElement('div')
        timeSelectDropdown.style.display = 'none'
        timeSelectDropdown.id = day.date.replace('/\s/g', '')
        timeSelectDropdown.classList.add('time-dropdown')
        timeSelectDropdown.addEventListener("focusout", hideTimeDropdown)

        day.times.forEach(time => {
            let timeOption = document.createElement('button')
            timeOption.classList.add('time-option')
            timeOption.innerText = time
            timeOption.addEventListener("click", updateSelectedTime)
            timeSelectDropdown.appendChild(timeOption)
        })
        dateDropdown.appendChild(dateElement)
        timeDrops[day.date] = timeSelectDropdown
        rowElement.appendChild(timeSelectDropdown)
    })
    dateSelector.innerText = days[0].date
    dateSelector.id = days[0].date.replace('/\s/g', '')
    timeSelector.innerText = days[0].times[0]

    rowElement.appendChild(dateDropdown)
}

function showDateDropdown() {
    document.getElementById('date-dropdown').style.display = 'flex'
}

function hideDateDropdown() {
    document.getElementById('date-dropdown').style.display = 'none'
}

function updateSelectedDate(self) {
    let dateSelector = document.getElementsByClassName('date-selector')[0]
    let timeSelector = document.getElementsByClassName('time-selector')[0]
    if (self.target.id == dateSelector.innerText) {
        hideDateDropdown()
    } else {
        dateSelector.innerText = self.target.innerText
        dateSelector.id = self.target.id
        timeSelector.innerText = timeDrops[dateSelector.id].childNodes[0].innerText
        timeSelector.id = self.target.id
        hideDateDropdown()
        // TODO: update time selection box
    }
}

function showTimeDropdown() {
    let id = document.getElementsByClassName('date-selector')[0].id
    console.log(`Date selector id = ${id}`)
    timeDrops[id].style.display = 'flex';
}

function hideTimeDropdown() {
    let id = document.getElementsByClassName('date-selector')[0].id
    timeDrops[id].style.display = 'none';
}

function updateSelectedTime(self) {
    console.log("updating selector...")
    console.log(self.target.innerText)
    let timeSelector = document.getElementsByClassName('time-selector')[0]
    timeSelector.innerText = self.target.innerText
    hideTimeDropdown()
}
function updateTotalCost() {
    let totalCost = 0;
    arizonuts.forEach(arizonut => {
        let amount = document.getElementById(`${arizonut.id}-order-amount`).value
        totalCost += amount * arizonut.price
    })
    document.getElementById("total-cost").innerText = `$${totalCost}`;
}

function makeOrder() {
    if (window.localStorage.getItem("username") === null) {
        alert("You need to log in before making an order")
        return;
    }
    orderDialog.showModal();
    orderDialog.style.display = "flex";
}

function closeDialog() {
    orderDialog.style.display = "none";
    orderDialog.close();
    // updateOrderCount();
}

// async function updateOrderCount() {
//     let response = await fetch(`${window.location.origin}/api/order/count`)
//     response = await response.json()
//     arizonuts.forEach(arizonut => {
//         let order_count = document.getElementById(`${arizonut.id}-total-order-count`)
//         order_count.innerText = response.count[arizonut.id]
//     })
// }
/*
@Params: void
@Returns: void
Processes and uploads order to database, updates order count
 */
function submitOrder() {
    // Update user order count to use for unique order id later
    if (window.localStorage.getItem(`${window.localStorage.getItem("username")}-order-count`) === null) {
        window.localStorage.setItem(`${window.localStorage.getItem("username")}-order-count`, "0");
    }
    let curr_count = window.localStorage.getItem(`${window.localStorage.getItem("username")}-order-count`)
    curr_count = parseInt(curr_count)+1;
    window.localStorage.setItem(`${window.localStorage.getItem("username")}-order-count`, curr_count);

    let sub_orders = [];
    arizonuts.forEach(arizonut => {
        // Save order to localStorage
        let order_item = {};
        let order_amount = document.getElementById(`${arizonut.id}-order-amount`);
        if (order_amount.value === '0') {
            return;
        }
        order_item.id = arizonut.id;
        order_item.price = arizonut.price;
        order_item.amount = parseInt(order_amount.value);
        sub_orders.push(order_item);
        // let curr_order_total = document.getElementById(`${arizonut.id}-total-order-count`);
        // let new_amount = parseInt(order_amount.value) + parseInt(curr_order_total.innerText);
        // curr_order_total.innerText = new_amount;
        // window.localStorage.setItem(`${arizonut.id}-total-order-count`, new_amount);
        order_amount.value = 0;
    })
    Order(sub_orders).finally(closeDialog());
}
