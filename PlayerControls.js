import React from 'react';
import { Box, Slider, IconButton, Typography, Paper, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { formatDuration } from '../utils/format';

const StyledControls = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const PlayerControls = ({
  isPlaying,
  onPlay,
  onPause,
  volume,
  onVolumeChange,
  currentSong,
  progress,
}) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [previousVolume, setPreviousVolume] = React.useState(volume);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(null, previousVolume);
    } else {
      setPreviousVolume(volume);
      onVolumeChange(null, 0);
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (event, newValue) => {
    onVolumeChange(event, newValue);
    if (newValue === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <StyledControls elevation={3}>
      {/* Song Info */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" noWrap>
          {currentSong ? currentSong.title : 'No song selected'}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {currentSong ? currentSong.artist : 'Select a song to begin'}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ width: 50, textAlign: 'right' }}>
          {formatDuration(progress || 0)}
        </Typography>
        <Slider
          value={progress || 0}
          min={0}
          max={currentSong?.durationInSeconds || 100}
          aria-label="song progress"
          sx={{ mx: 2, flexGrow: 1 }}
          disabled={!currentSong}
        />
        <Typography variant="caption" color="text.secondary" sx={{ width: 50 }}>
          {currentSong ? formatDuration(currentSong.durationInSeconds) : '0:00'}
        </Typography>
      </Box>

      {/* Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Previous">
            <span>
              <IconButton disabled={!currentSong}>
                <SkipPreviousIcon />
              </IconButton>
            </span>
          </Tooltip>
          
          <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
            <span>
              <IconButton 
                onClick={handlePlayPause} 
                disabled={!currentSong}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  width: 56,
                  height: 56,
                  m: 1,
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
            </span>
          </Tooltip>
          
          <Tooltip title="Next">
            <span>
              <IconButton disabled={!currentSong}>
                <SkipNextIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
          <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
            <IconButton onClick={toggleMute}>
              {isMuted || volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </Tooltip>
          <Slider
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="volume"
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>
    </StyledControls>
  );
};

export default PlayerControls;
