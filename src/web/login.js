window.onload = () => {

    document.getElementById("login-button").onclick = () => {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        var body = {name: name, password: password};
        const headers = { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' };
        fetch('http://localhost:38081/login', {method: "POST", headers: headers, body: JSON.stringify(body)}).then(res=>res.json()).then(successLogin,errorLogin);
    };

    const successLogin = (response) => {
        storeTokenAsCookie(response.token);
        window.location = "file:///home/breakbro/web/index.html";
    };

    const errorLogin = (response) => {
        console.log("error when login");
    };

    const storeTokenAsCookie = (token) => {
        document.cookie = token;
    };
};
