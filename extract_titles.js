// This script would be used to extract video titles from YouTube links
// Note: This requires the YouTube Data API key and proper setup
// For now, we'll use a placeholder implementation

const fs = require('fs');
const path = require('path');

// This is a simplified version - in a real scenario, you would use the YouTube API
// to fetch the actual video titles and other metadata

const songs = [
  {
    id: 'Gq5i9FO9iYg',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: '5:55',
    durationInSeconds: 355,
    genre: 'Rock'
  },
  // ... more songs would be added here
];

// Save to a JSON file
const outputPath = path.join(__dirname, '../src/data/songs.json');
fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2));

console.log(`Successfully saved ${songs.length} songs to ${outputPath}`);
