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
                    elmnt.removeAttribute("w3-include-html");
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