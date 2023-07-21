const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
import Playlist from './models/_playlistModel';


app.use(bodyParser.json());

//Membuat object baru
const playlist = new Playlist();
app.post('/add-song', (req, res) => {
    const { title, artists, spotifyUrl } = req.body;
  
    // Validasi memastikan apakah semua atribut sudah diisi
    if (!title || !artists || !spotifyUrl) {
      return res.status(400).json({ error: 'Please provide title, artists, and Spotify URL' });
    }
  
    const song = playlist.addSong(title, artists, spotifyUrl);
    return res.status(201).json({ message: 'Song added to the playlist successfully', song });
  });
  
  // Route untuk play musik dari playlist
  app.get('/play/:title', (req, res) => {
    const titleToPlay = req.params.title;
    const songToPlay = playlist.playSong(titleToPlay);
  
    if (!songToPlay) {
      return res.status(404).json({ error: 'Song not found in the playlist' });
    }
  
    return res.json({ message: 'Now playing:', song: songToPlay });
  });
  
  // Route untuk mendapatkan semua playlist
  app.get('/playlist', (req, res) => {
    return res.json({ playlist: playlist.getPlaylist() });
  });
  
  // Route untuk mendapatkan list lagu dari mostplayedsong
  app.get('/most-played', (req, res) => {
    return res.json({ mostPlayed: playlist.getMostPlayed() });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });