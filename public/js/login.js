/*
@Params:
@Returns:
Change login form to create user form
 */
function displayCreateUser() {
    let loginContainer = document.getElementById("login-container")
    let createUserContainer = document.getElementById("create-user-container")
    loginContainer.style.display = "none";
    createUserContainer.style.display = "flex";
}
/*
@Params:
@Returns:
Change login form to create user form
 */
function displayLogin() {
    let loginContainer = document.getElementById("login-container")
    let createUserContainer = document.getElementById("create-user-container")
    createUserContainer.style.display = "none";
    loginContainer.style.display = "flex";
}
/*
@Params:
@Returns:
Verifies user input then creates new user in database
 */
async function createUser() {
    document.getElementById()

}
/*
@Params:
@Returns: void
Takes login information and checks it for correctness, then calls updateUserName()
 */
async function submitLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // window.localStorage.setItem("username", username);
    let req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password,
        })
    }
    console.log(req)
    let response = await fetch(`${window.location.origin}/auth/login`, req)
    response = await response.json()
    let name = response.first_name;
    console.log(response)
    if (response.status === 200) {
        window.localStorage.setItem("username", name);
        window.location.href = "../index.html";
        updateUserName();
    } else {
        alert('Invalid credentials')
    }
}

/*
@Params:
@Returns:
Sets the username in localStorage to null or effectively "logs out" the user
 */
function logout() {
    window.localStorage.removeItem("username");
    // We leave everything else in localStorage for now so we don't lose our order information
    updateUserName();
    window.location.reload();
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
        let nametag = document.createElement("p");
        nametag.className = "displayUser";
        nametag.innerText = username;
        oldUsername.id = "user-dropdown";
        oldUsername.appendChild(nametag);
        // oldUsername.innerText = `<p class='displayUser'>${username}</p>`;
        let dropdown = document.createElement("div");
        dropdown.id = "user-dropdown-content";
        dropdown.innerHTML = "<button id='logout' onclick='logout()'>Log out</button>";
        oldUsername.appendChild(dropdown);
    }
}
