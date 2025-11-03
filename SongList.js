import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Paper, InputBase, IconButton, Divider, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { styled } from '@mui/material/styles';

const StyledList = styled(Paper)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: '100%',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.default,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const SongList = ({ songs, onSelect, currentSong }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredSongs, setFilteredSongs] = React.useState(songs);

  React.useEffect(() => {
    const results = songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSults(results);
  }, [searchTerm, songs]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <StyledList elevation={3}>
      <SearchContainer>
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'text.primary' }}
          placeholder="Search songs..."
          value={searchTerm}
          onChange={handleSearchChange}
          inputProps={{ 'aria-label': 'search songs' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </SearchContainer>
      <Divider />
      <List dense component="div" role="list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <ListItem
              key={song.id}
              disablePadding
              divider={index < filteredSongs.length - 1}
              sx={{
                backgroundColor: currentSong?.id === song.id ? 'rgba(255, 64, 129, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemButton 
                onClick={() => onSelect(song)}
                selected={currentSong?.id === song.id}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 64, 129, 0.15)',
                    },
                  },
                }}
              >
                <MusicNoteIcon sx={{ mr: 2, color: 'primary.main' }} />
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color={currentSong?.id === song.id ? 'primary' : 'text.primary'}
                        sx={{ fontWeight: currentSong?.id === song.id ? 'bold' : 'normal' }}
                      >
                        {song.title}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color={currentSong?.id === song.id ? 'primary.light' : 'text.secondary'}
                    >
                      {song.artist}
                    </Typography>
                  }
                />
                <Typography variant="caption" color="text.secondary">
                  {song.duration}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText 
              primary="No songs found" 
              primaryTypographyProps={{
                color: 'text.secondary',
                textAlign: 'center',
                py: 2
              }}
            />
          </ListItem>
        )}
      </List>
    </StyledList>
  );
};

export default SongList;
