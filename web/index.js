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
        const featured = document.getElementById("featured");
        featured.innerHTML = "";
        streamers.map((streamer) => {
            featured.appendChild(createStreamer(streamer));
        });
    };

    const createStreamer = (streamer) =>{
        const streamerElement = createElement("div","streamer","");
        streamerElement.append(createStreamerName(streamer));
        streamerElement.append(createStreamerDescription(streamer));
        streamerElement.append(createStreamerControls(streamer));
        return streamerElement;
    };

    const createStreamerName = (streamer) => {
        return createElement("h3","streamer-name",streamer.name);
    };

    const createStreamerDescription = (streamer) => {
        return createElement("div","streamer-description",streamer.info);
    };

    const createStreamerControls = (streamer) => {
        const streamerControls = createElement("div","streamer-controls", "");
        const listenButton = createElement("p","listen","Listen to this podcast");
        listenButton.addEventListener('click',(e) => updatePlayer(streamer));
        streamerControls.append(listenButton);
        return streamerControls;
    };

    const updatePlayer = (streamer) => {
        const player = document.getElementsById("player");
        player.setAttribute("src", "http://www.pinkumandrill.com:38080/" + streamer.name);
        player.play();
    };

    const createElement = (type,htmlClass,content) => {
        const node = document.createElement(type);
        node.classList.add(htmlClass);
        node.innerHTML = content;
        return node;
    };
};
