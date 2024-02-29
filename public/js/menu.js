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
const orderDialog = document.getElementById("order-dialog");

function Order(order_items) {
    let order = {};
    // TODO: complete contructor, combine orders into one JSON order
    let username = window.localStorage.getItem('username');
    let userOrderCount = window.localStorage.getItem(`${username}-order-count`);
    order.id = username+"_"+userOrderCount;
    order.name_on_order = username;
    order.time = new Date(Date.now()).toString()
    const init_val = 0;
    order.total_cost = order_items.reduce((accum, curr) =>
        accum + parseInt(curr.amount)*curr.price, init_val
    )
    order.items = order_items;
    console.log(order);
    window.localStorage.setItem(`${order.id}`, JSON.stringify(order))
}

function loadMenu() {
    let keylime = {
        name: "Keylime Pie",
        id: "keylime",
        description: "Delicious limey",
        img: "../img/keylime.jpg",
        price: 6.00,
        style: {title_color: "#93c47d"}
    }
    let rasp = {
        name: "Raspberry Cheesecake",
        id: "raspcheese",
        description: "A beautiful creation that tastes as good as it looks",
        img: "../img/rasp_arizonut.jpg",
        price: 6.00,
        style: {title_color: "#a64d79"}
    }
    arizonuts.push(new Arizonut(keylime));
    arizonuts.push(new Arizonut(rasp));
    createMenuOptions(arizonuts);
    createOrderDialog(arizonuts);
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
        let orderCount = document.createElement("p");
        orderCount.classList.add('menu-option-count');
        orderCount.innerHTML = `Order Count: <em id="${arizonut.id}-total-order-count">0<em>`;
        // Append all to option container
        option.appendChild(title);
        option.appendChild(img);
        option.appendChild(orderCount);
        // Append option to main menu container
        menu.appendChild(option);
    })
}

function createOrderDialog() {
    let header = document.createElement("p");
    header.innerText = "Complete your order";
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
        // Append elements to parents
        option.appendChild(name);
        option.appendChild(amount);
        orderDialog.appendChild(option);
    })
    let totalCost = document.createElement("p");
    totalCost.innerHTML = "Total cost for deliciousness: <em id='total-cost'></em>";
    let confirmBtn = document.createElement("button");
    confirmBtn.innerText = 'Confirm';
    confirmBtn.addEventListener("click", submitOrder);
    orderDialog.appendChild(totalCost);
    orderDialog.appendChild(confirmBtn);
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
}

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
        if (order_amount.value === 0) {
            return;
        }
        order_item.id = arizonut.id;
        order_item.price = arizonut.price;
        order_item.amount = order_amount.value;
        sub_orders.push(order_item);
        // TODO: Complete order and upload to localStorage to load in database (they will need to be logged in to make an order)
        // TODO: update total cost in order-dialog when order-amount changes (onchange listener event)
        let curr_order_total = document.getElementById(`${arizonut.id}-total-order-count`);
        let new_amount = parseInt(order_amount.value) + parseInt(curr_order_total.innerText);
        curr_order_total.innerText = new_amount;
        order_amount.value = 0;
    })
    let newOrder = new Order(sub_orders);

    closeDialog();
}
