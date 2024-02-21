/*
@Params:
@Returns: void
Takes login information and checks it for correctness, then calls updateUserName()
 */
function submitLogin() {
    let username = document.getElementById("username").value;
    window.localStorage.setItem("username", username);
    window.location.href = "../index.html";
    updateUserName();
}

/*
@Params: string username
@Returns: void
Replaces the login button in top-right corner with username
 */
function updateUserName() {
    let username = window.localStorage.getItem("username");
    let oldUsername = document.getElementsByClassName("displayUser")[0];
    if (username === null) {
        let login = document.createElement("a");
        login.href = "login.html";
        login.innerHTML = "Login";
        oldUsername.appendChild(login);
    } else {
        oldUsername.innerHTML = username;
    }
}
