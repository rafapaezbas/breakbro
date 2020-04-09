window.onload = () => {
    document.getElementById("send-file-button").onclick = () => {
        let file = document.getElementById("file1").files[0];
        let formData = new FormData();
        formData.append("filetoupload", file);
        fetch('http://www.pinkumandrill.com:38081/file', {method: "POST", body: formData});
    };
};
