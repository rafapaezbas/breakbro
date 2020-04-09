window.onload = () => {
    document.getElementById("send-streamer-button").onclick = () => {
        const name = document.getElementById("name");
        const info = document.getElementById("info");
        const password = document.getElementById("password");
        var body = {};
        body.name = name;
        body.info = info;
        body.password = password;
        fetch('http://www.pinkumandrill.com:38081/streamer', {method: "POST", body: body});
    };
};
