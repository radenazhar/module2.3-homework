class Playlist {
    constructor(name) {
        this.songs = [];
    }

    addSong(title, artists, spotifyUrl) {
        const song = {
            title,
            artists: Array.isArray(artists) ? artists : [artists],
            spotifyUrl,
            playCount : 0,
        };
        this.songs.push(song);
        return song;
    }

    playSong(title){
        const songToPlay = this.songs.find((song)=> song.title === title);
        if(songToPlay) {
            songToPlay.playCount++;
        }
        return songToPlay;
    }

    getPlaylist(){
        return this.songs;
    }

    getMostPlayedSong() {
        return this.songs.sort((a, b) => b.playCount - a.playCount);
    }
}

export default Playlist;