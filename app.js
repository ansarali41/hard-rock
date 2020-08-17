document.getElementById('search-btn').addEventListener('click', () => {
    const songNameSearch = document.getElementById('search-box').value;
    document.getElementById('fancy-result-area').style.display = "block";
    // console.log(songName);
    fetch(`https://api.lyrics.ovh/suggest/${songNameSearch}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            for (let i = 0; i < 10; i++) {
                let element = data.data[i];
                // song title set
                let songTitle = element.title;
                // artist name set
                let artistName = element.artist.name;

                // get lyrics
                fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
                    .then(res => res.json())
                    .then(lyricsData => {
                        // console.log(lyricsData.lyrics);
                        const songLyrics = lyricsData.lyrics;
                        // console.log(songLyrics == undefined ,i);
                        
                        // if(songLyrics == undefined){

                        // }
                        // else{
                        //     console.log('lyrics founded');
                        // }

                        document.getElementById(`song-title-${i}`).innerText = songTitle;
                        document.getElementById(`artist-name-${i}`).innerText = artistName;

                        document.getElementById(`get-lyrics-${i}`).addEventListener('click', () => {
                            document.getElementById('lyrics-title-display').innerText = songTitle;
                            document.getElementById('lyrics-display').innerText = songLyrics;
                            
                            // document.getElementById('fancy-result-area').style.display = "none";
                            document.getElementById('lyrics-display-area').style.display = "block";
                        })
                    })
            }
        })
});