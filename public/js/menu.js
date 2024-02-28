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
        orderCount.innerHTML = `Order Count: <em id="${arizonut.id}-order-count">${window.localStorage.getItem(arizonut.id)}</em>`;
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
        amount.id = `${arizonut.id}`;
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
    arizonuts.forEach(arizonut => {
        let order_amount = document.getElementById(`${arizonut.id}`).value;
        let curr_amount = window.localStorage.getItem(`${arizonut.id}`);
        let new_amount = parseInt(order_amount) + parseInt(curr_amount);
        window.localStorage.setItem(`${arizonut.id}`, toString(new_amount));
        document.getElementById(`${arizonut.id}-order-count`).value = new_amount;
    })
    // TODO: Fix update order count
    //updateOrderCount(order);
    closeDialog();
}

/*
@Params: void
@Returns: void
Updates the order count for each donut
 */
function updateOrderCount(order) {
    let curr_counts = {};
    curr_counts.keylime = window.localStorage.getItem("keylime-count");
    if (curr_counts.keylime === null) {
        window.localStorage.setItem("keylime-count", "0");
        curr_counts.keylime = 0;
    }
    curr_counts.rasp = window.localStorage.getItem("rasp-count");
    if (curr_counts.rasp === null) {
        window.localStorage.setItem("rasp-count", "0");
        curr_counts.rasp = 0;
    }
    curr_counts.keylime += order.keylime;
    curr_counts.rasp += order.rasp;

    document.getElementById("keylime-count").innerHTML = curr_counts.keylime;
    document.getElementById("rasp-count").innerHTML = curr_counts.rasp;
    window.localStorage.setItem("keylime-count", curr_counts.keylime);
    window.localStorage.setItem("rasp-count", curr_counts.rasp);

}