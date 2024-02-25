/*
@Params: void
@Returns: void
Pulls up order card
 */

const orderDialog = document.getElementById("order-dialog");

function makeOrder() {
    orderDialog.showModal();
}

function closeDialog() {
    orderDialog.close();
}

/*
@Params: void
@Returns: void
Processes and uploads order to database, updates order count
 */
function submitOrder() {

    updateOrderCount();
}

/*
@Params: void
@Returns: void
Updates the order count for each donut
 */
function updateOrderCount() {

}