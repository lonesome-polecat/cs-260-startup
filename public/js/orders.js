/*
@Params:
@Returns:
Checks if user is logged in. If so, loads orders, else displays
 */
function checkLogin() {
    let username = window.localStorage.getItem("username");
    if (username === null) {
        let body = document.getElementsByTagName("body")[0];
        let data = document.createElement("div");
        data.innerHTML = '<p>You must first login to see order history</p>';
        body.appendChild(data);
    } else {
        includeHTML();
        loadOrders();
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

function loadOrders() {
    let i = 0;
    let table;
    while(true) {
        i++;
        const username = window.localStorage.getItem("username");
        let order = window.localStorage.getItem(`${username}_${i}`);
        if (order === null) {
            break;
        } else {
            if (i === 1) {
                table = document.createElement("table");
                table.classList.add("orders");
                let tr = document.createElement("tr");
                tr.classList.add("headers");
                tr.innerHTML = "<th>Order ID</th><th>Time Ordered</th><th>Name on Order</th><th>Details</th><th>Total Cost</th><th>&nbsp;</th>"
                table.appendChild(tr);
                let container = document.getElementById("orders-table-container");
                container.appendChild(table);
            }
            order = JSON.parse(order)
            loadOrder(table, order)
        }
    }
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
    let orderDetails = document.createElement("td")
    orderDetails.innerText = details;
    let orderCost = document.createElement("td")
    orderCost.innerText = "$" + order.total_cost;
    let cancelOrder = document.createElement("td")
    cancelOrder.innerHTML = "<button class='order' onclick=cancelOrder>Cancel Order</button>";

    tr.appendChild(orderId);
    tr.appendChild(orderTime);
    tr.appendChild(orderName);
    tr.appendChild(orderDetails);
    tr.appendChild(orderCost);
    tr.appendChild(cancelOrder);
    table.appendChild(tr);
}