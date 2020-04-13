window.onload = () => {

    const listFiles = () => {
        const headers = getHeaders();
        fetch('http://localhost:38081/file', {method: "GET", headers: headers}).then(res => res.json()).then(files => files.map(appendFileToList));
    };

    document.getElementById("file-upload").onchange = () => {
        const file = document.getElementById("file-upload").files[0];
        const formData = new FormData();
        const headers = getHeaders();
        formData.append("filetoupload", file);
        fetch('http://localhost:38081/file', {method: "POST", headers: headers, body: formData}).then(successUpload(file.name),errorUpload);
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

    const successUpload = (fileName) => {
        return (response) => {
            appendFileToList(fileName);
        };
    };

    const errorUpload = (response) => {
        console.log(response);
    };

    const appendFileToList = (fileName) => {
        const file = document.createElement('h4');
        file.innerHTML = fileName;
        document.getElementById("files-list").appendChild(file);
    };

    listFiles();

};
