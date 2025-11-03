// Format duration in seconds to MM:SS format
export const formatDuration = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Extract video ID from YouTube URL
export const extractVideoId = (url) => {
  if (!url) return '';
  
  // Handle youtu.be short URLs
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1].split('?')[0];
  }
  
  // Handle regular youtube.com URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

// Extract title from YouTube video data (will be implemented later with API)
export const extractVideoTitle = (videoData) => {
  if (!videoData) return 'Unknown Title';
  // This will be implemented when we add YouTube Data API
  return videoData.title || 'Unknown Title';
};

// Extract artist from YouTube video title (basic implementation)
export const extractArtist = (title) => {
  if (!title) return 'Unknown Artist';
  // Basic implementation - can be improved
  const parts = title.split('-');
  if (parts.length > 1) {
    return parts[0].trim();
  }
  return 'Unknown Artist';
};
