window.onload = () => {

    document.getElementById("signup-button").onclick = () => {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        var body = {name: name, password: password};
        const headers = { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' };
        fetch('http://www.pinkumandrill.com:38081/streamer', {method: "POST", headers: headers, body: JSON.stringify(body)}).then(res=>res.json()).then((body) => login(name,password), errorSignup);
    };

    const errorSignup = (response) => {
        console.log("error when signup");
    };

}
