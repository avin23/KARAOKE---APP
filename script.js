// YouTube API setup
let player;
let currentSongIndex = 0;
let songs = [];
let filteredSongs = [];
let isPlaying = false;
let updateTimer;

// DOM Elements
const playerElement = document.getElementById('player');
const songsList = document.getElementById('songsList');
const searchInput = document.getElementById('searchInput');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const progressBar = document.querySelector('.progress-bar');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prevSong');
const nextBtn = document.getElementById('nextSong');
const scoreOverlay = document.getElementById('scoreOverlay');
const closeScoreBtn = document.getElementById('closeScore');

// Sample song data (we'll replace this with actual YouTube data)
const sampleSongs = [
    { id: 'Gq5i9FO9iYg', title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 'fJ9rUzIMcZQ', title: 'Don\'t Stop Me Now', artist: 'Queen' },
    { id: 'HgzGwKwLmgM', title: 'Somebody To Love', artist: 'Queen' },
    { id: 'rY0WxgSXdEE', title: 'We Will Rock You', artist: 'Queen' },
    { id: 'tgbNymZ7vqY', title: 'Another One Bites The Dust', artist: 'Queen' }
];

// Initialize the YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'autoplay': 0,
            'controls': 1,
            'disablekb': 0,
            'fs': 1,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log('YouTube Player is ready');
    // Load songs after player is ready
    loadSongs();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start with first song
    if (songs.length > 0) {
        loadSong(0);
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        // Song ended, show score and play next song after a delay
        showScore();
        setTimeout(playNextSong, 3000);
    } else if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        updatePlayPauseButton();
        startProgressBar();
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        updatePlayPauseButton();
        clearInterval(updateTimer);
    }
}

// Load songs from the provided YouTube links
function loadSongs() {
    // For now, we'll use the sample songs
    // In a real app, you would fetch song data from a server or parse the YouTube links
    songs = [...sampleSongs];
    filteredSongs = [...songs];
    renderSongList();
}

// Render the song list
function renderSongList() {
    songsList.innerHTML = '';
    
    if (filteredSongs.length === 0) {
        songsList.innerHTML = '<div class="no-songs">No songs found. Try a different search term.</div>';
        return;
    }
    
    filteredSongs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = `song-item ${currentSongIndex === index ? 'playing' : ''}`;
        songElement.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">3:45</div>
        `;
        
        songElement.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });
        
        songsList.appendChild(songElement);
    });
}

// Load a song into the player
function loadSong(index) {
    if (index < 0 || index >= filteredSongs.length) return;
    
    currentSongIndex = index;
    const song = filteredSongs[index];
    
    // Update UI
    nowPlayingTitle.textContent = `${song.title} - ${song.artist}`;
    
    // Update active song in the list
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('playing');
            // Scroll to the active song
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            item.classList.remove('playing');
        }
    });
    
    // Load the video
    if (player) {
        player.loadVideoById(song.id);
    }
}

// Play the current song
function playSong() {
    if (player) {
        player.playVideo();
        isPlaying = true;
        updatePlayPauseButton();
    }
}

// Pause the current song
function pauseSong() {
    if (player) {
        player.pauseVideo();
        isPlaying = false;
        updatePlayPauseButton();
    }
}

// Toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Play next song
function playNextSong() {
    const nextIndex = (currentSongIndex + 1) % filteredSongs.length;
    loadSong(nextIndex);
    playSong();
}

// Play previous song
function playPrevSong() {
    const prevIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
    loadSong(prevIndex);
    playSong();
}

// Update play/pause button
function updatePlayPauseButton() {
    const icon = playPauseBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Update progress bar
function startProgressBar() {
    clearInterval(updateTimer);
    
    updateTimer = setInterval(() => {
        if (player && typeof player.getCurrentTime === 'function') {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            
            if (duration > 0) {
                const progress = (currentTime / duration) * 100;
                progressBar.style.width = `${progress}%`;
            }
        }
    }, 1000);
}

// Show score overlay
function showScore() {
    // Generate random scores for demo purposes
    const pitchScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const timingScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const totalScore = Math.floor((pitchScore + timingScore) / 2);
    
    document.getElementById('scoreValue').textContent = totalScore;
    document.getElementById('pitchMeter').style.width = `${pitchScore}%`;
    document.getElementById('timingMeter').style.width = `${timingScore}%`;
    document.getElementById('pitchScore').textContent = `${pitchScore}%`;
    document.getElementById('timingScore').textContent = `${timingScore}%`;
    
    scoreOverlay.classList.add('show');
}

// Close score overlay
function closeScore() {
    scoreOverlay.classList.remove('show');
}

// Search functionality
function filterSongs(searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(term) || 
        song.artist.toLowerCase().includes(term)
    );
    
    // Reset current song index
    currentSongIndex = filteredSongs.length > 0 ? 0 : -1;
    
    // Re-render the song list
    renderSongList();
}

// Set up event listeners
function setupEventListeners() {
    // Play/Pause button
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Previous/Next buttons
    prevBtn.addEventListener('click', playPrevSong);
    nextBtn.addEventListener('click', playNextSong);
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        filterSongs(e.target.value);
    });
    
    // Close score overlay
    closeScoreBtn.addEventListener('click', closeScore);
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        // Spacebar to play/pause
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlayPause();
        }
        // Left/Right arrow keys for previous/next
        else if (e.code === 'ArrowLeft') {
            playPrevSong();
        }
        else if (e.code === 'ArrowRight') {
            playNextSong();
        }
    });
}

// Initialize the application
function init() {
    // The YouTube API will call onYouTubeIframeAPIReady when ready
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Set up event listeners for the player controls
    setupEventListeners();
}

// Start the application
init();
