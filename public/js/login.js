/*
@Params:
@Returns: void
Takes login information and checks it for correctness, then calls updateUserName()
 */
function submitLogin() {
    // let form = document.getElementsByTagName("form");
    // document.getElementById("username").addEventListener("onclick", (event) => {
    //     event.preventDefault();
    // })
    let username = document.getElementById("username").value;
    console.log(`username = ${username}`)
    updateUserName(username);
}

/*
@Params: string username
@Returns: void
Replaces the login button in top-right corner with username
 */
function updateUserName(username) {
    console.log(username);
    let oldUsername = document.getElementsByClassName("displayUser")[0];
    oldUsername.innerHTML = username;
    // let newUsername = document.createElement("p", {class: "displayUser"});
    // newUsername.innerText = username;
    // oldUsername.replaceWith(newUsername);
}
