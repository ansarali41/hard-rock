const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
// add event listener for click
searchBtn.addEventListener('click', () => {
    document.getElementById('fancy-result-area').style.display = "none";
    hardRockLyricsHandler();

})
// add event listener for enter btn
searchBox.addEventListener('keypress', function (e) {
    if (13 == e.keyCode) {
        hardRockLyricsHandler();
        document.getElementById('fancy-result-area').style.display = "none";
        event.preventDefault();//for stop auto reloading
    }
});
// main function is here
function hardRockLyricsHandler() {
    const songNameSearch = document.getElementById('search-box').value;
    // empty search box handle here
    if (songNameSearch == "" || songNameSearch == ' ') {
        alert("please input song name 😊")
    } else {
        // wait 3s for get data from api
        setTimeout(() => {
            document.getElementById('fancy-result-area').style.display = "block";
        }, 3000);
        // get Song title and artist name from api
        fetch(`https://api.lyrics.ovh/suggest/${songNameSearch}`)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < 10; i++) {
                    const element = data.data[i];
                    // song title set
                    const songTitle = element.title;
                    // artist name set
                    const artistName = element.artist.name;

                    // get lyrics from api
                    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
                        .then(res => res.json())
                        .then(lyricsData => {
                            const songLyrics = lyricsData.lyrics;
                            // set song title and artist name in the dom section
                            document.getElementById(`song-title-${i}`).innerText = songTitle;
                            document.getElementById(`artist-name-${i}`).innerText = artistName;

                            // add eventListener click on get lyrics
                            document.getElementById(`get-lyrics-${i}`).addEventListener('click', () => {
                                document.getElementById('lyrics-title-display').innerText = songTitle;
                                // if song lyrics not found
                                if (songLyrics == undefined) {
                                    document.getElementById('lyrics-display').innerText = "Lyrics not available for this song, Try for another song please 😥";
                                } else {
                                    document.getElementById('lyrics-display').innerText = songLyrics;
                                }
                                // document.getElementById('fancy-result-area').style.display = "none";

                                document.getElementById('lyrics-display-area').style.display = "block";
                            })
                        })

                }
            })
    }
}