window.onload = () => {

    setStreamerInfo(document.cookie);

    document.getElementById("send-file-button").onclick = () => {
        const file = document.getElementById("file1").files[0];
        const formData = new FormData();
        const headers = getHeaders();
        formData.append("filetoupload", file);
        fetch('http://localhost:38081/file', {method: "POST", headers: headers, body: formData});
    };

    const getHeaders = () => {
        return {...getAuthorizationHeader()};
    };

    const getAuthorizationHeader = () => {
        if(document.cookie != undefined){
            return {authorization : "Bearer " + document.cookie};
        }else{
            return undefined;
        }
    };

    const setStreamerInfo = () => {
        if(document.cookie == undefined){
            return;
        }else{
            fetch('http://localhost:38081/streamer/getInfo',
                  {method: "POST", headers: headers, body: JSON.stringify(body)}).then(res=>res.json()).then(successLogin,errorLogin);
        }
    };

};
