/*
@Params: void
@Returns: void
Pulls up order card
 */

const orderDialog = document.getElementById("order-dialog");

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
    let order = {};
    order.keylime = document.getElementById("keylime-order-amt").value
    order.rasp = document.getElementById("rasp-order-amt").value
    updateOrderCount(order);
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