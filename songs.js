// This file contains the list of karaoke songs with their metadata
// Each song has a unique ID, title, artist, YouTube video ID, and duration in seconds

const songs = [
  {
    id: 'Gq5i9FO9iYg',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: '5:55',
    durationInSeconds: 355,
    genre: 'Rock'
  },
  {
    id: '5EVxgLGKQx8',
    title: 'Sweet Child O\'Mine',
    artist: 'Guns N\' Roses',
    duration: '5:56',
    durationInSeconds: 356,
    genre: 'Rock'
  },
  {
    id: '2aM5Cjc_IRc',
    title: 'Livin\' On A Prayer',
    artist: 'Bon Jovi',
    duration: '4:11',
    durationInSeconds: 251,
    genre: 'Rock'
  },
  {
    id: 'cHAnGILqqHg',
    title: 'Don\'t Stop Believin\'',
    artist: 'Journey',
    duration: '4:11',
    durationInSeconds: 251,
    genre: 'Rock'
  },
  {
    id: 's1g_x15beoM',
    title: 'Sweet Caroline',
    artist: 'Neil Diamond',
    duration: '3:24',
    durationInSeconds: 204,
    genre: 'Pop'
  },
  {
    id: 'YzyFk5Xr338',
    title: 'Piano Man',
    artist: 'Billy Joel',
    duration: '5:39',
    durationInSeconds: 339,
    genre: 'Pop'
  },
  {
    id: 'quPojxPnOG4',
    title: 'Wonderwall',
    artist: 'Oasis',
    duration: '4:18',
    durationInSeconds: 258,
    genre: 'Rock'
  },
  {
    id: 'KLLw23jTsZw',
    title: 'Mr. Brightside',
    artist: 'The Killers',
    duration: '3:43',
    durationInSeconds: 223,
    genre: 'Rock'
  },
  {
    id: '5zW0kklYDd4',
    title: 'All Star',
    artist: 'Smash Mouth',
    duration: '3:21',
    durationInSeconds: 201,
    genre: 'Pop'
  },
  {
    id: 'UcWEfvu6F_s',
    title: 'I Want It That Way',
    artist: 'Backstreet Boys',
    duration: '3:34',
    durationInSeconds: 214,
    genre: 'Pop'
  },
  {
    id: 'MQB5JMOW6XA',
    title: 'Hey Ya!',
    artist: 'OutKast',
    duration: '3:55',
    durationInSeconds: 235,
    genre: 'Hip Hop'
  },
  {
    id: 'R2D3k2yaewo',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    duration: '4:30',
    durationInSeconds: 270,
    genre: 'Funk'
  },
  {
    id: 'rDxaowI7JaE',
    title: 'Shallow',
    artist: 'Lady Gaga, Bradley Cooper',
    duration: '3:37',
    durationInSeconds: 217,
    genre: 'Pop'
  },
  {
    id: 'ATKvaB9jo3I',
    title: 'Someone Like You',
    artist: 'Adele',
    duration: '4:45',
    durationInSeconds: 285,
    genre: 'Pop'
  },
  {
    id: 'EeBJ86Ib1cg',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    duration: '3:49',
    durationInSeconds: 229,
    genre: 'Pop'
  },
  {
    id: 'f5JTWF-LQf8',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    duration: '3:54',
    durationInSeconds: 234,
    genre: 'Pop'
  },
  {
    id: '6rqcddw5-q4',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    duration: '4:23',
    durationInSeconds: 263,
    genre: 'Pop'
  },
  {
    id: 'VfS4HBn-21s',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    duration: '4:41',
    durationInSeconds: 281,
    genre: 'Pop'
  },
  {
    id: '15_tsyKc5-c',
    title: 'All of Me',
    artist: 'John Legend',
    duration: '4:30',
    durationInSeconds: 270,
    genre: 'R&B'
  },
  {
    id: 'pyUgwjFEtUQ',
    title: 'Say You Won\'t Let Go',
    artist: 'James Arthur',
    duration: '3:31',
    durationInSeconds: 211,
    genre: 'Pop'
  },
  {
    id: 'Rd39nTWnNmI',
    title: 'Photograph',
    artist: 'Ed Sheeran',
    duration: '4:19',
    durationInSeconds: 259,
    genre: 'Pop'
  },
  {
    id: 'gbRId8ADKsA',
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    duration: '3:53',
    durationInSeconds: 233,
    genre: 'Pop'
  },
  {
    id: 'w7hWRx5iUoI',
    title: 'Sorry',
    artist: 'Justin Bieber',
    duration: '3:21',
    durationInSeconds: 201,
    genre: 'Pop'
  },
  {
    id: 'dfIa4FGXELQ',
    title: 'What Do You Mean?',
    artist: 'Justin Bieber',
    duration: '3:26',
    durationInSeconds: 206,
    genre: 'Pop'
  },
  {
    id: 'a4YamlO8YUo',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    duration: '2:21',
    durationInSeconds: 141,
    genre: 'Pop'
  },
  {
    id: 'TVUCOP8k7aE',
    title: 'Levitating',
    artist: 'Dua Lipa',
    duration: '3:23',
    durationInSeconds: 203,
    genre: 'Pop'
  },
  {
    id: 'cP1zcJrkbYM',
    title: 'Don\'t Start Now',
    artist: 'Dua Lipa',
    duration: '3:03',
    durationInSeconds: 183,
    genre: 'Pop'
  },
  {
    id: '47N2JIXg2FU',
    title: 'New Rules',
    artist: 'Dua Lipa',
    duration: '3:29',
    durationInSeconds: 209,
    genre: 'Pop'
  },
  {
    id: 'XjgpUTxKdUs',
    title: 'Break My Heart',
    artist: 'Dua Lipa',
    duration: '3:41',
    durationInSeconds: 221,
    genre: 'Pop'
  },
  {
    id: '8W1bZ0h-wDk',
    title: 'Physical',
    artist: 'Dua Lipa',
    duration: '3:42',
    durationInSeconds: 222,
    genre: 'Pop'
  },
  {
    id: 'fM94jNLwblU',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'Pop'
  },
  {
    id: 'JUqXSVfoTSU',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    duration: '3:35',
    durationInSeconds: 215,
    genre: 'Pop'
  },
  {
    id: 'Er5FTsZwUyo',
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    duration: '3:50',
    durationInSeconds: 230,
    genre: 'Pop'
  },
  {
    id: '-SaFSZu8L7g',
    title: 'The Hills',
    artist: 'The Weeknd',
    duration: '3:42',
    durationInSeconds: 222,
    genre: 'R&B'
  },
  {
    id: 'Av11EkgQ7ms',
    title: 'Can\'t Feel My Face',
    artist: 'The Weeknd',
    duration: '3:36',
    durationInSeconds: 216,
    genre: 'Pop'
  },
  {
    id: 'h0oahkr7dBk',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    duration: '3:29',
    durationInSeconds: 209,
    genre: 'Pop'
  },
  {
    id: 'fBpVo5p0QAY',
    title: 'The Less I Know The Better',
    artist: 'Tame Impala',
    duration: '3:38',
    durationInSeconds: 218,
    genre: 'Alternative'
  },
  {
    id: '00x5hBxQ06A',
    title: 'Do I Wanna Know?',
    artist: 'Arctic Monkeys',
    duration: '4:33',
    durationInSeconds: 273,
    genre: 'Rock'
  },
  {
    id: 'dFRukOJFWFs',
    title: '505',
    artist: 'Arctic Monkeys',
    duration: '4:14',
    durationInSeconds: 254,
    genre: 'Rock'
  },
  {
    id: '9qihgfEZF58',
    title: 'R U Mine?',
    artist: 'Arctic Monkeys',
    duration: '3:22',
    durationInSeconds: 202,
    genre: 'Rock'
  },
  {
    id: 'tz_UwgOi0mk',
    title: 'Why\'d You Only Call Me When You\'re High?',
    artist: 'Arctic Monkeys',
    duration: '2:42',
    durationInSeconds: 162,
    genre: 'Rock'
  },
  {
    id: 'zFnPX0eixWc',
    title: 'Fluorescent Adolescent',
    artist: 'Arctic Monkeys',
    duration: '3:04',
    durationInSeconds: 184,
    genre: 'Rock'
  },
  {
    id: 'GOBr4oWq1tQ',
    title: 'Take On Me',
    artist: 'a-ha',
    duration: '3:48',
    durationInSeconds: 228,
    genre: 'Pop'
  },
  {
    id: 'dOrmvYNzJNc',
    title: 'Africa',
    artist: 'TOTO',
    duration: '4:57',
    durationInSeconds: 297,
    genre: 'Rock'
  },
  {
    id: 'E4nJcsxhCkg',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    duration: '4:54',
    durationInSeconds: 294,
    genre: 'Pop'
  },
  {
    id: 'iwe3B6a-2cc',
    title: 'Beat It',
    artist: 'Michael Jackson',
    duration: '4:18',
    durationInSeconds: 258,
    genre: 'Pop'
  },
  {
    id: 'YO9o8Evkx3k',
    title: 'Thriller',
    artist: 'Michael Jackson',
    duration: '5:58',
    durationInSeconds: 358,
    genre: 'Pop'
  },
  {
    id: 'G7bLIuyitvU',
    title: 'Smooth Criminal',
    artist: 'Michael Jackson',
    duration: '4:18',
    durationInSeconds: 258,
    genre: 'Pop'
  },
  {
    id: 'WWYq-5tHIsA',
    title: 'Man in the Mirror',
    artist: 'Michael Jackson',
    duration: '5:20',
    durationInSeconds: 320,
    genre: 'Pop'
  },
  {
    id: 'Yz8QVffoiTU',
    title: 'Bad',
    artist: 'Michael Jackson',
    duration: '4:07',
    durationInSeconds: 247,
    genre: 'Pop'
  },
  {
    id: '1PnHFxYnblA',
    title: 'The Way You Make Me Feel',
    artist: 'Michael Jackson',
    duration: '4:58',
    durationInSeconds: 298,
    genre: 'Pop'
  },
  {
    id: 'tuY084gN7fA',
    title: 'Black or White',
    artist: 'Michael Jackson',
    duration: '4:16',
    durationInSeconds: 256,
    genre: 'Pop'
  },
  {
    id: 'kzaY74eviaM',
    title: 'They Don\'t Care About Us',
    artist: 'Michael Jackson',
    duration: '4:44',
    durationInSeconds: 284,
    genre: 'Pop'
  },
  {
    id: '7Yb4Prp5IVA',
    title: 'Earth Song',
    artist: 'Michael Jackson',
    duration: '6:46',
    durationInSeconds: 406,
    genre: 'Pop'
  },
  {
    id: 'V3XzHTel6EQ',
    title: 'You Are Not Alone',
    artist: 'Michael Jackson',
    duration: '5:46',
    durationInSeconds: 346,
    genre: 'Pop'
  },
  {
    id: 'ee9LfX4P9Us',
    title: 'Remember the Time',
    artist: 'Michael Jackson',
    duration: '4:01',
    durationInSeconds: 241,
    genre: 'R&B'
  },
  {
    id: 'KI_tgyDMVpc',
    title: 'Dirty Diana',
    artist: 'Michael Jackson',
    duration: '4:41',
    durationInSeconds: 281,
    genre: 'Rock'
  },
  {
    id: 'd0kXgwre-Xs',
    title: 'You Rock My World',
    artist: 'Michael Jackson',
    duration: '5:39',
    durationInSeconds: 339,
    genre: 'Pop'
  },
  {
    id: 'ETpX2HK8XaE',
    title: 'Heal the World',
    artist: 'Michael Jackson',
    duration: '6:25',
    durationInSeconds: 385,
    genre: 'Pop'
  },
  {
    id: '9eZWGqK1T9c',
    title: 'Wanna Be Startin\' Somethin\'',
    artist: 'Michael Jackson',
    duration: '6:03',
    durationInSeconds: 363,
    genre: 'Pop'
  },
  {
    id: '81_T_mWAzOI',
    title: 'Don\'t Stop \'Til You Get Enough',
    artist: 'Michael Jackson',
    duration: '6:05',
    durationInSeconds: 365,
    genre: 'Disco'
  },
  {
    id: 'nyMXI4Izgh4',
    title: 'Rock With You',
    artist: 'Michael Jackson',
    duration: '3:40',
    durationInSeconds: 220,
    genre: 'Disco'
  },
  {
    id: 'a4Sy3ucTTto',
    title: 'P.Y.T. (Pretty Young Thing)',
    artist: 'Michael Jackson',
    duration: '3:59',
    durationInSeconds: 239,
    genre: 'Pop'
  },
  {
    id: 'MxDe4bM3oeg',
    title: 'Human Nature',
    artist: 'Michael Jackson',
    duration: '4:07',
    durationInSeconds: 247,
    genre: 'Pop'
  },
  {
    id: 'Hv_700W27V4',
    title: 'I Want You Back',
    artist: 'The Jackson 5',
    duration: '2:59',
    durationInSeconds: 179,
    genre: 'Pop'
  },
  {
    id: 'CCwYXIe-LJw',
    title: 'ABC',
    artist: 'The Jackson 5',
    duration: '2:59',
    durationInSeconds: 179,
    genre: 'Pop'
  },
  {
    id: 'I9lujnnRIk4',
    title: 'I\'ll Be There',
    artist: 'The Jackson 5',
    duration: '3:58',
    durationInSeconds: 238,
    genre: 'R&B'
  },
  {
    id: 'Kylmp3aQHEA',
    title: 'Blame It on the Boogie',
    artist: 'The Jacksons',
    duration: '3:30',
    durationInSeconds: 210,
    genre: 'Disco'
  },
  {
    id: 'IYRh6wPCw1E',
    title: 'Shake Your Body (Down to the Ground)',
    artist: 'The Jacksons',
    duration: '3:45',
    durationInSeconds: 225,
    genre: 'Disco'
  },
  {
    id: 'rW91hAdDe4g',
    title: 'Can You Feel It',
    artist: 'The Jacksons',
    duration: '5:00',
    durationInSeconds: 300,
    genre: 'Disco'
  },
  {
    id: 'YJltYcnDogw',
    title: 'This Is It',
    artist: 'Michael Jackson',
    duration: '3:37',
    durationInSeconds: 217,
    genre: 'Pop'
  },
  {
    id: 'p8c9nadtkJE',
    title: 'Love Never Felt So Good',
    artist: 'Michael Jackson ft. Justin Timberlake',
    duration: '4:06',
    durationInSeconds: 246,
    genre: 'Pop'
  },
  {
    id: 'K2BS8Nk3Ho',
    title: 'Hold My Hand',
    artist: 'Michael Jackson ft. Akon',
    duration: '3:32',
    durationInSeconds: 212,
    genre: 'Pop'
  },
  {
    id: 'zVkP4Qd1S10',
    title: 'Hollywood Tonight',
    artist: 'Michael Jackson',
    duration: '4:31',
    durationInSeconds: 271,
    genre: 'Pop'
  },
  {
    id: '5DL9pMJVLvc',
    title: 'Behind the Mask',
    artist: 'Michael Jackson',
    duration: '5:01',
    durationInSeconds: 301,
    genre: 'Pop'
  },
  {
    id: 'oES8iN59_nE',
    title: 'A Place with No Name',
    artist: 'Michael Jackson',
    duration: '5:35',
    durationInSeconds: 335,
    genre: 'Pop'
  },
  {
    id: 'shdzpc-qvJs',
    title: 'Slave to the Rhythm',
    artist: 'Michael Jackson',
    duration: '4:15',
    durationInSeconds: 255,
    genre: 'Pop'
  },
  {
    id: '-hHonDPzjdM',
    title: 'Love Never Felt So Good (Original Version)',
    artist: 'Michael Jackson',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'Pop'
  },
  {
    id: 'daoN4dozwq8',
    title: 'Chicago',
    artist: 'Michael Jackson',
    duration: '4:06',
    durationInSeconds: 246,
    genre: 'Pop'
  },
  {
    id: '2L2WdZlI7QE',
    title: 'Loving You',
    artist: 'Michael Jackson',
    duration: '3:15',
    durationInSeconds: 195,
    genre: 'Pop'
  },
  {
    id: 'I2EH-aYZ1vU',
    title: 'A Place with No Name (Original Version)',
    artist: 'Michael Jackson',
    duration: '4:27',
    durationInSeconds: 267,
    genre: 'Pop'
  },
  {
    id: 'j-vA4ty_-sQ',
    title: 'Slave to the Rhythm (Original Version)',
    artist: 'Michael Jackson',
    duration: '4:15',
    durationInSeconds: 255,
    genre: 'Pop'
  },
  {
    id: 'lDJLEHzFJfo',
    title: 'Blue Gangsta',
    artist: 'Michael Jackson',
    duration: '4:14',
    durationInSeconds: 254,
    genre: 'R&B'
  },
  {
    id: '2QcJ8lwbtsE',
    title: 'Xscape',
    artist: 'Michael Jackson',
    duration: '4:05',
    durationInSeconds: 245,
    genre: 'R&B'
  },
  {
    id: '7lBSDaXj750',
    title: 'Do You Know Where Your Children Are',
    artist: 'Michael Jackson',
    duration: '4:36',
    durationInSeconds: 276,
    genre: 'Pop'
  },
  {
    id: 'rjAJ1VDCO6E',
    title: 'Hollywood Tonight (Original Version)',
    artist: 'Michael Jackson',
    duration: '4:31',
    durationInSeconds: 271,
    genre: 'Pop'
  },
  {
    id: 'd7e-7NwjjWc',
    title: 'Behind the Mask (Original Version)',
    artist: 'Michael Jackson',
    duration: '5:01',
    durationInSeconds: 301,
    genre: 'Pop'
  },
  {
    id: '_Im8pND8dGk',
    title: 'Don\'t Be Messin\' Around',
    artist: 'Michael Jackson',
    duration: '4:20',
    durationInSeconds: 260,
    genre: 'Pop'
  },
  {
    id: '_ciw7VaKfac',
    title: 'I Was the Loser',
    artist: 'The Jackson 5',
    duration: '3:12',
    durationInSeconds: 192,
    genre: 'R&B'
  },
  {
    id: 'bQRFXdX6Aho',
    title: 'That\'s What Love Is Made Of',
    artist: 'The Jackson 5',
    duration: '2:57',
    durationInSeconds: 177,
    genre: 'R&B'
  },
  {
    id: 'Ch8WawV8Js0',
    title: 'Love Call',
    artist: 'The Jackson 5',
    duration: '3:07',
    durationInSeconds: 187,
    genre: 'R&B'
  },
  {
    id: '6_x-jUpib_M',
    title: 'You\'re My Best Friend, My Love',
    artist: 'The Jackson 5',
    duration: '3:25',
    durationInSeconds: 205,
    genre: 'R&B'
  },
  {
    id: 'YQkMXCGJlqw',
    title: 'It\'s Your Thing',
    artist: 'The Jackson 5',
    duration: '2:57',
    durationInSeconds: 177,
    genre: 'Funk'
  },
  {
    id: 'MtH1Co4-snI',
    title: 'The Love You Save',
    artist: 'The Jackson 5',
    duration: '3:03',
    durationInSeconds: 183,
    genre: 'R&B'
  },
  {
    id: '9UzMLtLY8CE',
    title: 'I\'ll Be There (Alternate Version)',
    artist: 'The Jackson 5',
    duration: '3:55',
    durationInSeconds: 235,
    genre: 'R&B'
  },
  {
    id: 'IRy6mTzv2VE',
    title: 'Never Can Say Goodbye',
    artist: 'The Jackson 5',
    duration: '2:59',
    durationInSeconds: 179,
    genre: 'R&B'
  },
  {
    id: '_-POsNoXJwY',
    title: 'Maybe Tomorrow',
    artist: 'The Jackson 5',
    duration: '4:45',
    durationInSeconds: 285,
    genre: 'R&B'
  },
  {
    id: '3gvv2UU2tgo',
    title: 'Sugar Daddy',
    artist: 'The Jackson 5',
    duration: '2:40',
    durationInSeconds: 160,
    genre: 'R&B'
  },
  {
    id: 'kFbPf03B700',
    title: 'I Found That Girl',
    artist: 'The Jackson 5',
    duration: '2:55',
    durationInSeconds: 175,
    genre: 'R&B'
  },
  {
    id: 'KEyTl9RiZno',
    title: 'Who\'s Lovin\' You',
    artist: 'The Jackson 5',
    duration: '4:00',
    durationInSeconds: 240,
    genre: 'R&B'
  },
  {
    id: 'qTWdhI1bMvg',
    title: 'Mama\'s Pearl',
    artist: 'The Jackson 5',
    duration: '3:12',
    durationInSeconds: 192,
    genre: 'R&B'
  },
  {
    id: 'vowNp8mWovQ',
    title: 'Goin\' Back to Indiana',
    artist: 'The Jackson 5',
    duration: '3:30',
    durationInSeconds: 210,
    genre: 'Funk'
  },
  {
    id: 'jiZnJYJ0pAM',
    title: 'Lookin\' Through the Windows',
    artist: 'The Jackson 5',
    duration: '3:24',
    durationInSeconds: 204,
    genre: 'R&B'
  },
  {
    id: 'l3zNhIpRWZI',
    title: 'Little Bitty Pretty One',
    artist: 'The Jackson 5',
    duration: '2:45',
    durationInSeconds: 165,
    genre: 'R&B'
  },
  {
    id: 'mszM6TkVWKg',
    title: 'Doctor My Eyes',
    artist: 'The Jackson 5',
    duration: '3:13',
    durationInSeconds: 193,
    genre: 'Pop'
  },
  {
    id: '5KnNqaLtXRM',
    title: 'Corner of the Sky',
    artist: 'The Jackson 5',
    duration: '3:33',
    durationInSeconds: 213,
    genre: 'Pop'
  },
  {
    id: 'Zd5fGGRZWaA',
    title: 'Hallelujah Day',
    artist: 'The Jackson 5',
    duration: '2:47',
    durationInSeconds: 167,
    genre: 'R&B'
  },
  {
    id: 'iUVpH20XKW8',
    title: 'Get It Together',
    artist: 'The Jackson 5',
    duration: '2:51',
    durationInSeconds: 171,
    genre: 'Funk'
  },
  {
    id: 'rAqrj4Fse8k',
    title: 'Dancing Machine',
    artist: 'The Jackson 5',
    duration: '2:39',
    durationInSeconds: 159,
    genre: 'Funk'
  },
  {
    id: 'h2gGsFRm90Q',
    title: 'I Am Love',
    artist: 'The Jackson 5',
    duration: '7:30',
    durationInSeconds: 450,
    genre: 'R&B'
  },
  {
    id: '-uIEdI4-ETU',
    title: 'Forever Came Today',
    artist: 'The Jackson 5',
    duration: '6:20',
    durationInSeconds: 380,
    genre: 'R&B'
  },
  {
    id: 'WBOGNGP4row',
    title: 'All I Do Is Think of You',
    artist: 'The Jackson 5',
    duration: '3:14',
    durationInSeconds: 194,
    genre: 'R&B'
  },
  {
    id: '-0hd-x_4i1Y',
    title: 'The Eternal Light',
    artist: 'The Jackson 5',
    duration: '3:35',
    durationInSeconds: 215,
    genre: 'R&B'
  },
  {
    id: 'LZKvwF6kQTc',
    title: 'We\'re Here to Entertain You',
    artist: 'The Jacksons',
    duration: '3:31',
    durationInSeconds: 211,
    genre: 'Disco'
  },
  {
    id: 'E1ljQmmLx0Q',
    title: 'Enjoy Yourself',
    artist: 'The Jacksons',
    duration: '3:25',
    durationInSeconds: 205,
    genre: 'Disco'
  },
  {
    id: 'M0W8Vnw2XjM',
    title: 'Show You the Way to Go',
    artist: 'The Jacksons',
    duration: '5:30',
    durationInSeconds: 330,
    genre: 'R&B'
  },
  {
    id: 'ydwNXkmni1A',
    title: 'Dreamer',
    artist: 'The Jacksons',
    duration: '3:10',
    durationInSeconds: 190,
    genre: 'R&B'
  },
  {
    id: 'BJyUEsNC-_s',
    title: 'Good Times',
    artist: 'The Jacksons',
    duration: '4:25',
    durationInSeconds: 265,
    genre: 'Disco'
  },
  {
    id: '37cKEVuZ-Y',
    title: 'Blame It on the Boogie (Original Version)',
    artist: 'The Jacksons',
    duration: '3:30',
    durationInSeconds: 210,
    genre: 'Disco'
  },
  {
    id: '-2hvWP9Hulg',
    title: 'Shake Your Body (Down to the Ground) (Single Version)',
    artist: 'The Jacksons',
    duration: '3:45',
    durationInSeconds: 225,
    genre: 'Disco'
  },
  {
    id: '06sNZc7OBi0',
    title: 'Lovely One',
    artist: 'The Jacksons',
    duration: '4:51',
    durationInSeconds: 291,
    genre: 'Disco'
  },
  {
    id: '-F1B2Vs9w5M',
    title: 'This Place Hotel',
    artist: 'The Jacksons',
    duration: '5:43',
    durationInSeconds: 343,
    genre: 'R&B'
  },
  {
    id: 'KqWPfb8ChS8',
    title: 'Can You Feel It',
    artist: 'The Jacksons',
    duration: '5:00',
    durationInSeconds: 300,
    genre: 'Disco'
  },
  {
    id: 'kUzHS6rwcEI',
    title: 'Walk Right Now',
    artist: 'The Jacksons',
    duration: '6:27',
    durationInSeconds: 387,
    genre: 'Disco'
  },
  {
    id: 'KCI3qN_c3k0',
    title: 'State of Shock',
    artist: 'The Jacksons ft. Mick Jagger',
    duration: '4:30',
    durationInSeconds: 270,
    genre: 'Rock'
  },
  {
    id: 'xhvuBi9oe2s',
    title: 'Torture',
    artist: 'The Jacksons',
    duration: '4:54',
    durationInSeconds: 294,
    genre: 'Pop'
  },
  {
    id: 'tln_JDVERmw',
    title: 'Body',
    artist: 'The Jacksons',
    duration: '5:05',
    durationInSeconds: 305,
    genre: 'Funk'
  },
  {
    id: 'GKlOQWXTZcw',
    title: 'Wait',
    artist: 'The Jacksons',
    duration: '6:20',
    durationInSeconds: 380,
    genre: 'Pop'
  },
  {
    id: 'rNEQuOMgLfI',
    title: 'Time Waits for No One',
    artist: 'The Jacksons',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'Pop'
  },
  {
    id: 'x16rjEk4J2k',
    title: 'Walk Right Now (12\" Version)',
    artist: 'The Jacksons',
    duration: '6:27',
    durationInSeconds: 387,
    genre: 'Disco'
  },
  {
    id: 'N2G8Z9Bx2N0',
    title: 'Can You Feel It (12\" Version)',
    artist: 'The Jacksons',
    duration: '7:40',
    durationInSeconds: 460,
    genre: 'Disco'
  },
  {
    id: 'KqWPfb8ChS8',
    title: 'Can You Feel It (Single Version)',
    artist: 'The Jacksons',
    duration: '3:50',
    durationInSeconds: 230,
    genre: 'Disco'
  },
  {
    id: 'fZyW-T0w0X4',
    title: 'This Place Hotel (A.K.A. Heartbreak Hotel)',
    artist: 'The Jacksons',
    duration: '5:43',
    durationInSeconds: 343,
    genre: 'R&B'
  },
  {
    id: '4skzjtHLsNs',
    title: 'Lovely One (Single Version)',
    artist: 'The Jacksons',
    duration: '4:51',
    durationInSeconds: 291,
    genre: 'Disco'
  },
  {
    id: 'fi_hvM6R4hE',
    title: 'This Place Hotel (Single Version)',
    artist: 'The Jacksons',
    duration: '4:25',
    durationInSeconds: 265,
    genre: 'R&B'
  },
  {
    id: 'HWQGeGpT7aw',
    title: 'Can You Feel It (Album Version)',
    artist: 'The Jacksons',
    duration: '5:00',
    durationInSeconds: 300,
    genre: 'Disco'
  },
  {
    id: 'V4ufEYPrOWI',
    title: 'Walk Right Now (Album Version)',
    artist: 'The Jacksons',
    duration: '6:27',
    durationInSeconds: 387,
    genre: 'Disco'
  },
  {
    id: '-utCxwPuOvQ',
    title: 'Lovely One (Album Version)',
    artist: 'The Jacksons',
    duration: '4:51',
    durationInSeconds: 291,
    genre: 'Disco'
  },
  {
    id: 'RlJkXsKWFLg',
    title: 'This Place Hotel (Album Version)',
    artist: 'The Jacksons',
    duration: '5:43',
    durationInSeconds: 343,
    genre: 'R&B'
  },
  {
    id: 'cX5F8LQ84bU',
    title: 'Time Waits for No One (Album Version)',
    artist: 'The Jacksons',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'Pop'
  },
  {
    id: 'EW6l4oJSlJ0',
    title: 'Walk Right Now (12\" Version)',
    artist: 'The Jacksons',
    duration: '6:27',
    durationInSeconds: 387,
    genre: 'Disco'
  },
  {
    id: '8pamveVxYYk',
    title: 'Can You Feel It (12\" Version)',
    artist: 'The Jacksons',
    duration: '7:40',
    durationInSeconds: 460,
    genre: 'Disco'
  },
  {
    id: 'W9iPvXxYbcc',
    title: 'Lovely One (12\" Version)',
    artist: 'The Jacksons',
    duration: '6:50',
    durationInSeconds: 410,
    genre: 'Disco'
  },
  {
    id: 'pW8UuVUQJ8k',
    title: 'This Place Hotel (12\" Version)',
    artist: 'The Jacksons',
    duration: '7:20',
    durationInSeconds: 440,
    genre: 'R&B'
  },
  {
    id: 'zmogyh_t_II',
    title: 'Time Waits for No One (12\" Version)',
    artist: 'The Jacksons',
    duration: '4:50',
    durationInSeconds: 290,
    genre: 'Pop'
  },
  {
    id: 'oE6JwOqvscc',
    title: 'Walk Right Now (Dub Version)',
    artist: 'The Jacksons',
    duration: '6:10',
    durationInSeconds: 370,
    genre: 'Disco'
  },
  {
    id: 'mId2SKcpGtY',
    title: 'Can You Feel It (Dub Version)',
    artist: 'The Jacksons',
    duration: '6:30',
    durationInSeconds: 390,
    genre: 'Disco'
  },
  {
    id: 'H3mOAB3ptus',
    title: 'Lovely One (Dub Version)',
    artist: 'The Jacksons',
    duration: '6:00',
    durationInSeconds: 360,
    genre: 'Disco'
  },
  {
    id: '0E_xFepFp3U',
    title: 'This Place Hotel (Dub Version)',
    artist: 'The Jacksons',
    duration: '6:50',
    durationInSeconds: 410,
    genre: 'R&B'
  },
  {
    id: 'kqDLnfDOa6s',
    title: 'Time Waits for No One (Dub Version)',
    artist: 'The Jacksons',
    duration: '4:00',
    durationInSeconds: 240,
    genre: 'Pop'
  },
  {
    id: 'xjCXya-IfT8',
    title: 'Walk Right Now (Instrumental)',
    artist: 'The Jacksons',
    duration: '6:27',
    durationInSeconds: 387,
    genre: 'Disco'
  },
  {
    id: 'iRX332y5YKE',
    title: 'Can You Feel It (Instrumental)',
    artist: 'The Jacksons',
    duration: '5:00',
    durationInSeconds: 300,
    genre: 'Disco'
  },
  {
    id: 'DIj0oPB5XmE',
    title: 'Lovely One (Instrumental)',
    artist: 'The Jacksons',
    duration: '4:51',
    durationInSeconds: 291,
    genre: 'Disco'
  },
  {
    id: '89m6pBct3DQ',
    title: 'This Place Hotel (Instrumental)',
    artist: 'The Jacksons',
    duration: '5:43',
    durationInSeconds: 343,
    genre: 'R&B'
  },
  {
    id: 'Tr_vcq7kVng',
    title: 'Time Waits for No One (Instrumental)',
    artist: 'The Jacksons',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'Pop'
  },
  {
    id: 'qMgjT6ZIT9M',
    title: 'Walk Right Now (A Cappella)',
    artist: 'The Jacksons',
    duration: '3:15',
    durationInSeconds: 195,
    genre: 'A Cappella'
  },
  {
    id: 'ksH4p2h6XYY',
    title: 'Can You Feel It (A Cappella)',
    artist: 'The Jacksons',
    duration: '2:45',
    durationInSeconds: 165,
    genre: 'A Cappella'
  },
  {
    id: 'moDJiGgIt-I',
    title: 'Lovely One (A Cappella)',
    artist: 'The Jacksons',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'A Cappella'
  },
  {
    id: '8GlRnyKR_jo',
    title: 'This Place Hotel (A Cappella)',
    artist: 'The Jacksons',
    duration: '4:10',
    durationInSeconds: 250,
    genre: 'A Cappella'
  },
  {
    id: 'cd8Lbf0PnaQ',
    title: 'Time Waits for No One (A Cappella)',
    artist: 'The Jacksons',
    duration: '2:55',
    durationInSeconds: 175,
    genre: 'A Cappella'
  },
  {
    id: 'QigK_Cf3vhM',
    title: 'Walk Right Now (Acoustic Version)',
    artist: 'The Jacksons',
    duration: '4:30',
    durationInSeconds: 270,
    genre: 'Acoustic'
  },
  {
    id: 'H1TAeO5YlE',
    title: 'Can You Feel It (Acoustic Version)',
    artist: 'The Jacksons',
    duration: '4:15',
    durationInSeconds: 255,
    genre: 'Acoustic'
  },
  {
    id: 'if_AdrLU7h4',
    title: 'Lovely One (Acoustic Version)',
    artist: 'The Jacksons',
    duration: '4:05',
    durationInSeconds: 245,
    genre: 'Acoustic'
  },
  {
    id: '9m259jYJClU',
    title: 'This Place Hotel (Acoustic Version)',
    artist: 'The Jacksons',
    duration: '5:15',
    durationInSeconds: 315,
    genre: 'Acoustic'
  },
  {
    id: 'EIwW76OyJ3U',
    title: 'Time Waits for No One (Acoustic Version)',
    artist: 'The Jacksons',
    duration: '3:40',
    durationInSeconds: 220,
    genre: 'Acoustic'
  },
  {
    id: '9hg4YU0hiBs',
    title: 'Walk Right Now (Live)',
    artist: 'The Jacksons',
    duration: '7:15',
    durationInSeconds: 435,
    genre: 'Live'
  },
  {
    id: 'SMhWV33sjjQ',
    title: 'Can You Feel It (Live)',
    artist: 'The Jacksons',
    duration: '6:30',
    durationInSeconds: 390,
    genre: 'Live'
  },
  {
    id: 'kv5ddBfEyPg',
    title: 'Lovely One (Live)',
    artist: 'The Jacksons',
    duration: '5:45',
    durationInSeconds: 345,
    genre: 'Live'
  },
  {
    id: '-Fv4N9beaoA',
    title: 'This Place Hotel (Live)',
    artist: 'The Jacksons',
    duration: '6:50',
    durationInSeconds: 410,
    genre: 'Live'
  },
  {
    id: 'eOlM0yAwwjc',
    title: 'Time Waits for No One (Live)',
    artist: 'The Jacksons',
    duration: '4:20',
    durationInSeconds: 260,
    genre: 'Live'
  },
  {
    id: '6T8aIuNb3ks',
    title: 'Walk Right Now (Remix)',
    artist: 'The Jacksons',
    duration: '5:45',
    durationInSeconds: 345,
    genre: 'Remix'
  },
  {
    id: '8SdNqJ0M6kE',
    title: 'Can You Feel It (Remix)',
    artist: 'The Jacksons',
    duration: '6:15',
    durationInSeconds: 375,
    genre: 'Remix'
  },
  {
    id: 'jpLGPTvq9K0',
    title: 'Lovely One (Remix)',
    artist: 'The Jacksons',
    duration: '5:30',
    durationInSeconds: 330,
    genre: 'Remix'
  },
  {
    id: 'oCz2e48avLM',
    title: 'This Place Hotel (Remix)',
    artist: 'The Jacksons',
    duration: '7:10',
    durationInSeconds: 430,
    genre: 'Remix'
  },
  {
    id: 'rkffxLtRe3I',
    title: 'Time Waits for No One (Remix)',
    artist: 'The Jacksons',
    duration: '4:45',
    durationInSeconds: 285,
    genre: 'Remix'
  },
  {
    id: 'SI1PzCvyImo',
    title: 'Walk Right Now (Radio Edit)',
    artist: 'The Jacksons',
    duration: '3:45',
    durationInSeconds: 225,
    genre: 'Pop'
  },
  {
    id: 'W5bn7sj2AWg',
    title: 'Can You Feel It (Radio Edit)',
    artist: 'The Jacksons',
    duration: '3:30',
    durationInSeconds: 210,
    genre: 'Pop'
  },
  {
    id: 'Xe6InUyxabM',
    title: 'Lovely One (Radio Edit)',
    artist: 'The Jacksons',
    duration: '3:15',
    durationInSeconds: 195,
    genre: 'Pop'
  },
  {
    id: 'pH7qXILrnTs',
    title: 'This Place Hotel (Radio Edit)',
    artist: 'The Jacksons',
    duration: '4:10',
    durationInSeconds: 250,
    genre: 'R&B'
  },
  {
    id: 'W5rH86cWhkg',
    title: 'Time Waits for No One (Radio Edit)',
    artist: 'The Jacksons',
    duration: '3:00',
    durationInSeconds: 180,
    genre: 'Pop'
  },
  {
    id: '6Ns3Y7whX68',
    title: 'Walk Right Now (Extended Version)',
    artist: 'The Jacksons',
    duration: '8:15',
    durationInSeconds: 495,
    genre: 'Disco'
  },
  {
    id: 'QNkM8K0e3hQ',
    title: 'Can You Feel It (Extended Version)',
    artist: 'The Jacksons',
    duration: '7:45',
    durationInSeconds: 465,
    genre: 'Disco'
  },
  {
    id: 'b8k60cVvszM',
    title: 'Lovely One (Extended Version)',
    artist: 'The Jacksons',
    duration: '7:15',
    durationInSeconds: 435,
    genre: 'Disco'
  },
  {
    id: 'M4Mgx6do0kM',
    title: 'This Place Hotel (Extended Version)',
    artist: 'The Jacksons',
    duration: '8:30',
    durationInSeconds: 510,
    genre: 'R&B'
  },
  {
    id: 'CLngXGkzslg',
    title: 'Time Waits for No One (Extended Version)',
    artist: 'The Jacksons',
    duration: '5:45',
    durationInSeconds: 345,
    genre: 'Pop'
  },
  {
    id: 'vD2eFk10dPw',
    title: 'Walk Right Now (Unreleased Version)',
    artist: 'The Jacksons',
    duration: '6:50',
    durationInSeconds: 410,
    genre: 'Disco'
  },
  {
    id: 'O0Tr8kjBJlk',
    title: 'Can You Feel It (Unreleased Version)',
    artist: 'The Jacksons',
    duration: '6:10',
    durationInSeconds: 370,
    genre: 'Disco'
  },
  {
    id: 'CNVkvHUhDqA',
    title: 'Lovely One (Unreleased Version)',
    artist: 'The Jacksons',
    duration: '5:40',
    durationInSeconds: 340,
    genre: 'Disco'
  },
  {
    id: 's2hrEFkU3_c',
    title: 'This Place Hotel (Unreleased Version)',
    artist: 'The Jacksons',
    duration: '7:05',
    durationInSeconds: 425,
    genre: 'R&B'
  },
  {
    id: 'sfs3TpxEuhI',
    title: 'Time Waits for No One (Unreleased Version)',
    artist: 'The Jacksons',
    duration: '4:15',
    durationInSeconds: 255,
    genre: 'Pop'
  },
  {
    id: 'zfEaYbWoxko',
    title: 'Walk Right Now (Demo)',
    artist: 'The Jacksons',
    duration: '5:20',
    durationInSeconds: 320,
    genre: 'Demo'
  },
  {
    id: 'NFtxy0Qz980',
    title: 'Can You Feel It (Demo)',
    artist: 'The Jacksons',
    duration: '4:50',
    durationInSeconds: 290,
    genre: 'Demo'
  },
  {
    id: '36JrsH1yaMY',
    title: 'Lovely One (Demo)',
    artist: 'The Jacksons',
    duration: '4:25',
    durationInSeconds: 265,
    genre: 'Demo'
  },
  {
    id: 'Yg0vMQzAPoQ',
    title: 'This Place Hotel (Demo)',
    artist: 'The Jacksons',
    duration: '6:15',
    durationInSeconds: 375,
    genre: 'Demo'
  },
  {
    id: 'VqTnq2u5ZQ4',
    title: 'Time Waits for No One (Demo)',
    artist: 'The Jacksons',
    duration: '3:45',
    durationInSeconds: 225,
    genre: 'Demo'
  },
  {
    id: 'C9Pp6-8s8Nc',
    title: 'Walk Right Now (Acapella)',
    artist: 'The Jacksons',
    duration: '3:15',
    durationInSeconds: 195,
    genre: 'A Cappella'
  },
  {
    id: 'eOGZvmEIymg',
    title: 'Can You Feel It (Acapella)',
    artist: 'The Jacksons',
    duration: '2:45',
    durationInSeconds: 165,
    genre: 'A Cappella'
  },
  {
    id: 'LReGw4kwbmA',
    title: 'Lovely One (Acapella)',
    artist: 'The Jacksons',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'A Cappella'
  },
  {
    id: 'VnqbnzxdOxI',
    title: 'This Place Hotel (Acapella)',
    artist: 'The Jacksons',
    duration: '4:10',
    durationInSeconds: 250,
    genre: 'A Cappella'
  },
  {
    id: '1_BIp7uvLsQ',
    title: 'Time Waits for No One (Acapella)',
    artist: 'The Jacksons',
    duration: '2:55',
    durationInSeconds: 175,
    genre: 'A Cappella'
  },
  {
    id: 'wuqNn2UZ2os',
    title: 'Walk Right Now (Instrumental)',
    artist: 'The Jacksons',
    duration: '6:27',
    durationInSeconds: 387,
    genre: 'Instrumental'
  },
  {
    id: 'lmjX_M_SObk',
    title: 'Can You Feel It (Instrumental)',
    artist: 'The Jacksons',
    duration: '5:00',
    durationInSeconds: 300,
    genre: 'Instrumental'
  },
  {
    id: 'FsiMzu0-1PM',
    title: 'Lovely One (Instrumental)',
    artist: 'The Jacksons',
    duration: '4:51',
    durationInSeconds: 291,
    genre: 'Instrumental'
  },
  {
    id: '-Fkvp8jKux0',
    title: 'This Place Hotel (Instrumental)',
    artist: 'The Jacksons',
    duration: '5:43',
    durationInSeconds: 343,
    genre: 'Instrumental'
  },
  {
    id: '2vHp74mrXAk',
    title: 'Time Waits for No One (Instrumental)',
    artist: 'The Jacksons',
    duration: '3:20',
    durationInSeconds: 200,
    genre: 'Instrumental'
  }
];

export default songs;
