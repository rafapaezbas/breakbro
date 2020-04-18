window.onload = () => {

    const featuredHeader = document.getElementById("item-featured");
    const randomHeader = document.getElementById("item-random");
    const searchHeader = document.getElementById("item-search");
    const navbarHeader = [featuredHeader,randomHeader,searchHeader];
    const searchKey = document.getElementById("search-text");

    navbarHeader.map((element) => {
        element.onclick = () => {
            navbarHeader.map(i => i.style.color = 'grey');
            element.style.color = '#ffffff';
            if(element == searchHeader){
                searchKey.addEventListener('keyup', (element) => updateSearchKey());
                searchKey.focus();
            }
        };
    });

    const updateSearchKey = () => {
        searchHeader.innerHTML = "Search: " + searchKey.value;
        searchStreamers(searchKey.value).then(updateStreamers);
    };

    const searchStreamers = (searchKey) => {
        const headers = { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' };
        const body = {searchKey: searchKey};
        return fetch('http://www.pinkumandrill.com:38081/streamer/search', {method: "POST", headers: headers, body: JSON.stringify(body)}).then(res=>res.json());
    };

    const updateStreamers = (streamers) => {
        console.log(streamers);
    };

};
