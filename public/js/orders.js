/*
@Params:
@Returns:
Checks if user is logged in. If so, loads orders, else displays
 */
async function checkLogin() {
    let username = window.localStorage.getItem("username");
    if (username === null) {
        let container = document.getElementById("orders-table-container")
        let message = document.createElement("p");
        message.innerText = 'You must first login to see order history';
        container.appendChild(document.createElement("br"));
        container.appendChild(message);
    } else {
        // includeHTML();
        await loadOrders();
    }
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("include-html");
                    // includeHTML(); // This was running recursively, problem
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

async function loadOrders() {
    const username = window.localStorage.getItem("username");
    let req = {method: 'GET', headers: {"Content-Type": "application/json"}};
    try {
        let response = await fetch(`${window.location.origin}/api/orders/${username}`, req)
        response = await response.json();
        console.log(response);
        if (response.order_count === 0) {
            loadNoOrders()
        } else {
            let table = createTable();
            response.orders.forEach(order => {
                loadOrder(table, order);
            })
        }
    } catch (e) {
        console.log(`There was an error loading orders. ${e}`);
    }

    //
    // while(true) {
    //     i++;
    //     const username = window.localStorage.getItem("username");
    //     let order = window.localStorage.getItem(`${username}_${i}`);
    //     if (order === null) {
    //         if (i === 1) {
    //             loadNoOrders();
    //         }
    //         break;
    //     } else {
    //         if (i === 1) {
    //             table = document.createElement("table");
    //             table.classList.add("orders");
    //             let tr = document.createElement("tr");
    //             tr.classList.add("headers");
    //             tr.innerHTML = "<th>Order ID</th><th>Time Ordered</th><th>Name on Order</th><th>Details</th><th>Total Cost</th><th>&nbsp;</th>"
    //             table.appendChild(tr);
    //             let container = document.getElementById("orders-table-container");
    //             container.appendChild(document.createElement("br"))
    //             let someText = document.createElement("p")
    //             someText.innerText = "Check out your orders...";
    //             container.appendChild(someText)
    //             container.appendChild(document.createElement("br"))
    //             container.appendChild(table);
    //         }
    //         order = JSON.parse(order)
    //         loadOrder(table, order)
    //     }
    // }
}

function createTable() {
    let table = document.createElement("table");
    table.classList.add("orders");
    let tr = document.createElement("tr");
    tr.classList.add("headers");
    tr.innerHTML = "<th>Order ID</th><th>Time Ordered</th><th>Name on Order</th><th>Pickup Time</th><th>Details</th><th>Total Cost</th><th>&nbsp;</th>"
    table.appendChild(tr);
    let container = document.getElementById("orders-table-container");
    container.appendChild(document.createElement("br"))
    let someText = document.createElement("p")
    someText.innerText = "Check out your orders...";
    container.appendChild(someText)
    container.appendChild(document.createElement("br"))
    container.appendChild(table);

    return table;
}

function loadOrder(table, order) {
    let tr = document.createElement("tr");
    let details = "";
    order.items.forEach(item => {
        details += item.amount;
        details += " " + item.id + " ";
    })
    let orderId = document.createElement("td")
    orderId.innerText = order.id;
    let orderName = document.createElement("td")
    orderName.innerText = order.name_on_order;
    let orderTime = document.createElement("td")
    orderTime.innerText = order.time;
    let orderPickupTime = document.createElement("td")
    orderPickupTime.innerText = order.pickup_time;
    let orderDetails = document.createElement("td")
    orderDetails.innerText = details;
    let orderCost = document.createElement("td")
    orderCost.innerText = "$" + order.total_cost;
    let cancelOrder = document.createElement("td")
    cancelOrder.innerHTML = `<button class='order' onclick=cancelOrder('${order.id}')>Cancel Order</button>`;

    tr.appendChild(orderId);
    tr.appendChild(orderTime);
    tr.appendChild(orderName);
    tr.appendChild(orderPickupTime);
    tr.appendChild(orderDetails);
    tr.appendChild(orderCost);
    tr.appendChild(cancelOrder);
    table.appendChild(tr);
}

function loadNoOrders() {
    let container = document.getElementById("orders-table-container");
    container.innerHTML = "<br><p>Looks like you haven't made any orders yet...</p>"
}

async function cancelOrder(orderId) {
    let req = {method: 'DELETE', headers: {"Content-Type": "application/json"}};
    try {
        let response = await fetch(`${window.location.origin}/api/order/${orderId}`, req)
        response = await response.json();
        console.log(response);
        window.location.reload();
    } catch (e) {
        console.log(`There was an error loading orders. ${e}`);
    }

    // window.localStorage.removeItem(orderId);
    // // decrement user order count
    // let curr_count = window.localStorage.getItem(`${window.localStorage.getItem("username")}-order-count`)
    // curr_count = parseInt(curr_count)-1;
    // window.localStorage.setItem(`${window.localStorage.getItem("username")}-order-count`, curr_count);
    // window.location.reload();
}