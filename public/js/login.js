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
    let newUser = validateInput()
    if (newUser) {
        console.log(newUser)
        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)}
        let response = await fetch(`${window.location.origin}/auth/new`, request)
        response = await response.json()
        console.log(response)
        if (response.status === 409) {
            alert("An account with this email already exists")
        } else if (response.status === 200) {
            alert(response.message)
            window.location.reload()
        } else {
            alert("An error occurred")
        }
    } else {
        alert("Invalid input")
    }
}

function validateInput() {
    console.log("validating...")
    let firstname = document.getElementById("new-user-first-name")
    // Make sure lastname is valid string
    if (firstname.value === "") {
        firstname.style.borderColor = "red";
        return false;
    }
    let lastname = document.getElementById("new-user-last-name")
    // Make sure lastname is valid string
    let email = document.getElementById("new-user-email")
    if (!email.value.includes('@') || !email.value.includes('.')) {
        email.style.borderColor = "red";
        return false;
    }
    let password = document.getElementById("new-user-password")
    let confirmPassword = document.getElementById("new-user-confirm-password")
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match")
        return false;
    }
    const newUser = {
        first_name: firstname.value,
        last_name: lastname.value,
        email: email.value,
        password: password.value
    }
    return newUser
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
