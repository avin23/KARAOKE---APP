import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Box } from '@mui/material';
import YouTube from 'react-youtube';
import SongList from './components/SongList';
import PlayerControls from './components/PlayerControls';
import { songs } from './data/songs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#00bcd4',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
});

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onPlay = () => {
    if (player) {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  const onPause = () => {
    if (player) {
      player.pauseVideo();
      setIsPlaying(false);
    }
  };

  const onVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (player) {
      player.setVolume(newValue);
    }
  };

  const onSongSelect = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setScore(0);
  };

  const onEnd = () => {
    // Calculate final score when song ends
    const finalScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-100 for demo
    setScore(finalScore);
    setIsPlaying(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Karaoke Party
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Video Player Section */}
          <Box sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', // 16:9 aspect ratio
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            bgcolor: 'background.paper'
          }}>
            {currentSong ? (
              <>
                <YouTube
                  videoId={currentSong.id}
                  opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      disablekb: 1,
                      fs: 0,
                      iv_load_policy: 3,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                  onReady={onReady}
                  onPlay={onPlay}
                  onPause={onPause}
                  onEnd={onEnd}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
                {score > 0 && (
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                    zIndex: 10,
                  }}>
                    <Typography variant="h3" color="primary">Your Score: {score}%</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {score >= 90 ? 'Amazing!' : score >= 75 ? 'Great job!' : score >= 60 ? 'Good try!' : 'Keep practicing!'}
                    </Typography>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}>
                <Typography variant="h6">Select a song to begin</Typography>
              </Box>
            )}
          </Box>

          {/* Player Controls */}
          <PlayerControls
            isPlaying={isPlaying}
            onPlay={onPlay}
            onPause={onPause}
            volume={volume}
            onVolumeChange={onVolumeChange}
            currentSong={currentSong}
            progress={progress}
          />

          {/* Song List */}
          <Box sx={{ mt: 4, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
              Song List
            </Typography>
            <SongList 
              songs={songs} 
              onSelect={onSongSelect} 
              currentSong={currentSong}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
