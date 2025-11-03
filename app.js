// YouTube Player API
let player;
let currentSongIndex = -1;
let songs = [];
let filteredSongs = [];
let isYouTubeAPIReady = false;

// Audio Analysis for scoring
let audioContext;
let analyser;
let microphone;
let scriptProcessor;
let pitchData = [];
let tempoData = [];
let isRecording = false;

// DOM Elements
const songList = document.getElementById('songList');
const searchInput = document.getElementById('searchInput');
const currentSongElement = document.getElementById('current-song');
const scoreDisplay = document.getElementById('score-display');
const scoreElement = document.getElementById('score');
const scoreFill = document.getElementById('score-fill');
const recordingIndicator = document.getElementById('recording-indicator');

// Initialize the app
function init() {
    // Load songs from the provided YouTube links
    loadSongs();
    
    // Event listeners
    searchInput.addEventListener('input', filterSongs);
    
    // Hide score display initially
    scoreDisplay.style.display = 'none';
    
    // Load YouTube API if not already loaded
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
        isYouTubeAPIReady = true;
    }
}

// Load songs from the provided YouTube links
async function loadSongs() {
    // Check if we have cached songs
    const cachedSongs = localStorage.getItem('karaokeSongs');
    const cacheTimestamp = localStorage.getItem('karaokeSongsTimestamp');
    const cacheExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    if (cachedSongs && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        if (age < cacheExpiry) {
            // Use cached data
            songs = JSON.parse(cachedSongs);
            filteredSongs = [...songs];
            renderSongList();
            console.log(`Loaded ${songs.length} songs from cache!`);
            return;
        }
    }
    
    // Show loading message
    songList.innerHTML = '<div style="text-align: center; padding: 20px; color: #fff;">Loading songs... This may take a moment...</div>';
    
    // Array of YouTube video IDs - Use update-songs.html tool to add all your songs
        const videoIds = [
        'Gq5i9FO9iYg', '5EVxgLGKQx8', '2aM5Cjc_IRc', 'cHAnGILqqHg', 's1g_x15beoM', 
        'YzyFk5Xr338', 'quPojxPnOG4', 'KLLw23jTsZw', '5zW0kklYDd4', 'UcWEfvu6F_s', 
        'MQB5JMOW6XA', 'R2D3k2yaewo', 'rDxaowI7JaE', 'ATKvaB9jo3I', 'EeBJ86Ib1cg', 
        'f5JTWF-LQf8', '6rqcddw5-q4', 'VfS4HBn-21s', '15_tsyKc5-c', 'pyUgwjFEtUQ', 
        'Rd39nTWnNmI', 'gbRId8ADKsA', 'w7hWRx5iUoI', 'dfIa4FGXELQ', 'a4YamlO8YUo', 
        'TVUCOP8k7aE', 'cP1zcJrkbYM', '47N2JIXg2FU', 'XjgpUTxKdUs', '8W1bZ0h-wDk', 
        'fM94jNLwblU', 'JUqXSVfoTSU', 'Er5FTsZwUyo', '-SaFSZu8L7g', 'Av11EkgQ7ms', 
        'h0oahkr7dBk', 'fBpVo5p0QAY', '00x5hBxQ06A', 'dFRukOJFWFs', '9qihgfEZF58', 
        'tz_UwgOi0mk', 'zFnPX0eixWc', 'GOBr4oWq1tQ', 'dOrmvYNzJNc', 'E4nJcsxhCkg', 
        'iwe3B6a-2cc', 'YO9o8Evkx3k', 'G7bLIuyitvU', 'WWYq-5tHIsA', 'Yz8QVffoiTU', 
        '1PnHFxYnblA', 'tuY084gN7fA', 'kzaY74eviaM', '7Yb4Prp5IVA', 'V3XzHTel6EQ', 
        'ee9LfX4P9Us', 'KI_tgyDMVpc', 'd0kXgwre-Xs', 'ETpX2HK8XaE', '9eZWGqK1T9c', 
        '81_T_mWAzOI', 'nyMXI4Izgh4', 'a4Sy3ucTTto', 'MxDe4bM3oeg', 'Hv_700W27V4', 
        'CCwYXIe-LJw', 'I9lujnnRIk4', 'Kylmp3aQHEA', 'IYRh6wPCw1E', 'r7H_9PjsWcU', 
        'bhLx_dNvQR8', '7yMA3ek3c2Q', 'nHZI8dI-jjc', 'NA6SMVuNWrQ', 'rNH3nec_j2E', 
        'nGJzlPwEV1Y', 'J68fJRRujwE', 'WTN-RRqgmJ0', 'SDYftFtpPQg', 'wUimn_UZCLU', 
        'RVKYzLij8lU', 'gvI4y82GPBE', 'eE8KuTbO-q8', 'CzTBXAlid8s', '1f5vdUwJNaE', 
        '03_Ky67a8CI', 'uCTx8b7r7fE', 'icyYMD0Fs4Q', 'zQxwLxS_YOw', 'vOgBxn_PZFc', 
        'C_zvTrtj0fk', 'BQ3pKsLi2kk', 'pvbFxxMg8jw', 'W-CaIQ0QECU', '9kz3q41rSZY', 
        'DRS1oLHFB4Q', '6S6yC5EuVfs', 'sQOIU-tO3SA', 'WXgQf_XHKXc', 'UE5Zm45eqWc', 
        '34bpqW3Ipz4', 'otlBgx8ksGo', 'A0gP971wvY4', 'ZVDhb-ush24', 'qLeYLm8im5g', 
        'NJMK-9gCMdo', 'BG5bJRa3sBQ', 'S2LlzOQlBFk', 'L48ZimFM-6U', '-Ji_rJnKB_c', 
        'psNE9XUiTjU', 'vOGR8oT0dD4', 'yxOyt5_lmaY', 'E9KcmhwjFwg', 'WAKYTaBM0BU', 
        '3TTZeLN1nnc', '6Be8Uvdc1A8', 'Z0XCugg8WSc', 'sqGlZvrmWtA', '_D4d9oRGrlY', 
        't4Rh3cmIGao', 'Iswb5lEX_QM', '1fv44ho6UxU', '-l24u_d_OJk', 'i1mkfHnyVhY', 
        'B3qbUTzG0Ak', 'aAX_p13Idwo', 'Xlsp19llwJM', 'PudSOYRO76E', '32QDVtc8yaI', 
        'VzmvNleHcvE', 'vruUrZl_xt0', 'j-2Tb-q_lgw', 'hRI6Y36kffQ', 'rzIAgwNn6SQ', 
        'BCgbBfTDEOU', 'fV0d0CLFj9Q', 'IFldyh7IPiw', 'QKE_flf1RQk', '4vfIqydNC4o', 
        'sQdwuYVyG4k', 'mOy--c3W9to', '3j3buH5jukE', '2jJMEAfSZa0', 'YIgowrg8jIg', 
        '4VF_zZnfsPo', 'N9rJxn7OpIg', 'HhUSUhhwWGE', 'bgvUTnfZav4', 'T32OK3R60t4', 
        '7Z-YposXHIU', 'H2n_goCa0bE', 'IpXuQdPhj7Q', 'YdHLg9XiYUY', 'ruKEx0lqhxc', 
        '5R3U-8S1qfk', '1zop4XR66-w', 'crF8R6qiBp0', 'Otqd1tuYitk', 'XDI7UYfyMQA', 
        'VQJKXVy67K0', 'WNV7TqlgwAo', 'v7pVBAebzkw', 'khnsjOmPZ4A', 'zNdkgTPF2cc', 
        'BB7tnLs3LBY', '5dzG2208-AU', 'ws1g8m2ASwc', 'uaDxrvzuelk', 'rd521RNIpwE', 
        'khQ2RENULtY', 'dsKVA9n2uhA', 'ZCPGpu30OLM', 'ei5gggNr5B8', 'L6cFarUExQc', 
        'jVH4lQDOQrM', 'PPDDOoByMHA', 'CtOEDEPD_lw', 'HNy41EFCJcs', 'R-SkTXHlvME', 
        'QM7wlr4rcek', '9Bl8lqIzo0w', 'azxIUnRmK3c', 'qjMSGIfB1j8', '9F0mAiipcwM', 
        'nCkbvLtMmks', 'i3D4C4QIVkA', 'ywm77POHDf8', '5ElC2IWkfIM', 'QBdeFNVilrE', 
        'zqVTe3bZmvA', 'leP8DEWLkZc', 'k62xV4XNpEc', 'vM3jTjZ20Wo', '4RTKcnMQUtA', 
        '7nER8VC0Dos', 'bYp40CBJl5s', 't-JpDQ7WcWA', '-OVKlnY_WNU', '8LLh1VCfT6U', 
        'is0SQqGDyTI', 'tUkyQWWV4bk', 'PZIz3-1AmKg', 'q44hThFjiuA', 'sb2laNtuK18', 
        'umsfEMINMPM', 'evszo_wT7Gs', 'vG328QYUELk', 'I3_FaKKyKPg', 'CGEPRtZrhMo', 
        '-pXQTGMJ8IU', 'EB4eCWHcZSI', 'kv6VeRIA0ec', 'xGwDTv9BhKY', 'HseRUhNQNxg', 
        'iZu6jvCAxvc', 'N9KEdZSnj2A', 'HF9h1TuszeY', 'dbIMY5ny5K0', 'iuVKHJkeymg', 
        'je_zdhlSIrk', 'Lbohqhuo28s', '_dvqAgTDILc', 'mK_heq8qCLg', 'goivWp1ZMmg', 
        'v75DGFLKzVk', 'vS-CNKykzfQ', '8-5X4R93Z5s', 's2pTc51DHSc', 'J9JIHwuLOis', 
        'Eur6c6fvYg8', 'dkTGmwSd_7U', '5zNgHnbxeYo', 'VRs5ZBH2YzM', '05TCevz9MTY', 
        'm5OqpwJo4ec', 'ZDgyfqricXs', 'WKwYHj-csjg', 'XCUfT_47ADg', '6KoIxt4oGlU', 
        'EViMTVxc_0A', 'M2fCeZRd_Dk', 'lYP7Ibvy_uk', 'HfXGbqZ2_hg', 'BWN3KQNV2QQ', 
        '4C6GaF7z6rU', 'YuOIP-SNLV4', 'OoQfdv012KA', 'IQDvxuPiVsk', 'FXGGA7udd1c', 
        'Qh-TzqXpkrs', '3oJU8Nu1vGc', 'gDtRncb2DWE', '_BfKBvY9bMs', 'LHQ9rBDE7QA', 
        '6q1-BA_ZgcU', '1-iOGZ762kY', 'c7qAHxBt-z4', 'nJEdf5DBAOY', 'wcUoOaBuYJI', 
        'CHMEBotLjas', 'rMH45OMIjBE', 'jf3FaRGJdR4', 'O1eOOmeSLPE', '2QuEvkJMIow', 
        'azF7fA79Rls', 'KS2IJmFpokM', 'OO74kqi5PGE', 'mPRfAefDTl0', 'IChBReXQjkc', 
        'lk7wtCxOME4', 'Ee7cb8alwy8', 'j1sUqmZOM8A', '1nNdPl6O5Sc', 'C9JLDJDrykc', 
        '_q9xg1eW_9E', 'hrN0jz16aBw', '8NXGzWPGOwk', 'sxMsnOTfM_w', 'Yc0_NKnjqJA', 
        '1IWqURONwoA', 'tmbDxbFnyvI', 'gg-IH38V3rE', 'DD41jYFPAsE', 'WmJv-I0RF2o', 
        'BSOSaubwmEY', 'P_dEU80pPQo', 'v07XFgbH-AA', 'zm4ylBloB8c', '8bGNGbF36wY', 
        'UZyhw7bYmrw', 'EW6l4oJSlJ0', '8pamveVxYYk', 'Wki4rJ9pBbc', 'pWTTUugASJ8', 
        'zmogyh_t_II', 'oE6JwOqvscc', 'mId2SKcpGtY', 'H3mOAB3ptus', '0E_xFepFp3U', 
        'kqDLnfDOa6s', 'xjCXya-IfT8', 'iRX332y5YKE', 'DIj0oPB5XmE', '89m6pBct3DQ', 
        'Tr_vcq7kVng', 'qMgjT6ZIT9M', 'ksH4p2h6XYY', 'moDJiGgIt-I', '8GlRnyKR_jo', 
        'cd8Lbf0PnaQ', 'QigK_Cf3vhM', 'H1TAEeO5YlE', 'if_AdrLU7h4', '9m259jYJClU', 
        'EIwW76OyJ3U', '9hg4YU0hiBs', 'SMhWV33sjjQ', 'kv5ddBfEyPg', '-Fv4N9beaoA', 
        'eOlM0yAwwjc', '6T8aIuNb3ks', '8SdNqJ0M6kE', 'jpLGPTvq9K0', 'oCz2e48avLM', 
        'rkffxLtRe3I', 'SI1PzCvyImo', 'W5bn7sj2AWg', 'Xe6InUyxabM', 'pH7qXILrnTs', 
        'W5rH86cWhkg', '6Ns3Y7whX68', 'QNkM8K0e3hQ', 'b8k60cVvszM', 'M4Mgx6do0kM', 
        'CLngXGkzslg', 'vD2eFk10dPw', 'O0Tr8kjBJlk', 'CNVkvHUhDqA', 's2hrEFkU3_c', 
        'sfs3TpxEuhI', 'zfEaYbWoxko', 'NFtxy0Qz980', '36JrsH1yaMY', 'Yg0vMQzAPoQ', 
        'VqTnq2u5ZQ4', 'C9Pp6-8s8Nc', 'eOGZvmEIymg', 'LReGw4kwbmA', 'VnqbnzxdOxI', 
        '1_BIp7uvLsQ', 'wuqNn2UZ2os', 'lmjX_M_SObk', 'FsiMzu0-1PM', '-Fkvp8jKux0', 
        '2vHp74mrXAk', 'Ho07BPxvy7U', 'uX2sgJXY3_U', 'eDasI4SAugI', 'pFe1XHea5LI', 
        'Z8WAgphj2oc', '1pOFPExPDCY', 'nF0qxXx8r5Q', 'FjtN7ppnp4w', 'YbC4ahMRv4k', 
        'EWkqvY8iK5c', 'dft1-gkkXZQ', 'ZgR1aEGdEao', 'ksqDc3I83k4', 'jKvCfHPFV0w', 
        'aLF6DlxMr4g', '-FMRWINfzTY', 'X_OO6h5zqe8', 'i_nNeeRs8ig', 'j1SowyZKj1U', 
        '8eYgvMalgM4', 'gfzb3lcZjRg', 'K2R4b0gP2mw', 'pzWiY14cPK4', 'Jj_hCagVn2o', 
        'K0RJ4s786WU', '306fj13ywKE', 'XUV95IKPK50', 'WFuUJJVfUMQ', 'YX6y9tGG_BU', 
        '9A_eefDCbPA', 'jCL5_b4Ke48', 'ZG48c0pWNoA', 'mqXy8PoGJ1w', 'Yxalrx1EYfE', 
        '1uI4J61i2Ts', '8mK_remhVlM', 'NiLHHg5S6ZI', 'gdwZ_7sdoXM', 'xe_eBbauWOk', 
        'sC0p-JJdwSo', 'KSL6_SMYPH0', 'nby0WKiFVIc', '6w7klo7AMgM', 'bi0tcrwJvCc', 
        'H6RqJRCWPT4', 'i8tG8AriwVM', 'EcFwPXcGfqU', 'lnZYwgqU2pc', 'L4yEVy3mT2g', 
        'P4ApYxP0kos', 'WLGzdCndIlE', 'wtT8_8ig8F0', 'EdGwI4J5pDw', '9HjrPsCmjKw', 
        'zcUz-skZjdQ', 'fbk5bwNCIng', 'ZSaTQSpjxKc', 'M-f9FAIEcNM', '0byb_Suv854', 
        'FLJN0xZ-CxA', 'WynfCEiXEkM', 'tyaN9cR7tKY', 'P65-ylKRd6Q', '49shDqjfCH0', 
        'h8kXWB9rSm0', '6xhrfOdd200', 'wVnvYKLfjlg', '-EZDyHlMrc8', 'i94NkhIaIck', 
        'aopznAD6m9w', 'DGd2rZu2AQc', 'MzBkG_nfpHU', 'ZBBX09K9MQg', 'DJbAWDPLGsA', 
        'VL9R3uvkagM', 'dmc4ibkcHYY', 'RBkvds0qOiI', 'R2OtimCmtDE', '0z9dheefCoU', 
        'LruQapGkZSI', 'QkdjSDXTrQk', '8E_Y82H3550', 'G9CXps_mhd4', 'qvEZODh3Zyw', 
        'bh-n0Q0nxO0', '7bJV6JDv8KM', 'MjfEJChi3B4', 'D5vvcRaZYOU', 'lLJ839ozNIY', 
        'Bau5wK5iWz8', 'wFSh-KAbun8', 'eyDqltDIyeA', 'KvbHTMO1ROA', '36xzdQsb3IY', 
        'jXveNm55i_w', 'Emx4Y-B1VF8', '_8ODBL8mW3k', 'yiFwLzrY388', 'LCohCDs7OyI', 
        'aPdwM-sRzg8', '8ebEJCqmneM', 'Ul0qKMU1Jpo', '-HF3E9gr-os', 'Fn6UUME4LxU', 
        'RSbCNBrXvTs', 'GYRSVgWwJ10', 'u4yRckWcFNg', 'QasKjOyz1Ww', 'B3sf0kXaolM', 
        'VI4ZJfqRb6A', 'fAG3jt3k7H0', '89Mo4dC1lXI', 'fbivHweiPWg', 'D3lFz_giJ4s', 
        'kAW5yb6qzSs', 'hca9aiOsdto', 'ciCu9ChkyPE', 'VyP4RTPlS3o', 'y2dDXdG8_yU', 
        'lsh5TKo-agI', 'ps8vopZaouw', 'l7bd_w-IbLU', 'rtSrJtz4EDk', '9A0VWuaZeXA', 
        '274oIUNfFGc', 'TJEUq3iKbas', 'lJjhy4LzO4I', '6YuGycre0pk', '0tXtl2UGrQ0', 
        'aR3FKPjyN9k', 'USPjwV0YlYA', '-iaEnsGL0ks', 'xAFnrql49oU', 'NJ47-1CJYP4', 
        'PhC6dTP4aJc', '2D9ewpAAe2c', 'ZvsN2sPWXFU', 'fT_lvd8xPpw', 'QCyWYO4lvkU', 
        'Oqbcxk5n3Yg', '0dEjrRqk3wY', 'n5BaL5bzZsU', 'GtKu-Xi3QlA', 'V6aYlRB5k0c', 
        'bE42M7JxHd8', '2DtdFrpM4C0', 'RO4LNLy4ud8', 'RKt8aBAmgiE', '-eAZUkXoEDQ', 
        'HafN0c2ra5w', 'nci9aK4fboU', 'jXDa2YJAQ4s', '4gfObdeRNqI', 'msCT3pzdpkE', 
        'lb_-GT9ZLgU', 'UAdGa_yYdXw', 'XKiK7Wc4I3U', 'B5W9Guo_6a4', 'TmYKSqONCdM', 
        'HUsiUwHv71M', 'TT-S9py0VhY', 'Wrsr6cOpLc8', '7KEUcJIhiB0', '_e1HuFYETmk', 
        'XGB8gmhwWzU', 'YqcheaurrF0', 'IPI2zPSaddo', 'LcopdhhWjbM', 'J9jDB1nrXbk', 
        '5sVOFufOw1I', 'bfXwC1RHzVw', 'fIUiiBUrfOU', 'UJzU_Q8xo_U', 'fnjBflvo5B0', 
        '6vU1KNm9W9I', '6_FbZmjePBE', 'MC16yYL0qrw', 'HUmfghYpiTo', 'T2wUGJ7WbAY', 
        'HM3Hz1Zxrjk', 'h_fCf1FCSdg', 'uZXpd4l9Lxw', 'VCvad8Embk0', 'Nkg85jgmqKI', 
        'Ky96EO_hixs', 'Dew9g8fTd6I', 'd1EQoqZ2ehY', 'wXDk_Rkanbo', 'HLAsYlFuGEg', 
        'epB1B0QVjZs', 'P2K4ZmIrGbI', '00uLY0yCurE', 'VTUHhZU25-U', 'QRfR15SGesI', 
        'NfNgX8-62Hs', 'OPg_EqQgL50', 'epRb29YApLM', '8icA8_ZA4Tc', 'nVe0FnEZCTY', 
        'QFaIqalFcdo', '5daPd5DtuHg', 'fpf7Pzb_kiE', 'ADBNPozUDI0', 'dVIiKN33upk', 
        'tYPAxX8fdzQ', 'qP86F775hUA', 'ws55ifkzNGE', 'tY8o1TD_frk', 'jbR_ETkUUgI', 
        'Y6ir5F4y4-Y', 'oe3km-yPWVg', '8LYHpHpJ428', 'CVKZW6obgUw', 'hvhcrmDhSqg', 
        'w64Fks8cRPw', 'Z_agW5K8BiM', 'UdBzcfdGHLk', 'VXBBHI9wocg', 'DxlV1lYmq6Q', 
        'y0W64Oy79HY', 'BJyUEsNC-_s', '37cKEVu-Z-Y', '-2hvWP9Hulg', '06sNZc7OBi0', 
        '-F1B2Vs9w5M', 'Ktp9Q6tqP1s', 'kUzHS6rwcEI', 'KCI3qN_c3k0', 'xhvuBi9oe2s', 
        'tln_JDVERmw', 'GKlOQWXTZcw', 'rNEQuOMgLfI', 'x16rjEk4J2k', 'N2G8Z9Bx2N0', 
        'KqWPfb8ChS8', 'fZyW-T0w0X4', '4skzjtHLsNs', 'fi_hvM6R4hE', 'HWQGeGpT7aw', 
        'V4ufEYPrOWI', '-utCxwPuOvQ', 'RlJkXsKWFLg', 'cX5F8LQ84bU', 'EWoj6AeYGe4', 
        '4YWuTk_6c94', 'hnm_rZM8_oU', 'QJkuXjgv6XY', 'T843m6-nLgk', 'b4w7NFOv2rg', 
        'uq4v8tWmUfA', 'TJUxIwLTfsQ', 'IF6PT1UMEIM', 'n73Fd0CzsAk', 'b3dwgcK38dM', 
        '0pPTVakg5Hs', 'QWUnq-ULS6E', 'x-5yXc-qGo0', 'xbXzMEXD14M', 'LW5jKwdCnwY', 
        '8sejFUfH_eE', 'koWZkAMOIyU', '34WrcbCHsMU', 'zNxtIn0AcAs', 'gOmiPplVli4', 
        'l2-QNMWXWrY', 'rYJqg-ZE8SE', '4QdkGihjFoM', '48exO-I4Jkw', 'WX8e5XDxAzE', 
        'GuCYENZX9dg', 'hHLKw2SmWz0', '0vkBPMkeM34', 'PVrpB2ZHaqg', 'erGf0TgP4Ho', 
        'yU2Nq12FQJE', 'eqaGeqNZQJI', 'peZsODaB1vc', 'EJBsKnrjz5w', '4uvmXPZUf5Q', 
        '2lnFQWakxHM', 'xhsrMGdMSXA', 'LEJ-duQejeA', '8XA2lWhHPe4', 'PiRqVTtal0Y', 
        'uHp7YXWWksY', 'jrbDYxJj2hk', 'NwtZBRdr138', 'CyyKmoXBK2Q', 'QRa19qdlq0k', 
        'eeXyRBwqRzY', 'q0jCdoFMs1U', 'pMU0kaYIJ3M', 'JLqV4duuo-o', 'wOkF68KvsNs', 
        'cpxfRMs9fK4', 'ddg8qEuN_oM', 'lWZlDh-Cx4I', 'DFql04XctUg', 'rW91hAdDe4g', 
        'YJltYcnDogw', 'p8c9nadtkJE', 'Kz2BS8Nk3Ho', 'zVkP4Qd1S10', '5DL9pMJVLvc', 
        'oES8iN59_nE', 'shdzpc-qvJs', '-hHonDPzjdM', 'daoN4dozwq8', '2L2WdZlI7QE', 
        'I2EH-aYZ1vU', 'j-vA4ty_-sQ', 'lDJLEHzFJfo', '2QcJ8lwbtsE', '7lBSDaXj750', 
        'rjAJ1VDCO6E', 'd7e-7NwjjWc', '_Im8pND8dGk', '_ciw7VaKfac', 'bQRFXdX6Aho', 
        'Ch8WawV8Js0', '6_x-jUpib_M', 'YQkMXCGJlqw', 'MtH1Co4-snI', '9UzMLtLY8CE', 
        'IRy6mTzv2VE', '_-POsNoXJwY', '3gvv2UU2tgo', 'kFbPf03B700', 'KEyTl9RiZno', 
        'qTWdhI1bMJs', 'vowNp8mWovQ', 'jiZnJYJ0pAM', 'l3zNhIpRWZI', 'mszM6TkVWKg', 
        '5KnNqaLtXRM', 'Zd5fGGRZWaA', 'iUVpH20XKW8', 'rAqrj4Fse8k', 'h2gGsFRm90Q', 
        '-uIEdI4-ETU', 'WBOGNGP4row', '-0hd-x_4i1Y', 'LZKvwF6kQTc', 'E1ljQmmLx0Q', 
        'MUsKcXgjcw0', '5V7xeuh-J2w', 'ydwNXkmni1A', 'YOdDput1-pw', '6j7JDJvKMiM', 
        'xEzDg1Be8wE', 'pgZdn5xbR-A', 'L0mM6ouDCV0', 'rVeG1z6y1gk', 'dq912y_GK3o', 
        'P5FHXnFBGfs', 'HrD3aTIu-vg', 'zHS2O6YKbT4', 'm1g28gwYYl4', 'emJq5hYQtBk', 
        'cBO0_dhukb4', 'VHWSzzzs1co', '0m8vJvC39ec', 'R9G-jr4Uv3Y', '9AtpnFEQnGs', 
        'pvgScUhloHM', 'NcJ1Q49ce_E', 'SSKFQA6yJlg', '46wZBopt41E', 'LbSfG88dJJo', 
        '-xvdThoW9CE', 'qxUqHwU5sOo', 'clPnRGflATI', 'pRudjEmhWP0', 'FNi1l5zn_eA', 
        'EybjIqR_aD0', 'kKoduKyhwIM', '71Nu2m_zA_U', 'Zj9Q4XBX2_w', 'iO-cj4M-vsI', 
        'pVWa_8_68kA', '2DyfczmSP1I', 'llHTc2DmmpE', '1MwpsJdi7MM', '2C4zyDx0zR4', 
        '4qOqUQ8e78g', 'AKZGAUjFGHM', 'O2aq65azxpM', 'mbKOHjak9Xo', '8u-6ixGJYI4', 
        'Kbh--yAhjAE', 'GwPgYdRcWUQ', 'AN5_Zi0nLGU', 'olNhg2b_ClA', 'CDVYjRyw_aM', 
        '0BZOrtPsRJc', 'VNuiZgNAZ20', 'MCPy3T-PUcs', '2EVf8pYUOf0', 'v5_CXC8HVzI', 
        '_NJDasyDhIQ', 'BoUpKb8R9CM', 'cCDUODOIrqc', 'xuGZr7WWpkM', 'VdoFZ7BE5QY', 
        'r2Z3FJT8teg', 'x0SMymUchOM', 'OPBqkqcxsZM', 'k2mHKrpF6to', 'H8k1iK0dHZY', 
        'pEW3KcJ0m-0', 'FOuF12H3ftk', 'DuqjG3vWiUo', 'jud7FQLLrOU', 'okVcKc4wbn8', 
        'F9qjC5G9jj8', 'qQXdeb0H434', 'Wox-FfUpwCg', 'xOv6__Hk5mY', 'tOLBndyCqvg', 
        'rl5NXVGuX40', 'pXgQ5LRComU', 'OHmOH7x-n-M', 'CvuqT8hatVQ', 'k6Zzo1jzlRI', 
        'rDDfFT0vkN4', 'kM1a312lizk', 'h6z5eM-tjmg', 'krDW47ggmaM', 'fMlyH-A4wzg', 
        'UclCZ6Si7kY', 'ZFBdzKUp-JI', 'SrE38_6BuBc', 'IcQ8noPu8hQ', '1IHl20MeoII', 
        'fSvWKigYk_Y', 'G-0OOkpCe_Q', 'lg9GBTPnaXY', 'EIe03DLVvcU', 'sAoiF6jqPTQ', 
        'FhIN9flqqR4', 'L9X5QthJLRA', 'Su8Q_K7npE8', '7Q8dKX2wYY4', 'MM06Ax8W2ts', 
        'iqUdOY75tEk', 'kIZD_ejk3q8', 'w2Kz25t0JI8', '90BBDnH-ZWI', 'ebQMmao5tjw', 
        '8zj5ojdmiiI', 'KnSsOL-n9r0', 'TnkBcWakJCc', 'qOsgFrv7zrI', 'aZrHWYFHhuo', 
        'Pq2i8ToJD5w', 'DaDWBKABYmU', 'uJV0avAF_FU', '3BP2C4Zt07c', 'nxtzuzmwb7M', 
        '8846-5w-MlA', 'lZJyrZloD2Y', 'aSKUfgAdLqw', 'U52fJixWyro', '1r79uNY10_Y', 
        'pzrxRxJl6XE', 'MfLJk_rZJyw', 'zaAEriINEsg', 'Zy1rjdnjGg8', 'f9-DjRVuzgk', 
        '3N5pMZOsxb8', 'iUUI4JNgY8U', 'kw1Pk9L0qi4', 'aPtjHNYmBPs', 'C8jvm3WlnQ8', 
        '2GZyiXPAS3M', 'vVLl7sjo4p4', '5p7Toc0Y70Q', '4DfXGMnl0QA', 'px0HSx2mTTg', 
        'RMI5XPR0NAo', 'CPVqcnYOZPw', '5jZ_o03npqI', '1hAmBPNhaFs', 'Ym38LjJsE7Q', 
        '2vMgtp7T5lg', 'eaJXriSSzts', 'ffMi2Hz7ySI', 'tBvLeaU411w', 'FMAD7SvcHeA', 
        'CJhy0Vv45gw', '0cy7c3b0gCE', 'hNmgGtSTqb8', '10QvN2MOBVM', 'DJvFbnk8Ax8', 
        'Z8ahKRl4_N4', '5DojxsfqkHg', 'jPyx8LBB4ZI', 'Hzu15dgluSk', 'eb_z25dXna4', 
        'AwnEOyr2_uM', '16pmW7LGntU', 'AQ8FzsNIYFg', 'NdvQblg9Uqc', 'fSAplxG3fBA', 
        'RmvJE1BUpCo', 'XP1W7CTdwCs', 'QAFwc9zmZvU', 'u8QQuMJeJ24', '_uHMopThWDk', 
        'xNSV4gYiWZE', 'NnDIRVt9CIA', 'BzyS0G3zb3M', '8XsRCvIReiM', 'VgUHQUMjewY', 
        'MWaZVzM3xQs', 'vYYxov5T-VQ', 'ycotHxAZTLE', 'oVV-bZYTbLw', 'Pt7zZcikuYU', 
        'JmH8knykOJk', 'GgNzx4-OlCo', 'Ub00kefhUPs', '7UH54ia45GI', 'Po1MworiHuM', 
        'G2fejrK7bNw', 'kcLkrMn2JEQ', 'F6RDBxnCfkE', 'tkQ9Wq8suOA', 'j1DfXFCHLDI', 
        'JIxz6_VsmD4', 'Fgr4azpiWhg', 'MVPh2Ap7y7A', 'We4opYlYBjk', 'UlX9ShYyWWM', 
        '4A2QBKLgtzY', 'e2Up_I0DvP4', '6cR3fIOoRl4', 'MB3FLNrP2Rs', 'kQ77SVl2_io', 
        'o5-o2VvtC-k', 'J1SiPYj9SaU', 'PVAIZc4Km5w', 'lFj5f4SyJoA', 'BeKXR0AhzYE', 
        'UyqfPaIzdTY', 'iRkmanKLRlI', 'sKLUOzl4r10', 'C_r2bjOxdJo', '6P416vTZA6c', 
        '0ZBs517zZ8Y', 'LZAdidauMGM', 'kTiDwKd8zKo', 'AF3PjkjjcqI', '7UswGEcTf0M', 
        'LFA26Ln1IT4', 'IHWkNgnBlIY', 'ws473GuF8nw', 'XhzOaPIegWA', 'A7Lhy0gULK8', 
        '21SLE60O9Kk', 'pamtZb6qFy8', 'X9BESBcuEuU', 'Q3iQHu9kdA4', 'bvmPzew90Ps', 
        'y5LtVfddlCQ', 't-Y0k7impLM', 'V-NjGmD26tM', 'rK5T5gAhqpM', 'ix-3_rhX1U0', 
        'tEU77i0RjN4', 'kWTCtLNLAVU', 'qua_24HSUXY', 'w-bGMo4q-aA', 'DGe7YLb8ajU', 
        'LLeRvcagCZk', 'ofS7kNtjJE0', 'xzMuggG6FFQ', 'rFdvzmoosrA', '-o5Haxf9ML4', 
        'Xeo-eYYQjLM', 'SYGHbzWf4Xo', 'cd7QJOVJaMM', '8CpXOE68XsI', 'XJk_F3qY-PY', 
        'mzYK9wjPo6U', 'TM9sUxuurGM', 'GVIyqgiHHcA', '0GtIgQqqXag', 'gJtWYdiRQn0', 
        'Eo71MoWZhrE', '8VSeyHloWTs', 'ml37a4IkAlM', 'tCfbWYi8etA', 'KWTbHS-feGE', 
        'JHVkV_3cSXU', 'rJD7zAYVDTw', 'A8epJXSuTaU', 'e1ipn_71efU', 'YJXRh9TyLJc', 
        'J7wmUBV0jPQ', '9O4WqHxEG5U', 'CnguCqpT7tQ', 'ZPle9J71c0Q', 'BFIEgKKvpDA', 
        '2A0yuNtkfKc', 'pjZ81HpQg0o', '8cfag1t4eC0', 'E5ggT3z8Ky8', 'Lb6JcOW-GLA', 
        '40J7PemCGVk', 'QSU8OJgTn_w', '-1-st6GeReE', 'PYIeEnRyGgE', 'jDu7v6hCtqU', 
        'mDn7TPPXRgs', 'Jc_Bg_pkyvg', 'seDdM1b-BX4', '9mwYaUJRO1k', 'pHbvhRFWMtA', 
        'fgUZRlotIUg', 'T4KHTigQcyc', 'Ex1KL8Cs0W8', 'TVXD6M9OrhY', 'aoFpUw6An_o', 
        'GZTFThkEn8o', 'YngnmDIGRcM', 'MZgYLmU4afk', 'n8DPfVpFRgI', 'f11RQsqDpJ4', 
        'kmDPuQrcP9U', 'moy_QqkagXY', 'ZG4W4sqMS_U', 'H2wi5-dsjmo', 'nkoXRI8LDqA', 
        '3kxapD0c_NE', '4LYdhuheGbg', '00dFB0YuqCE', 'f6_mrr-dWSc', 't9PxREz1xgw', 
        'U59si105SaE', 'UlOBtPS_QIs', 'sNUm8jH4C0I', 'Gt6QvnlHT38', 'tXVyzQs_MgM', 
        'eLgp0Dn94Xo', 'yjeGLjdfvs0', 'f_4jJkAwkzo', 'wwo6bO_xR1w', 'hmpiXHdUvo0', 
        '_3IN6Oz1LgM', '9ej2arpC5iE', 'kxLkCB35PMo', 'oL6apdltDHM', 'dnxKi555Q3Q', 
        'C7J4bmTHQ2o', 'Y-nCu1Fm2PE', 'w5_7NJicg08', 'XiW5Mw48a8c', 'xikHcv_qc5Q', 
        'KMmo9QgUEFI', 'gPKHiltwhWQ', 'ljcmv6sP0ao', 'Kwz7RRBjXPs', 'rGExhEAPcfE', 
        'LShiEFHlHag', 'e2a-WwljCc0', '4ZWlAYMh6NE', 'zQTG2hQm_U0', 'UuXIyE3i8Tc', 
        '51-3V7pijHs', 'bdqXsVumpyA', '6c86J1Q7ojw', 'LG-QIVcZluM', 'UgBLlwZA6dE', 
        'Tzb-UpowFa4', 'j2Vd8cFo4Ks', 'LjAsGhsky-g', 'hy5tbwuwNhY', 'ZEXZkbBX-bg', 
        'VH2cQrekuaI', '0_6v_zxUmH4', 'pYm_ze-K3Dg', '5ng51pbmWdU', 'LT5HJnZq7Zk', 
        'mkc62fX-xa8', 'b_5RXIo2snI', 'c6hsGhcC_JQ', 'q2bJGPgfaRs', 'UKoUlOuGpBs', 
        'Rh5GS9rR0DQ', 'H9hY6RUCAg4', 'R7xSqdBF0WA', 'QUxnpqrU73o', 'P-74-6tMxSM', 
        'v-9AdxEWyPA', 'JVHDL_blBzg', 'urtxu9F7OFU', 'fyvEPGZdrnE', 'HFCok3JXAcU', 
        'jkfYTdHNtSE', '8dGmDzXo0fc', 'Fiej4LH3v44', 'ENQLQh_FaBw', 'ojf2fPyL960', 
        'mgaJfHYM3oo', 'nIfxus1E3N8', 'Z8N2EW76pKY', 'egjDpL7xMg8', 'skKXqAOcZPw', 
        'ReKQT87T7HA', 'DIp9KtrpjY0', 'jdHgG9hzJAY', 'jn3TDKgiMgg', 'zaehIBY4O2s', 
        'x-6MUyJj18U', '29t_lSxTxV4', 'gWQ4yAMJp2o', 'yEuj-kLKYLw', 'r-DZmRSxD3M', 
        'RztMxwAY_R0', 'nX_R_IVCIvc', '8fx72PnHxo8', 'czEXeuuC1Mo', 'WUQUHtzNsBI', 
        'pl7_5RTWXc0', 'zw3uR1hKZVw', 'wBlhZSfmFEM', 'BqcVd7kRBkg', 'olduesTSgjY', 
        '2mhhl0iQ9Nc', 'fq7z5HuXbXk', '6hjPlj3Qg0g', 'FQBbJLXJ_8Q', 'KwJaKOcI1c8', 
        'ifiB6He-l7o', 'riVSRlRCzVg', 'pItvVffhzSU', 'nRMwYj6c35s', 'Up9aslJLk8s', 
        '9aLs8W4i0L8', 'Ka11RKgAezA', 'B86gVR0pCYc', 'aoguuMPNFbE', 'i26TDcFuSvU', 
        '3dlGGBeJjI8', 'oiQ4F1LjukU', 'rIymY29IjEo', 'VtluwZ2eBcY', 'b_XJeTWyQ6U', 
        'dC1J9Q8aXt0', 'P6hwafesJgk', 'wvUCz8pCBy0', 'u4z-dUW5bcQ', '3ig6ZxYu-9Q', 
        'PqBbReB4WN8', 'K1YP9w5RLCc', 'g4XefYm5z1w', 'iKbP0a9th88', 'o2d3Hn2XEoQ', 
        '37QCQjMek2A', 'AGsQSovLXaU', 'cF49tSmIV-Y', 'tKfaSf4sA_w', 'D86rfe5iLlA', 
        'A0jMoedchf8', 'E_b9ctz2mhE', 'jLNPuWU2hmw', 'yG8zB__mYn0', 'GwWeOtD0-D0', 
        'PXxIhc1__kU', 'AwZXcTPVoL4', 'gq4qESnzwAM', 'QmYXtY7R2Yw', '5RbAs4pO81k', 
        'Pb4N3fZ2BK8', '6fidt256ZHE', '_HKxVYaYntg', 'uz8IEbdT4MA', '6zOpOhCc-gc', 
        '0l7xBqd0ubE', '6aZQP6lGTZw', '1K0f-LDVemU', 'CD9E0f_u8tY', 'U8QvKkyP2J8', 
        'KWpvlL7kXCY', 'GpsQ22aMrgM', 'G4r7QqVTPSw', 'hBODwySzbSc', '7o2qk2p6jLw', 
        'eLtbN6n1uOU', 'BdFcZw1Arvs', 'bjQOx45SDKE', 'nORKd4qZ7FA', 'iz4m82LhZy4', 
        'qJAzWUJsEAU', 'B3vMNB4Qlcw', 'q3iRSJswDbs', 'WZgNp-IQ1Ko', '3wfmH2J1kak', 
        'aLuZ30T2f90', 'Zdf74G06MOk', 'SUitSzpIa0Y', 'Yg-IDfHzsS0', 'NFKzsHhdHwo', 
        'mLBe-IoH71Y', 'Obv5Wq61A1c', 'HfDbNXjQ6SU', '9CVbGJLoB6A', 'SyPPsDViSK4', 
        '4rKQcF_vuJ4', 'JP8dt4GNFs4', '1mdO4ei9IrE', '6R1-DGwq82M', 'j8F36jTNtec', 
        'VmofpZIywec', 'QS8-xL11JPM', 'DxVUOiXPg8o', 'situetYOb7M', 'uPvyRun1YA8', 
        'o2QWoUB7mQY', 'YQO4RvCn8-Q', 'W_fbH7yk9Ok', 'Tdvq24761VE', 'tFWm0stZ_Hg', 
        'XEYi51RDBaw', 'ByRUnSUQOUY', 'hL6pe-ZuVQo', 'QoXzMbaKk-Y', '30ApEQDdNCQ', 
        'zO7d3Wjh5Qc', 'bfafFo1EtZQ', 'lxlrmDnoJNU', 'e4k0v048oeA', 'GWfJUkaICK4', 
        '11KW2VEzuzE', 'Nmq0BFmZkaw', 'XvwuMI9spiU', 'Qi2cRm8CPAs', 'GZ6jI-FLC0c', 
        'TMZZ3LDXLpk', 'YxCmyX3zeC8', 'XnKzIobyvsA', 'jaMv8lVYZCI', 'yvd_6P8govE', 
        'JpZ0Vdk0_I0', 'Z5nv3lrBy9c', 'k_64ulUy9Gg', '_El9zKydVu0', 'hPltDpdf-sI', 
        'RCSYSRQAay4', '3XVMXV-zFk4', '8SOtr_CFiIA', 't2gMKEi7-GM', 'lflcA578WVI', 
        'W7f-8BZ7Qhg', 'xGI7TBUodQE', '6n89-KZ-kPI', 'pg6xz8PMigc', '5XmcU_Ao-Zk', 
        'vGF8S2jYTKc', 'i2twDaVRRzQ', 'DHM7OmhoPLs', 'cyRSL11o7AA', 'VZSd0isLseE', 
        'oR6HaNREFuA', 'WAl8tFP8rAM', 'AgaoUx-wSjM', 'FYap-qcXckw', 'KrgTfahGV1M', 
        'gXd1DWNbZ-U', 'H_CykamrPgk', 'G7H4yaukVHg', 'qdpROXuKnSM', 'tsWvZWt8j6M', 
        'suLY5zVjv5A', '8qO-6ca4l14', 'xRO3cir0yoI', 'PR5NMlCukNE', '_kSg9SyeA8o', 
        '1Krw6UqNrl0', 'NrvgPi5Lk5Y', 'pUKFViH3rOE', 'eVf8TQQ864E', 'GKu6YujROMk', 
        'oE6zMRmIhag', '8AgHoEb3V80', 'wC3DZxDLWKM', 'Q9rR4m5La3M', 'J9V5GQ0L3oU', 
        'vDe5ikrAO1s', 'rkos3EX60rA', 'dQqlobEYMdw', 'aWOI_obDNvo', 'Nyr0yl--sSU', 
        '7Z-fhNyUB4Y', 'mHXeI4Z24GQ', '1kPmwQDLxao', 'TNI-h3T8aYk', 'vopXPFuEtCI', 
        'SBc9_ecHZZI', '8aMdavYApLc', 'tKEfPvskEls', 'vRS7hrt6Cro', 'uL3fIdm8mBY', 
        'UM-XcJ210iI', 'rGL3j54WZPM', 'J244DdHJhSA', 'SgRQbNE1sss', 'G90DW7DxnQI', 
        '5_OuDg1mlrc', 'HWazCFFFuN4', '3gc0dLi2BFk', 'Y4fmTWmWTo8', 'tNRaUTrbr0k', 
        'I7p0D5VbNek', 'kParLO8BNlI', 'QTA-qFlyI_Q', 'gvigKROTZlM', 'YlG0uXexWKc', 
        'xvBodEJ6zXY', 'YK4bsATBz6Y', '1QS_zeKQn-8', 'uTXSW2oJn50', 'zFY9bRyStQY', 
        'lYnzTCxg4-o', '1yKLpvNUl40', 'ixcC9PlbsiA', 'fBnRnvGplG0', 'xyCfM3yrWIU', 
        'SetBbiyApt0', 'UO2-yJMOhG4', 'tTMoRhJ1BWw', 'hJ1QjR7Al-c', 'ZYOMEqYmPXs', 
        '9VqrCxoYzzc', 'ZjUHh8E8YlE', 'eXtGxCSmQBs', '-CMzWu7G-FM', 'ELyPOtXah3o', 
        'R4Br8sRtLRw', 'ZdhoYkY8mtI', 'c_es6Q5S9Uo', 'mKl0W-x40Z0', '9RELwUOas8M', 
        'suVJ7cRHaqM', 'LbPMu8wPvgw', 'daAbM6xrKQI', 'jM8d6me8oPc', 'xpI_YF5tCTo', 
        'zV_WLN69JrQ', 'at76aaDJznM', 'roafzgBzOiY', 'INSsfEyFFZ0', 'F4KYotEEx5Y', 
        'bkpFrasV6hU', 'Clpw-0kUV0w', 'eGQjWEh02Mc', 'yUJRuo6am84', 'tJvkHYs3Oi8', 
        '9zPWPkal7HI', 'AdNkLzmxUUM', 'fbOWvQim-tE', 'wb-JNno2XqM', '9VvCPSoCXuM', 
        'gu5n_mkKtkA', 'eZlmYP3opKk', 'psgxTLFe5g0', 'seg2KlCYUB8', '0NrlXlifzi4', 
        'hTSxmJcmDPw', '9709WNoZsyQ', 'Nv-ui3dbvNw', 'vu_YmBBUPu4', 'h_Zh4mgC4a4', 
        'AGHZtKDPxTA', 'z0k5tkb2XxM', 'pUIkmFhbLg4', 'uxlShpAqLUY', '3awVY8HTJlc', 
        '6RAWUAr9xYI', 'c1gEoFxUkjE', 'TtPzIPZ7DyQ', '3FSDSa1imYc', 'JxXDPfan4KI', 
        'dejw0ib109w', 'MSUv3xh_e6Q', 'xJ7LlG-5NlI', 'F9JZoB-6WX8', '2CUphWZfMTg', 
        'b4Iu913AwSk', 'B6t1bjUFLtg', 'FwOZKMFZF7M', '8f1GEnys9Lk', 'JtLn9MT2LPA', 
        '6v3n7CgKeOc', '5SCkhxcW1C8', '5caisnYauWQ', 'E45WKTIsAS8', 'M_5AsAp0BtI', 
        'KhnDRmD_fXw', 'YLPPrl-PDXk', 'XM6JnBPfblw', 'bqkIsFs-SnE', 'Iregj-unkO4', 
        'l83qrIlOScg', 'pTog9N-S12E', 'NMr6Qw41vu4', 'PcfnD-AI7dA', 'APrASa0Y1zs', 
        '3SYrLTMVULk', 'Ros3xGkGrms', 'uUgN9c0bpO0', 'saVk53EX3lc', '34ckMOOmmYI', 
        'af30SGxJ6cE', 'ew8IYuoJfPY', 'B8ETwPwF_4k', 'CHGCAF2xfyc', 'rjNcV1BhYlI', 
        'dIYLtbO8MyA', 'GCjVeCj7sXQ', 'AVG9LUI15vU', '7lPtOEO76HE', 'HNX-_Gm91Vk', 
        'ftwOWvkRd7I', 'a3cAY8WDQlk', 'fBbq6mpHHO4', 'aUJql1QZy34', 'FbWhCvrHMSU', 
        'VlwRtqSBacs', '4zC0uspfdPo', 'rc28M8mRpQs', 'UEo10mkzTm4', '0EqAmznqoNE', 
        'KyyujuaD64Y', 'MCPcPK_Go10', 'gEuX3qoEU6E', 'ltvUSoxhnPo', 'TOqrDeAxWww', 
        'pw9xgYqrmaw', '4oatMkIMqzE', 'XSzf58x6d1I', 'L7C2484q5C8', 'sdZsNEPoRCQ', 
        'j4TQFRvfkYU', 'J56_yZaiiJo', 'pEmuL2Ulne0', '04YdPpsgyeE', 'ZEt5o6XSXLg', 
        'qHmSb8Slw4A', 'uhcuWKxCEYs', 'bnIs_a2lhds', 'LIXyPAD8zmE', '7tWmvx0k_AM', 
        '-39jfFM67ZQ', 'q74eMAyWx2I', 'X8sWqTOlO64', '6yIW-0tZ_W8', 'Nz75Z_kApbM', 
        '8yL988C-3hU', '7bdifacpVWE', '1EpwygDdDJo', 'vO5vxjpZJKE', 'zXvjFluPVSA', 
        'Ko7npzAFZdw', 'zWVfGxCe5rY', 'Eb_FQ-mQHdE', 'oCoyH6--XV4', 'XeHzAuSfZjY', 
        '6W7IoFhjJGU', 'RAXkHFPgwCU', 'qPvijLdNNkc', 'QK6xyvmgor4', '5nED0Ie4el8', 
        'KuiLO-aFTCE', 'JtC96jzO_PU', 'qZWV2ZuojK8', 'Bv7q7CyzD-8', 'RNrj4zw0wRc', 
        'bXSvCR9KJSY', 'Aqdl8L7HJys', 'PWMDJ0FzCVg', 'TaFg50TpW_8', 'd-h58LdyYGw', 
        'lOcB9yUA02Q', '29Y4RF5mCT4', '6z05v9s6Anw', 'zTNQj_Lv1Dk', 'GTgk1M27RuA', 
        'esysVJYTR4o', '0MtzWtuXI-4', 'zXKeMjrPzao', 'JAXzgT4IGk4', 'bnxwpBG0N5U', 
        'avtnBUFlhLU', 'JyuWJ9X1R9M', 'vurwijULdWI', 'sUEBaSEGJm0', 'AwTums_U6rA', 
        'XB_0cAxb8iw', 'jdIigy2pgx0', 'PSrqnHhMcFg', 'xIndzQFNIss', 'EGg2IY10nxk', 
        'dolGNAP5zqM', 'CG_rVGiVWlQ', 'sjCsp5xyAY4', 'oT4RHEFC_28', 'ujJ3RFwXIeE', 
        '3ikaxgKRcj8', 't3RIjhXtELA', '08Wk5kVtZeM', 'W8lioIFmtBg', '2qYOrZzXdJc', 
        'ajqrH_JlU3Q', 'TbMDN5F-sjQ', 'pv56AxiL7w8', 'ncATlYjUPpE', 'U8cTMDMkhKo', 
        'dHR3OWiW3_Y', '1b589LF9auk', '1j_tJcueDGU', 'US_FjsZ1ACs', 'mg6m4YDtv2s', 
        'Zk09lmHj2_o', 'TzCrAfeo00g', 'jnccAg2HKcI', 'h6IfC61JjQ0', 'Wwxh_k_msHo', 
        'g12U_Z8YxRo', 'brtUzP99jBY', '5SNzURrH6ig', 'kioN2tysfYE', 'W3lQ7wuSJ_8', 
        'JoryFhVMPhQ', '4Wa4AewIIEo', '-6XghQmj4JY', 'M8pzNleZSGM', '5U6fXTdSnuQ', 
        'isWBPSSuyrU', '7okzNsgeNMo', 'DykBTo-cmjg', 'JrVXJaD9hzo', 'JwZ0WmuOn3U', 
        'a_ZECXGBPBA', 'cTdpmnG_vIY', '96vD8_vCt7Q', 'YRzEWIGzaTo', 'fpZoGB_d0bA', 
        'rgdIEHUKYiM', 'D6Z0460gUW0', 'WasZsxO1ENM', 'hdIXMDz6Cds', 'wXLGk6dvcdE', 
        'JQ1xBFml1oE', 'dyg80S_11us', 'qKAEUZ6jATY', 'xeEAZvN0fm0', 'RvMxEDl-pFQ', 
        'x_7gF3aSoPQ', 's9C7p6kAMvM', 'NnQ6vEY-V_8', 'VX52hawFek4', '_iPzBxWRvdw', 
        'ZIbIq5lGyUc', 'VAhjlCALBOU', 'w0LEpDBRjrk', 'jdwcsFvFhMM', 'ygkdvLbj-2Q', 
        'CcbvDqykdDA', '0U8UF8Pbvxg', 'oJszJ0xBw7M', 'FtxApXpOqWE', '2Osf5Mdfvys', 
        'Yu1Lww_EyMI', 'TBn1xDzyXII', '8-Izv4WdN9Q', 'SLcnFf_Ryf0', 'JTfbgUV4e2M', 
        'DnuJlrH6N7c', 'buAAQmjAs5w', 'czWqLTPzFQI', 'X-cUnHjPukk', 'ntYiQLAijZw', 
        'IduuGNDGJnE', 'e9xxcs8tJCM', '6Rg2XhZQZIs', 'uuOzPawobSU', 'm6mhwImq2WE', 
        '9rZxrZqm3u8', 'y7BjNGtbTUM', 'PMLkkAGDrt8', '-ZbapCHiBNQ', 'zR-wColHabo', 
        'WiqEZ31wIC4', '0SFDXDHTHN0', 'XPKwFAtggmU', '_NACWM05SjI', 'rqywiy80HrM', 
        'IyKu7yHJxCc', 'CQdzU6kEDZE', 'Us3lXD_-TBA', 'eyFkUm29gWs', 'ReOYumfFDiU', 
        't9vjGdOmgco', 'c06o4SjpFac', 'eAl2q4EeW5c', 'AOihd6c_Tqg', 'JGaq3czhpPk', 
        'E4LbuMI8258', 'P5L7DpqvxkY', 'LODT2BL5y3M', 'nziQ0nc3328', 'vBzkoMmtw8Y', 
        'ScdK5oBiso0', 'T8mskBXMqU8', '1iMxRFoqHLo', '8p9lstQWq2c', 'oChS3wzr-x4', 
        'RyWQJPpKeCg', 'oXFFAfO0Zfc', '4uSIr9V68Hg', 'D183X-H9kz0', '62THSzhp4q4', 
        'kVSQ1od547o', '0mAvc_sSGgk', 'e9Oc0uyPbXk', 'HCiIV9ai0lU', 'EY8fi4t6Bug', 
        '2-C3_81dMMQ', 'TV3MuztVoF8', 'nN8Wbbnbjsk', 'MAxjjupPYrM', '8QabPo-PD-Q', 
        'XaCgfY4G1TE', 'fN9O3Xrn7Vo', 'yUMtZyu1W1M', 'EBkxFzTYjT8', 'b0eFzB5O4iA', 
        'wizEP-oUNOU', 'YJEFspsbaDg', '61XFAUGLddQ', 'xnzAYEuzY5Y', 'YY8jEjZFSH0', 
        '6WBsnHFS-AU', 'EGyt1OIj0eM', '-a3MVwS9cXc', 'gbL8bFknjCY', 'kk102qMlEmQ', 
        '2liVb-WGv18', 'eJOw9aVIhiE', 'ZJhRbtv6ZgM', 'UuUXJGoG8e0', 'LITMa_ACjg0', 
        'AljcdhUjbzk', 'mLUsAkwczH8', 'riMPzU5BsXw', 'wMioodqaNWw', '4niNMVoR2jU', 
        'vzivDGTjT-4', 'cJpv3faf17U', 'oxxZBtUFSrw', '-wSfogxHi3U', 'Q-3FZ59ukZQ', 
        'Gq5i9FO9iYg', '5EVxgLGKQx8', '2aM5Cjc_IRc', 'cHAnGILqqHg', 
        's1g_x15beoM', 'YzyFk5Xr338', 'quPojxPnOG4', 'KLLw23jTsZw', '5zW0kklYDd4', 
        'UcWEfvu6F_s', 'MQB5JMOW6XA', 'R2D3k2yaewo', 'rDxaowI7JaE', 'ATKvaB9jo3I', 
        'EeBJ86Ib1cg', 'f5JTWF-LQf8', '6rqcddw5-q4', 'VfS4HBn-21s', '15_tsyKc5-c', 
        'pyUgwjFEtUQ', 'Rd39nTWnNmI', 'gbRId8ADKsA', 'w7hWRx5iUoI', 'dfIa4FGXELQ', 
        'a4YamlO8YUo', 'TVUCOP8k7aE', 'cP1zcJrkbYM', '47N2JIXg2FU', 'XjgpUTxKdUs', 
        '8W1bZ0h-wDk', 'fM94jNLwblU', 'JUqXSVfoTSU', 'Er5FTsZwUyo', '-SaFSZu8L7g', 
        'Av11EkgQ7ms', 'h0oahkr7dBk', 'fBpVo5p0QAY', '00x5hBxQ06A', 'dFRukOJFWFs', 
        '9qihgfEZF58', 'tz_UwgOi0mk', 'zFnPX0eixWc', 'GOBr4oWq1tQ', 'dOrmvYNzJNc', 
        'E4nJcsxhCkg', 'iwe3B6a-2cc', 'YO9o8Evkx3k', 'G7bLIuyitvU', 'WWYq-5tHIsA', 
        'Yz8QVffoiTU', '1PnHFxYnblA', 'tuY084gN7fA', 'kzaY74eviaM', '7Yb4Prp5IVA', 
        'V3XzHTel6EQ', 'ee9LfX4P9Us', 'KI_tgyDMVpc', 'd0kXgwre-Xs', 'ETpX2HK8XaE', 
        '9eZWGqK1T9c', '81_T_mWAzOI', 'nyMXI4Izgh4', 'a4Sy3ucTTto', 'MxDe4bM3oeg', 
        'Hv_700W27V4', 'CCwYXIe-LJw', 'I9lujnnRIk4', 'Kylmp3aQHEA', 'IYRh6wPCw1E', 
        'r7H_9PjsWcU', 'bhLx_dNvQR8', '7yMA3ek3c2Q', 'nHZI8dI-jjc', 'NA6SMVuNWrQ', 
        'rNH3nec_j2E', 'nGJzlPwEV1Y', 'J68fJRRujwE', 'WTN-RRqgmJ0', 'SDYftFtpPQg', 
        'wUimn_UZCLU', 'RVKYzLij8lU', 'gvI4y82GPBE', 'eE8KuTbO-q8', 'CzTBXAlid8s', 
        '1f5vdUwJNaE', '03_Ky67a8CI', 'uCTx8b7r7fE', 'icyYMD0Fs4Q', 'zQxwLxS_YOw', 
        'vOgBxn_PZFc', 'C_zvTrtj0fk', 'BQ3pKsLi2kk', 'pvbFxxMg8jw', 'W-CaIQ0QECU', 
        '9kz3q41rSZY', 'DRS1oLHFB4Q', '6S6yC5EuVfs', 'sQOIU-tO3SA', 'WXgQf_XHKXc', 
        'UE5Zm45eqWc', '34bpqW3Ipz4', 'otlBgx8ksGo', 'A0gP971wvY4', 'ZVDhb-ush24', 
        'qLeYLm8im5g', 'NJMK-9gCMdo', 'BG5bJRa3sBQ', 'S2LlzOQlBFk', 'L48ZimFM-6U', 
        '-Ji_rJnKB_c', 'psNE9XUiTjU', 'vOGR8oT0dD4', 'yxOyt5_lmaY', 'E9KcmhwjFwg', 
        'WAKYTaBM0BU', '3TTZeLN1nnc', '6Be8Uvdc1A8', 'Z0XCugg8WSc', 'sqGlZvrmWtA', 
        '_D4d9oRGrlY', 't4Rh3cmIGao', 'Iswb5lEX_QM', '1fv44ho6UxU', '-l24u_d_OJk', 
        'i1mkfHnyVhY', 'B3qbUTzG0Ak', 'aAX_p13Idwo', 'Xlsp19llwJM', 'PudSOYRO76E', 
        '32QDVtc8yaI', 'VzmvNleHcvE', 'vruUrZl_xt0', 'j-2Tb-q_lgw', 'hRI6Y36kffQ', 
        'rzIAgwNn6SQ', 'BCgbBfTDEOU', 'fV0d0CLFj9Q', 'IFldyh7IPiw', 'QKE_flf1RQk', 
        '4vfIqydNC4o', 'sQdwuYVyG4k', 'mOy--c3W9to', '3j3buH5jukE', '2jJMEAfSZa0', 
        'YIgowrg8jIg', '4VF_zZnfsPo', 'N9rJxn7OpIg', 'HhUSUhhwWGE', 'bgvUTnfZav4', 
        'T32OK3R60t4', '7Z-YposXHIU', 'H2n_goCa0bE', 'IpXuQdPhj7Q', 'YdHLg9XiYUY', 
        'ruKEx0lqhxc', '5R3U-8S1qfk', '1zop4XR66-w', 'crF8R6qiBp0', 'Otqd1tuYitk', 
        'XDI7UYfyMQA', 'VQJKXVy67K0', 'WNV7TqlgwAo', 'v7pVBAebzkw', 'khnsjOmPZ4A', 
        'zNdkgTPF2cc', 'BB7tnLs3LBY', '5dzG2208-AU', 'ws1g8m2ASwc', 'uaDxrvzuelk', 
        'rd521RNIpwE', 'khQ2RENULtY', 'dsKVA9n2uhA', 'ZCPGpu30OLM', 'ei5gggNr5B8', 
        'L6cFarUExQc', 'jVH4lQDOQrM', 'PPDDOoByMHA', 'CtOEDEPD_lw', 'HNy41EFCJcs', 
        'R-SkTXHlvME', 'QM7wlr4rcek', '9Bl8lqIzo0w', 'azxIUnRmK3c', 'qjMSGIfB1j8', 
        '9F0mAiipcwM', 'nCkbvLtMmks', 'i3D4C4QIVkA', 'ywm77POHDf8', '5ElC2IWkfIM', 
        'QBdeFNVilrE', 'zqVTe3bZmvA', 'leP8DEWLkZc', 'k62xV4XNpEc', 'vM3jTjZ20Wo', 
        '4RTKcnMQUtA', '7nER8VC0Dos', 'bYp40CBJl5s', 't-JpDQ7WcWA', '-OVKlnY_WNU', 
        '8LLh1VCfT6U', 'is0SQqGDyTI', 'tUkyQWWV4bk', 'PZIz3-1AmKg', 'q44hThFjiuA', 
        'sb2laNtuK18', 'umsfEMINMPM', 'evszo_wT7Gs', 'vG328QYUELk', 'I3_FaKKyKPg', 
        'CGEPRtZrhMo', '-pXQTGMJ8IU', 'EB4eCWHcZSI', 'kv6VeRIA0ec', 'xGwDTv9BhKY', 
        'HseRUhNQNxg', 'iZu6jvCAxvc', 'N9KEdZSnj2A', 'HF9h1TuszeY', 'dbIMY5ny5K0', 
        'iuVKHJkeymg', 'je_zdhlSIrk', 'Lbohqhuo28s', '_dvqAgTDILc', 'mK_heq8qCLg', 
        'goivWp1ZMmg', 'v75DGFLKzVk', 'vS-CNKykzfQ', '8-5X4R93Z5s', 's2pTc51DHSc', 
        'J9JIHwuLOis', 'Eur6c6fvYg8', 'dkTGmwSd_7U', '5zNgHnbxeYo', 'VRs5ZBH2YzM', 
        '05TCevz9MTY', 'm5OqpwJo4ec', 'ZDgyfqricXs', 'WKwYHj-csjg', 'XCUfT_47ADg', 
        '6KoIxt4oGlU', 'EViMTVxc_0A', 'M2fCeZRd_Dk', 'lYP7Ibvy_uk', 'HfXGbqZ2_hg', 
        'BWN3KQNV2QQ', '4C6GaF7z6rU', 'YuOIP-SNLV4', 'OoQfdv012KA', 'IQDvxuPiVsk', 
        'FXGGA7udd1c', 'Qh-TzqXpkrs', '3oJU8Nu1vGc', 'gDtRncb2DWE', '_BfKBvY9bMs', 
        'LHQ9rBDE7QA', '6q1-BA_ZgcU', '1-iOGZ762kY', 'c7qAHxBt-z4', 'nJEdf5DBAOY', 
        'wcUoOaBuYJI', 'CHMEBotLjas', 'rMH45OMIjBE', 'jf3FaRGJdR4', 'O1eOOmeSLPE', 
        '2QuEvkJMIow', 'azF7fA79Rls', 'KS2IJmFpokM', 'OO74kqi5PGE', 'mPRfAefDTl0', 
        'IChBReXQjkc', 'lk7wtCxOME4', 'Ee7cb8alwy8', 'j1sUqmZOM8A', '1nNdPl6O5Sc', 
        'C9JLDJDrykc', '_q9xg1eW_9E', 'hrN0jz16aBw', '8NXGzWPGOwk', 'sxMsnOTfM_w', 
        'Yc0_NKnjqJA', '1IWqURONwoA', 'tmbDxbFnyvI', 'gg-IH38V3rE', 'DD41jYFPAsE', 
        'WmJv-I0RF2o', 'BSOSaubwmEY', 'P_dEU80pPQo', 'v07XFgbH-AA', 'zm4ylBloB8c', 
        '8bGNGbF36wY', 'UZyhw7bYmrw', 'EW6l4oJSlJ0', '8pamveVxYYk', 'Wki4rJ9pBbc', 
        'pWTTUugASJ8', 'zmogyh_t_II', 'oE6JwOqvscc', 'mId2SKcpGtY', 'H3mOAB3ptus', 
        '0E_xFepFp3U', 'kqDLnfDOa6s', 'xjCXya-IfT8', 'iRX332y5YKE', 'DIj0oPB5XmE', 
        '89m6pBct3DQ', 'Tr_vcq7kVng', 'qMgjT6ZIT9M', 'ksH4p2h6XYY', 'moDJiGgIt-I', 
        '8GlRnyKR_jo', 'cd8Lbf0PnaQ', 'QigK_Cf3vhM', 'H1TAEeO5YlE', 'if_AdrLU7h4', 
        '9m259jYJClU', 'EIwW76OyJ3U', '9hg4YU0hiBs', 'SMhWV33sjjQ', 'kv5ddBfEyPg', 
        '-Fv4N9beaoA', 'eOlM0yAwwjc', '6T8aIuNb3ks', '8SdNqJ0M6kE', 'jpLGPTvq9K0', 
        'oCz2e48avLM', 'rkffxLtRe3I', 'SI1PzCvyImo', 'W5bn7sj2AWg', 'Xe6InUyxabM', 
        'pH7qXILrnTs', 'W5rH86cWhkg', '6Ns3Y7whX68', 'QNkM8K0e3hQ', 'b8k60cVvszM', 
        'M4Mgx6do0kM', 'CLngXGkzslg', 'vD2eFk10dPw', 'O0Tr8kjBJlk', 'CNVkvHUhDqA', 
        's2hrEFkU3_c', 'sfs3TpxEuhI', 'zfEaYbWoxko', 'NFtxy0Qz980', '36JrsH1yaMY', 
        'Yg0vMQzAPoQ', 'VqTnq2u5ZQ4', 'C9Pp6-8s8Nc', 'eOGZvmEIymg', 'LReGw4kwbmA', 
        'VnqbnzxdOxI', '1_BIp7uvLsQ', 'wuqNn2UZ2os', 'lmjX_M_SObk', 'FsiMzu0-1PM', 
        '-Fkvp8jKux0', '2vHp74mrXAk', 'Ho07BPxvy7U', 'uX2sgJXY3_U', 'eDasI4SAugI', 
        'pFe1XHea5LI', 'Z8WAgphj2oc', '1pOFPExPDCY', 'nF0qxXx8r5Q', 'FjtN7ppnp4w', 
        'YbC4ahMRv4k', 'EWkqvY8iK5c', 'dft1-gkkXZQ', 'ZgR1aEGdEao', 'ksqDc3I83k4', 
        'jKvCfHPFV0w', 'aLF6DlxMr4g', '-FMRWINfzTY', 'X_OO6h5zqe8', 'i_nNeeRs8ig', 
        'j1SowyZKj1U', '8eYgvMalgM4', 'gfzb3lcZjRg', 'K2R4b0gP2mw', 'pzWiY14cPK4', 
        'Jj_hCagVn2o', 'K0RJ4s786WU', '306fj13ywKE', 'XUV95IKPK50', 'WFuUJJVfUMQ', 
        'YX6y9tGG_BU', '9A_eefDCbPA', 'jCL5_b4Ke48', 'ZG48c0pWNoA', 'mqXy8PoGJ1w', 
        'Yxalrx1EYfE', '1uI4J61i2Ts', '8mK_remhVlM', 'NiLHHg5S6ZI', 'gdwZ_7sdoXM', 
        'xe_eBbauWOk', 'sC0p-JJdwSo', 'KSL6_SMYPH0', 'nby0WKiFVIc', '6w7klo7AMgM', 
        'bi0tcrwJvCc', 'H6RqJRCWPT4', 'i8tG8AriwVM', 'EcFwPXcGfqU', 'lnZYwgqU2pc', 
        'L4yEVy3mT2g', 'P4ApYxP0kos', 'WLGzdCndIlE', 'wtT8_8ig8F0', 'EdGwI4J5pDw', 
        '9HjrPsCmjKw', 'zcUz-skZjdQ', 'fbk5bwNCIng', 'ZSaTQSpjxKc', 'M-f9FAIEcNM', 
        '0byb_Suv854', 'FLJN0xZ-CxA', 'WynfCEiXEkM', 'tyaN9cR7tKY', 'P65-ylKRd6Q', 
        '49shDqjfCH0', 'h8kXWB9rSm0', '6xhrfOdd200', 'wVnvYKLfjlg', '-EZDyHlMrc8', 
        'i94NkhIaIck', 'aopznAD6m9w', 'DGd2rZu2AQc', 'MzBkG_nfpHU', 'ZBBX09K9MQg', 
        'DJbAWDPLGsA', 'VL9R3uvkagM', 'dmc4ibkcHYY', 'RBkvds0qOiI', 'R2OtimCmtDE', 
        '0z9dheefCoU', 'LruQapGkZSI', 'QkdjSDXTrQk', '8E_Y82H3550', 'G9CXps_mhd4', 
        'qvEZODh3Zyw', 'bh-n0Q0nxO0', '7bJV6JDv8KM', 'MjfEJChi3B4', 'D5vvcRaZYOU', 
        'lLJ839ozNIY', 'Bau5wK5iWz8', 'wFSh-KAbun8', 'eyDqltDIyeA', 'KvbHTMO1ROA', 
        '36xzdQsb3IY', 'jXveNm55i_w', 'Emx4Y-B1VF8', '_8ODBL8mW3k', 'yiFwLzrY388', 
        'LCohCDs7OyI', 'aPdwM-sRzg8', '8ebEJCqmneM', 'Ul0qKMU1Jpo', '-HF3E9gr-os', 
        'Fn6UUME4LxU', 'RSbCNBrXvTs', 'GYRSVgWwJ10', 'u4yRckWcFNg', 'QasKjOyz1Ww', 
        'B3sf0kXaolM', 'VI4ZJfqRb6A', 'fAG3jt3k7H0', '89Mo4dC1lXI', 'fbivHweiPWg', 
        'D3lFz_giJ4s', 'kAW5yb6qzSs', 'hca9aiOsdto', 'ciCu9ChkyPE', 'VyP4RTPlS3o', 
        'y2dDXdG8_yU', 'lsh5TKo-agI', 'ps8vopZaouw', 'l7bd_w-IbLU', 'rtSrJtz4EDk', 
        '9A0VWuaZeXA', '274oIUNfFGc', 'TJEUq3iKbas', 'lJjhy4LzO4I', '6YuGycre0pk', 
        '0tXtl2UGrQ0', 'aR3FKPjyN9k', 'USPjwV0YlYA', '-iaEnsGL0ks', 'xAFnrql49oU', 
        'NJ47-1CJYP4', 'PhC6dTP4aJc', '2D9ewpAAe2c', 'ZvsN2sPWXFU', 'fT_lvd8xPpw', 
        'QCyWYO4lvkU', 'Oqbcxk5n3Yg', '0dEjrRqk3wY', 'n5BaL5bzZsU', 'GtKu-Xi3QlA', 
        'V6aYlRB5k0c', 'bE42M7JxHd8', '2DtdFrpM4C0', 'RO4LNLy4ud8', 'RKt8aBAmgiE', 
        '-eAZUkXoEDQ', 'HafN0c2ra5w', 'nci9aK4fboU', 'jXDa2YJAQ4s', '4gfObdeRNqI', 
        'msCT3pzdpkE', 'lb_-GT9ZLgU', 'UAdGa_yYdXw', 'XKiK7Wc4I3U', 'B5W9Guo_6a4', 
        'TmYKSqONCdM', 'HUsiUwHv71M', 'TT-S9py0VhY', 'Wrsr6cOpLc8', '7KEUcJIhiB0', 
        '_e1HuFYETmk', 'XGB8gmhwWzU', 'YqcheaurrF0', 'IPI2zPSaddo', 'LcopdhhWjbM', 
        'J9jDB1nrXbk', '5sVOFufOw1I', 'bfXwC1RHzVw', 'fIUiiBUrfOU', 'UJzU_Q8xo_U', 
        'fnjBflvo5B0', '6vU1KNm9W9I', '6_FbZmjePBE', 'MC16yYL0qrw', 'HUmfghYpiTo', 
        'T2wUGJ7WbAY', 'HM3Hz1Zxrjk', 'h_fCf1FCSdg', 'uZXpd4l9Lxw', 'VCvad8Embk0', 
        'Nkg85jgmqKI', 'Ky96EO_hixs', 'Dew9g8fTd6I', 'd1EQoqZ2ehY', 'wXDk_Rkanbo', 
        'HLAsYlFuGEg', 'epB1B0QVjZs', 'P2K4ZmIrGbI', '00uLY0yCurE', 'VTUHhZU25-U', 
        'QRfR15SGesI', 'NfNgX8-62Hs', 'OPg_EqQgL50', 'epRb29YApLM', '8icA8_ZA4Tc', 
        'nVe0FnEZCTY', 'QFaIqalFcdo', '5daPd5DtuHg', 'fpf7Pzb_kiE', 'ADBNPozUDI0', 
        'dVIiKN33upk', 'tYPAxX8fdzQ', 'qP86F775hUA', 'ws55ifkzNGE', 'tY8o1TD_frk', 
        'jbR_ETkUUgI', 'Y6ir5F4y4-Y', 'oe3km-yPWVg', '8LYHpHpJ428', 'CVKZW6obgUw', 
        'hvhcrmDhSqg', 'w64Fks8cRPw', 'Z_agW5K8BiM', 'UdBzcfdGHLk', 'VXBBHI9wocg', 
        'DxlV1lYmq6Q', 'y0W64Oy79HY', 'BJyUEsNC-_s', '37cKEVu-Z-Y', '-2hvWP9Hulg', 
        '06sNZc7OBi0', '-F1B2Vs9w5M', 'Ktp9Q6tqP1s', 'kUzHS6rwcEI', 'KCI3qN_c3k0', 
        'xhvuBi9oe2s', 'tln_JDVERmw', 'GKlOQWXTZcw', 'rNEQuOMgLfI', 'x16rjEk4J2k', 
        'N2G8Z9Bx2N0', 'KqWPfb8ChS8', 'fZyW-T0w0X4', '4skzjtHLsNs', 'fi_hvM6R4hE', 
        'HWQGeGpT7aw', 'V4ufEYPrOWI', '-utCxwPuOvQ', 'RlJkXsKWFLg', 'cX5F8LQ84bU', 
        'EWoj6AeYGe4', '4YWuTk_6c94', 'hnm_rZM8_oU', 'QJkuXjgv6XY', 'T843m6-nLgk', 
        'b4w7NFOv2rg', 'uq4v8tWmUfA', 'TJUxIwLTfsQ', 'IF6PT1UMEIM', 'n73Fd0CzsAk', 
        'b3dwgcK38dM', '0pPTVakg5Hs', 'QWUnq-ULS6E', 'x-5yXc-qGo0', 'xbXzMEXD14M', 
        'LW5jKwdCnwY', '8sejFUfH_eE', 'koWZkAMOIyU', '34WrcbCHsMU', 'zNxtIn0AcAs', 
        'gOmiPplVli4', 'l2-QNMWXWrY', 'rYJqg-ZE8SE', '4QdkGihjFoM', '48exO-I4Jkw', 
        'WX8e5XDxAzE', 'GuCYENZX9dg', 'hHLKw2SmWz0', '0vkBPMkeM34', 'PVrpB2ZHaqg', 
        'erGf0TgP4Ho', 'yU2Nq12FQJE', 'eqaGeqNZQJI', 'peZsODaB1vc', 'EJBsKnrjz5w', 
        '4uvmXPZUf5Q', '2lnFQWakxHM', 'xhsrMGdMSXA', 'LEJ-duQejeA', '8XA2lWhHPe4', 
        'PiRqVTtal0Y', 'uHp7YXWWksY', 'jrbDYxJj2hk', 'NwtZBRdr138', 'CyyKmoXBK2Q', 
        'QRa19qdlq0k', 'eeXyRBwqRzY', 'q0jCdoFMs1U', 'pMU0kaYIJ3M', 'JLqV4duuo-o', 
        'wOkF68KvsNs', 'cpxfRMs9fK4', 'ddg8qEuN_oM', 'lWZlDh-Cx4I', 'DFql04XctUg', 
        'rW91hAdDe4g', 'YJltYcnDogw', 'p8c9nadtkJE', 'Kz2BS8Nk3Ho', 'zVkP4Qd1S10', 
        '5DL9pMJVLvc', 'oES8iN59_nE', 'shdzpc-qvJs', '-hHonDPzjdM', 'daoN4dozwq8', 
        '2L2WdZlI7QE', 'I2EH-aYZ1vU', 'j-vA4ty_-sQ', 'lDJLEHzFJfo', '2QcJ8lwbtsE', 
        '7lBSDaXj750', 'rjAJ1VDCO6E', 'd7e-7NwjjWc', '_Im8pND8dGk', '_ciw7VaKfac', 
        'bQRFXdX6Aho', 'Ch8WawV8Js0', '6_x-jUpib_M', 'YQkMXCGJlqw', 'MtH1Co4-snI', 
        '9UzMLtLY8CE', 'IRy6mTzv2VE', '_-POsNoXJwY', '3gvv2UU2tgo', 'kFbPf03B700', 
        'KEyTl9RiZno', 'qTWdhI1bMJs', 'vowNp8mWovQ', 'jiZnJYJ0pAM', 'l3zNhIpRWZI', 
        'mszM6TkVWKg', '5KnNqaLtXRM', 'Zd5fGGRZWaA', 'iUVpH20XKW8', 'rAqrj4Fse8k', 
        'h2gGsFRm90Q', '-uIEdI4-ETU', 'WBOGNGP4row', '-0hd-x_4i1Y', 'LZKvwF6kQTc', 
        'E1ljQmmLx0Q', 'MUsKcXgjcw0', '5V7xeuh-J2w', 'ydwNXkmni1A', 'YOdDput1-pw', 
        '6j7JDJvKMiM', 'xEzDg1Be8wE', 'pgZdn5xbR-A', 'L0mM6ouDCV0', 'rVeG1z6y1gk', 
        'dq912y_GK3o', 'P5FHXnFBGfs', 'HrD3aTIu-vg', 'zHS2O6YKbT4', 'm1g28gwYYl4', 
        'emJq5hYQtBk', 'cBO0_dhukb4', 'VHWSzzzs1co', '0m8vJvC39ec', 'R9G-jr4Uv3Y', 
        '9AtpnFEQnGs', 'pvgScUhloHM', 'NcJ1Q49ce_E', 'SSKFQA6yJlg', '46wZBopt41E', 
        'LbSfG88dJJo', '-xvdThoW9CE', 'qxUqHwU5sOo', 'clPnRGflATI', 'pRudjEmhWP0', 
        'FNi1l5zn_eA', 'EybjIqR_aD0', 'kKoduKyhwIM', '71Nu2m_zA_U', 'Zj9Q4XBX2_w', 
        'iO-cj4M-vsI', 'pVWa_8_68kA', '2DyfczmSP1I', 'llHTc2DmmpE', '1MwpsJdi7MM', 
        '2C4zyDx0zR4', '4qOqUQ8e78g', 'AKZGAUjFGHM', 'O2aq65azxpM', 'mbKOHjak9Xo', 
        '8u-6ixGJYI4', 'Kbh--yAhjAE', 'GwPgYdRcWUQ', 'AN5_Zi0nLGU', 'olNhg2b_ClA', 
        'CDVYjRyw_aM', '0BZOrtPsRJc', 'VNuiZgNAZ20', 'MCPy3T-PUcs', '2EVf8pYUOf0', 
        'v5_CXC8HVzI', '_NJDasyDhIQ', 'BoUpKb8R9CM', 'cCDUODOIrqc', 'xuGZr7WWpkM', 
        'VdoFZ7BE5QY', 'r2Z3FJT8teg', 'x0SMymUchOM', 'OPBqkqcxsZM', 'k2mHKrpF6to', 
        'H8k1iK0dHZY', 'pEW3KcJ0m-0', 'FOuF12H3ftk', 'DuqjG3vWiUo', 'jud7FQLLrOU', 
        'okVcKc4wbn8', 'F9qjC5G9jj8', 'qQXdeb0H434', 'Wox-FfUpwCg', 'xOv6__Hk5mY', 
        'tOLBndyCqvg', 'rl5NXVGuX40', 'pXgQ5LRComU', 'OHmOH7x-n-M', 'CvuqT8hatVQ', 
        'k6Zzo1jzlRI', 'rDDfFT0vkN4', 'kM1a312lizk', 'h6z5eM-tjmg', 'krDW47ggmaM', 
        'fMlyH-A4wzg', 'UclCZ6Si7kY', 'ZFBdzKUp-JI', 'SrE38_6BuBc', 'IcQ8noPu8hQ', 
        '1IHl20MeoII', 'fSvWKigYk_Y', 'G-0OOkpCe_Q', 'lg9GBTPnaXY', 'EIe03DLVvcU', 
        'sAoiF6jqPTQ', 'FhIN9flqqR4', 'L9X5QthJLRA', 'Su8Q_K7npE8', '7Q8dKX2wYY4', 
        'MM06Ax8W2ts', 'iqUdOY75tEk', 'kIZD_ejk3q8', 'w2Kz25t0JI8', '90BBDnH-ZWI', 
        'ebQMmao5tjw', '8zj5ojdmiiI', 'KnSsOL-n9r0', 'TnkBcWakJCc', 'qOsgFrv7zrI', 
        'aZrHWYFHhuo', 'Pq2i8ToJD5w', 'DaDWBKABYmU', 'uJV0avAF_FU', '3BP2C4Zt07c', 
        'nxtzuzmwb7M', '8846-5w-MlA', 'lZJyrZloD2Y', 'aSKUfgAdLqw', 'U52fJixWyro', 
        '1r79uNY10_Y', 'pzrxRxJl6XE', 'MfLJk_rZJyw', 'zaAEriINEsg', 'Zy1rjdnjGg8', 
        'f9-DjRVuzgk', '3N5pMZOsxb8', 'iUUI4JNgY8U', 'kw1Pk9L0qi4', 'aPtjHNYmBPs', 
        'C8jvm3WlnQ8', '2GZyiXPAS3M', 'vVLl7sjo4p4', '5p7Toc0Y70Q', '4DfXGMnl0QA', 
        'px0HSx2mTTg', 'RMI5XPR0NAo', 'CPVqcnYOZPw', '5jZ_o03npqI', '1hAmBPNhaFs', 
        'Ym38LjJsE7Q', '2vMgtp7T5lg', 'eaJXriSSzts', 'ffMi2Hz7ySI', 'tBvLeaU411w', 
        'FMAD7SvcHeA', 'CJhy0Vv45gw', '0cy7c3b0gCE', 'hNmgGtSTqb8', '10QvN2MOBVM', 
        'DJvFbnk8Ax8', 'Z8ahKRl4_N4', '5DojxsfqkHg', 'jPyx8LBB4ZI', 'Hzu15dgluSk', 
        'eb_z25dXna4', 'AwnEOyr2_uM', '16pmW7LGntU', 'AQ8FzsNIYFg', 'NdvQblg9Uqc', 
        'fSAplxG3fBA', 'RmvJE1BUpCo', 'XP1W7CTdwCs', 'QAFwc9zmZvU', 'u8QQuMJeJ24', 
        '_uHMopThWDk', 'xNSV4gYiWZE', 'NnDIRVt9CIA', 'BzyS0G3zb3M', '8XsRCvIReiM', 
        'VgUHQUMjewY', 'MWaZVzM3xQs', 'vYYxov5T-VQ', 'ycotHxAZTLE', 'oVV-bZYTbLw', 
        'Pt7zZcikuYU', 'JmH8knykOJk', 'GgNzx4-OlCo', 'Ub00kefhUPs', '7UH54ia45GI', 
        'Po1MworiHuM', 'G2fejrK7bNw', 'kcLkrMn2JEQ', 'F6RDBxnCfkE', 'tkQ9Wq8suOA', 
        'j1DfXFCHLDI', 'JIxz6_VsmD4', 'Fgr4azpiWhg', 'MVPh2Ap7y7A', 'We4opYlYBjk', 
        'UlX9ShYyWWM', '4A2QBKLgtzY', 'e2Up_I0DvP4', '6cR3fIOoRl4', 'MB3FLNrP2Rs', 
        'kQ77SVl2_io', 'o5-o2VvtC-k', 'J1SiPYj9SaU', 'PVAIZc4Km5w', 'lFj5f4SyJoA', 
        'BeKXR0AhzYE', 'UyqfPaIzdTY', 'iRkmanKLRlI', 'sKLUOzl4r10', 'C_r2bjOxdJo', 
        '6P416vTZA6c', '0ZBs517zZ8Y', 'LZAdidauMGM', 'kTiDwKd8zKo', 'AF3PjkjjcqI', 
        '7UswGEcTf0M', 'LFA26Ln1IT4', 'IHWkNgnBlIY', 'ws473GuF8nw', 'XhzOaPIegWA', 
        'A7Lhy0gULK8', '21SLE60O9Kk', 'pamtZb6qFy8', 'X9BESBcuEuU', 'Q3iQHu9kdA4', 
        'bvmPzew90Ps', 'y5LtVfddlCQ', 't-Y0k7impLM', 'V-NjGmD26tM', 'rK5T5gAhqpM', 
        'ix-3_rhX1U0', 'tEU77i0RjN4', 'kWTCtLNLAVU', 'qua_24HSUXY', 'w-bGMo4q-aA', 
        'DGe7YLb8ajU', 'LLeRvcagCZk', 'beYkdbshaF8', 'ofS7kNtjJE0', 'xzMuggG6FFQ', 
        'rFdvzmoosrA', '-o5Haxf9ML4', 'Xeo-eYYQjLM', 'SYGHbzWf4Xo', 'cd7QJOVJaMM', 
        '8CpXOE68XsI', 'XJk_F3qY-PY', 'mzYK9wjPo6U', 'TM9sUxuurGM', 'GVIyqgiHHcA', 
        '0GtIgQqqXag', 'gJtWYdiRQn0', 'Eo71MoWZhrE', '8VSeyHloWTs', 'ml37a4IkAlM', 
        'tCfbWYi8etA', 'KWTbHS-feGE', 'JHVkV_3cSXU', 'rJD7zAYVDTw', 'A8epJXSuTaU', 
        'e1ipn_71efU', 'YJXRh9TyLJc', 'J7wmUBV0jPQ', '9O4WqHxEG5U', 'CnguCqpT7tQ', 
        'ZPle9J71c0Q', 'BFIEgKKvpDA', '2A0yuNtkfKc', 'pjZ81HpQg0o', '8cfag1t4eC0', 
        'E5ggT3z8Ky8', 'Lb6JcOW-GLA', '40J7PemCGVk', 'QSU8OJgTn_w', '-1-st6GeReE', 
        'PYIeEnRyGgE', 'jDu7v6hCtqU', 'mDn7TPPXRgs', 'Jc_Bg_pkyvg', 'seDdM1b-BX4', 
        '9mwYaUJRO1k', 'pHbvhRFWMtA', 'fgUZRlotIUg', 'T4KHTigQcyc', 'Ex1KL8Cs0W8', 
        'TVXD6M9OrhY', 'aoFpUw6An_o', 'GZTFThkEn8o', 'YngnmDIGRcM', 'MZgYLmU4afk', 
        'n8DPfVpFRgI', 'f11RQsqDpJ4', 'kmDPuQrcP9U', 'moy_QqkagXY', 'ZG4W4sqMS_U', 
        'H2wi5-dsjmo', 'nkoXRI8LDqA', '3kxapD0c_NE', '4LYdhuheGbg', '00dFB0YuqCE', 
        'f6_mrr-dWSc', 't9PxREz1xgw', 'U59si105SaE', 'UlOBtPS_QIs', 'sNUm8jH4C0I', 
        'Gt6QvnlHT38', 'tXVyzQs_MgM', 'eLgp0Dn94Xo', 'yjeGLjdfvs0', 'f_4jJkAwkzo', 
        'wwo6bO_xR1w', 'hmpiXHdUvo0', '_3IN6Oz1LgM', '9ej2arpC5iE', 'kxLkCB35PMo', 
        'oL6apdltDHM', 'dnxKi555Q3Q', 'C7J4bmTHQ2o', 'Y-nCu1Fm2PE', 'w5_7NJicg08', 
        'XiW5Mw48a8c', 'xikHcv_qc5Q', 'KMmo9QgUEFI', 'gPKHiltwhWQ', 'ljcmv6sP0ao', 
        'Kwz7RRBjXPs', 'rGExhEAPcfE', 'LShiEFHlHag', 'e2a-WwljCc0', '4ZWlAYMh6NE', 
        'zQTG2hQm_U0', 'UuXIyE3i8Tc', '51-3V7pijHs', 'bdqXsVumpyA', '6c86J1Q7ojw', 
        'LG-QIVcZluM', 'UgBLlwZA6dE', 'Tzb-UpowFa4', 'j2Vd8cFo4Ks', 'LjAsGhsky-g', 
        'hy5tbwuwNhY', 'ZEXZkbBX-bg', 'VH2cQrekuaI', '0_6v_zxUmH4', 'pYm_ze-K3Dg', 
        '5ng51pbmWdU', 'LT5HJnZq7Zk', 'mkc62fX-xa8', 'b_5RXIo2snI', 'c6hsGhcC_JQ', 
        'q2bJGPgfaRs', 'UKoUlOuGpBs', 'Rh5GS9rR0DQ', 'H9hY6RUCAg4', 'R7xSqdBF0WA', 
        'QUxnpqrU73o', 'P-74-6tMxSM', 'v-9AdxEWyPA', 'JVHDL_blBzg', 'urtxu9F7OFU', 
        'fyvEPGZdrnE', 'HFCok3JXAcU', 'jkfYTdHNtSE', '8dGmDzXo0fc', 'Fiej4LH3v44', 
        'ENQLQh_FaBw', 'ojf2fPyL960', 'mgaJfHYM3oo', 'nIfxus1E3N8', 'Z8N2EW76pKY', 
        'egjDpL7xMg8', 'skKXqAOcZPw', 'ReKQT87T7HA', 'DIp9KtrpjY0', 'jdHgG9hzJAY', 
        'jn3TDKgiMgg', 'zaehIBY4O2s', 'x-6MUyJj18U', '29t_lSxTxV4', 'gWQ4yAMJp2o', 
        'yEuj-kLKYLw', 'r-DZmRSxD3M', 'RztMxwAY_R0', 'nX_R_IVCIvc', '8fx72PnHxo8', 
        'czEXeuuC1Mo', 'WUQUHtzNsBI', 'pl7_5RTWXc0', 'zw3uR1hKZVw', 'wBlhZSfmFEM', 
        'BqcVd7kRBkg', 'olduesTSgjY', '2mhhl0iQ9Nc', 'fq7z5HuXbXk', '6hjPlj3Qg0g', 
        'FQBbJLXJ_8Q', 'KwJaKOcI1c8', 'ifiB6He-l7o', 'riVSRlRCzVg', 'pItvVffhzSU', 
        'nRMwYj6c35s', 'Up9aslJLk8s', '9aLs8W4i0L8', 'Ka11RKgAezA', 'B86gVR0pCYc', 
        'aoguuMPNFbE', 'i26TDcFuSvU', '3dlGGBeJjI8', 'oiQ4F1LjukU', 'rIymY29IjEo', 
        'VtluwZ2eBcY', 'b_XJeTWyQ6U', 'dC1J9Q8aXt0', 'P6hwafesJgk', 'wvUCz8pCBy0', 
        'u4z-dUW5bcQ', '3ig6ZxYu-9Q', 'PqBbReB4WN8', 'K1YP9w5RLCc', 'g4XefYm5z1w', 
        'iKbP0a9th88', 'o2d3Hn2XEoQ', '37QCQjMek2A', 'AGsQSovLXaU', 'cF49tSmIV-Y', 
        'tKfaSf4sA_w', 'D86rfe5iLlA', 'A0jMoedchf8', 'E_b9ctz2mhE', 'jLNPuWU2hmw', 
        'yG8zB__mYn0', 'GwWeOtD0-D0', 'PXxIhc1__kU', 'AwZXcTPVoL4', 'gq4qESnzwAM', 
        'QmYXtY7R2Yw', '5RbAs4pO81k', 'Pb4N3fZ2BK8', '6fidt256ZHE', '_HKxVYaYntg', 
        'uz8IEbdT4MA', '6zOpOhCc-gc', '0l7xBqd0ubE', '6aZQP6lGTZw', '1K0f-LDVemU', 
        'CD9E0f_u8tY', 'U8QvKkyP2J8', 'KWpvlL7kXCY', 'GpsQ22aMrgM', 'G4r7QqVTPSw', 
        'hBODwySzbSc', '7o2qk2p6jLw', 'eLtbN6n1uOU', 'BdFcZw1Arvs', 'bjQOx45SDKE', 
        'nORKd4qZ7FA', 'iz4m82LhZy4', 'qJAzWUJsEAU', 'B3vMNB4Qlcw', 'q3iRSJswDbs', 
        'WZgNp-IQ1Ko', '3wfmH2J1kak', 'aLuZ30T2f90', 'Zdf74G06MOk', 'SUitSzpIa0Y', 
        'Yg-IDfHzsS0', 'NFKzsHhdHwo', 'mLBe-IoH71Y', 'Obv5Wq61A1c', 'HfDbNXjQ6SU', 
        '9CVbGJLoB6A', 'SyPPsDViSK4', '4rKQcF_vuJ4', 'JP8dt4GNFs4', '1mdO4ei9IrE', 
        '6R1-DGwq82M', 'j8F36jTNtec', 'VmofpZIywec', 'QS8-xL11JPM', 'DxVUOiXPg8o', 
        'situetYOb7M', 'uPvyRun1YA8', 'o2QWoUB7mQY', 'YQO4RvCn8-Q', 'W_fbH7yk9Ok', 
        'Tdvq24761VE', 'tFWm0stZ_Hg', 'XEYi51RDBaw', 'ByRUnSUQOUY', 'hL6pe-ZuVQo', 
        'QoXzMbaKk-Y', '30ApEQDdNCQ', 'zO7d3Wjh5Qc', 'bfafFo1EtZQ', 'lxlrmDnoJNU', 
        'e4k0v048oeA', 'GWfJUkaICK4', '11KW2VEzuzE', 'Nmq0BFmZkaw', 'XvwuMI9spiU', 
        'Qi2cRm8CPAs', 'GZ6jI-FLC0c', 'TMZZ3LDXLpk', 'YxCmyX3zeC8', 'XnKzIobyvsA', 
        'jaMv8lVYZCI', 'yvd_6P8govE', 'JpZ0Vdk0_I0', 'Z5nv3lrBy9c', 'k_64ulUy9Gg', 
        '_El9zKydVu0', 'hPltDpdf-sI', 'RCSYSRQAay4', '3XVMXV-zFk4', '8SOtr_CFiIA', 
        't2gMKEi7-GM', 'lflcA578WVI', 'W7f-8BZ7Qhg', 'xGI7TBUodQE', '6n89-KZ-kPI', 
        'pg6xz8PMigc', '5XmcU_Ao-Zk', 'vGF8S2jYTKc', 'i2twDaVRRzQ', 'DHM7OmhoPLs', 
        'cyRSL11o7AA', 'VZSd0isLseE', 'oR6HaNREFuA', 'WAl8tFP8rAM', 'AgaoUx-wSjM', 
        'FYap-qcXckw', 'KrgTfahGV1M', 'gXd1DWNbZ-U', 'H_CykamrPgk', 'G7H4yaukVHg', 
        'qdpROXuKnSM', 'tsWvZWt8j6M', 'suLY5zVjv5A', '8qO-6ca4l14', 'xRO3cir0yoI', 
        'PR5NMlCukNE', '_kSg9SyeA8o', '1Krw6UqNrl0', 'NrvgPi5Lk5Y', 'pUKFViH3rOE', 
        'eVf8TQQ864E', 'GKu6YujROMk', 'oE6zMRmIhag', '8AgHoEb3V80', 'wC3DZxDLWKM', 
        'Q9rR4m5La3M', 'J9V5GQ0L3oU', 'vDe5ikrAO1s', 'rkos3EX60rA', 'dQqlobEYMdw', 
        'aWOI_obDNvo', 'Nyr0yl--sSU', '7Z-fhNyUB4Y', 'mHXeI4Z24GQ', '1kPmwQDLxao', 
        'TNI-h3T8aYk', 'vopXPFuEtCI', 'SBc9_ecHZZI', '8aMdavYApLc', 'tKEfPvskEls', 
        'vRS7hrt6Cro', 'uL3fIdm8mBY', 'UM-XcJ210iI', 'rGL3j54WZPM', 'J244DdHJhSA', 
        'SgRQbNE1sss', 'G90DW7DxnQI', '5_OuDg1mlrc', 'HWazCFFFuN4', '3gc0dLi2BFk', 
        'Y4fmTWmWTo8', 'tNRaUTrbr0k', 'I7p0D5VbNek', 'kParLO8BNlI', 'QTA-qFlyI_Q', 
        'gvigKROTZlM', 'YlG0uXexWKc', 'xvBodEJ6zXY', 'YK4bsATBz6Y', '1QS_zeKQn-8', 
        'uTXSW2oJn50', 'zFY9bRyStQY', 'lYnzTCxg4-o', '1yKLpvNUl40', 'ixcC9PlbsiA', 
        'fBnRnvGplG0', 'xyCfM3yrWIU', 'SetBbiyApt0', 'UO2-yJMOhG4', 'tTMoRhJ1BWw', 
        'hJ1QjR7Al-c', 'ZYOMEqYmPXs', '9VqrCxoYzzc', 'ZjUHh8E8YlE', 'eXtGxCSmQBs', 
        '-CMzWu7G-FM', 'ELyPOtXah3o', 'R4Br8sRtLRw', 'ZdhoYkY8mtI', 'c_es6Q5S9Uo', 
        'mKl0W-x40Z0', '9RELwUOas8M', 'suVJ7cRHaqM', 'LbPMu8wPvgw', 'daAbM6xrKQI', 
        'jM8d6me8oPc', 'xpI_YF5tCTo', 'zV_WLN69JrQ', 'at76aaDJznM', 'roafzgBzOiY', 
        'INSsfEyFFZ0', 'F4KYotEEx5Y', 'bkpFrasV6hU', 'Clpw-0kUV0w', 'eGQjWEh02Mc', 
        'yUJRuo6am84', 'tJvkHYs3Oi8', '9zPWPkal7HI', 'AdNkLzmxUUM', 'fbOWvQim-tE', 
        'wb-JNno2XqM', '9VvCPSoCXuM', 'gu5n_mkKtkA', 'eZlmYP3opKk', 'psgxTLFe5g0', 
        'seg2KlCYUB8', '0NrlXlifzi4', 'hTSxmJcmDPw', '9709WNoZsyQ', 'Nv-ui3dbvNw', 
        'vu_YmBBUPu4', 'h_Zh4mgC4a4', 'AGHZtKDPxTA', 'z0k5tkb2XxM', 'pUIkmFhbLg4', 
        'uxlShpAqLUY', '3awVY8HTJlc', '6RAWUAr9xYI', 'c1gEoFxUkjE', 'TtPzIPZ7DyQ', 
        '3FSDSa1imYc', 'JxXDPfan4KI', 'dejw0ib109w', 'MSUv3xh_e6Q', 'xJ7LlG-5NlI', 
        'F9JZoB-6WX8', '2CUphWZfMTg', 'b4Iu913AwSk', 'B6t1bjUFLtg', 'FwOZKMFZF7M', 
        '8f1GEnys9Lk', 'JtLn9MT2LPA', '6v3n7CgKeOc', '5SCkhxcW1C8', '5caisnYauWQ', 
        'E45WKTIsAS8', 'M_5AsAp0BtI', 'KhnDRmD_fXw', 'YLPPrl-PDXk', 'XM6JnBPfblw', 
        'bqkIsFs-SnE', 'Iregj-unkO4', 'l83qrIlOScg', 'pTog9N-S12E', 'NMr6Qw41vu4', 
        'PcfnD-AI7dA', 'APrASa0Y1zs', '3SYrLTMVULk', 'Ros3xGkGrms', 'uUgN9c0bpO0', 
        'saVk53EX3lc', '34ckMOOmmYI', 'af30SGxJ6cE', 'ew8IYuoJfPY', 'B8ETwPwF_4k', 
        'CHGCAF2xfyc', 'rjNcV1BhYlI', 'dIYLtbO8MyA', 'GCjVeCj7sXQ', 'AVG9LUI15vU', 
        '7lPtOEO76HE', 'HNX-_Gm91Vk', 'ftwOWvkRd7I', 'a3cAY8WDQlk', 'fBbq6mpHHO4', 
        'aUJql1QZy34', 'FbWhCvrHMSU', 'VlwRtqSBacs', '4zC0uspfdPo', 'rc28M8mRpQs', 
        'UEo10mkzTm4', '0EqAmznqoNE', 'KyyujuaD64Y', 'MCPcPK_Go10', 'gEuX3qoEU6E', 
        'ltvUSoxhnPo', 'TOqrDeAxWww', 'pw9xgYqrmaw', '4oatMkIMqzE', 'XSzf58x6d1I', 
        'L7C2484q5C8', 'sdZsNEPoRCQ', 'j4TQFRvfkYU', 'J56_yZaiiJo', 'pEmuL2Ulne0', 
        '04YdPpsgyeE', 'ZEt5o6XSXLg', 'qHmSb8Slw4A', 'uhcuWKxCEYs', 'bnIs_a2lhds', 
        'LIXyPAD8zmE', '7tWmvx0k_AM', '-39jfFM67ZQ', 'q74eMAyWx2I', 'X8sWqTOlO64', 
        '6yIW-0tZ_W8', 'Nz75Z_kApbM', '8yL988C-3hU', '7bdifacpVWE', '1EpwygDdDJo', 
        'vO5vxjpZJKE', 'zXvjFluPVSA', 'Ko7npzAFZdw', 'zWVfGxCe5rY', 'Eb_FQ-mQHdE', 
        'oCoyH6--XV4', 'XeHzAuSfZjY', '6W7IoFhjJGU', 'RAXkHFPgwCU', 'qPvijLdNNkc', 
        'QK6xyvmgor4', '5nED0Ie4el8', 'KuiLO-aFTCE', 'JtC96jzO_PU', 'qZWV2ZuojK8', 
        'Bv7q7CyzD-8', 'RNrj4zw0wRc', 'bXSvCR9KJSY', 'Aqdl8L7HJys', 'PWMDJ0FzCVg', 
        'TaFg50TpW_8', 'd-h58LdyYGw', 'lOcB9yUA02Q', '29Y4RF5mCT4', '6z05v9s6Anw', 
        'zTNQj_Lv1Dk', 'GTgk1M27RuA', 'esysVJYTR4o', '0MtzWtuXI-4', 'zXKeMjrPzao', 
        'JAXzgT4IGk4', 'bnxwpBG0N5U', 'avtnBUFlhLU', 'JyuWJ9X1R9M', 'vurwijULdWI', 
        'sUEBaSEGJm0', 'AwTums_U6rA', 'XB_0cAxb8iw', 'jdIigy2pgx0', 'PSrqnHhMcFg', 
        'xIndzQFNIss', 'EGg2IY10nxk', 'dolGNAP5zqM', 'CG_rVGiVWlQ', 'sjCsp5xyAY4', 
        'oT4RHEFC_28', 'ujJ3RFwXIeE', '3ikaxgKRcj8', 't3RIjhXtELA', '08Wk5kVtZeM', 
        'W8lioIFmtBg', '2qYOrZzXdJc', 'ajqrH_JlU3Q', 'TbMDN5F-sjQ', 'pv56AxiL7w8', 
        'ncATlYjUPpE', 'U8cTMDMkhKo', 'dHR3OWiW3_Y', '1b589LF9auk', '1j_tJcueDGU', 
        'US_FjsZ1ACs', 'mg6m4YDtv2s', 'Zk09lmHj2_o', 'TzCrAfeo00g', 'jnccAg2HKcI', 
        'h6IfC61JjQ0', 'Wwxh_k_msHo', 'g12U_Z8YxRo', 'brtUzP99jBY', '5SNzURrH6ig', 
        'kioN2tysfYE', 'W3lQ7wuSJ_8', 'JoryFhVMPhQ', '4Wa4AewIIEo', '-6XghQmj4JY', 
        'M8pzNleZSGM', '5U6fXTdSnuQ', 'isWBPSSuyrU', '7okzNsgeNMo', 'DykBTo-cmjg', 
        'JrVXJaD9hzo', 'JwZ0WmuOn3U', 'a_ZECXGBPBA', 'cTdpmnG_vIY', '96vD8_vCt7Q', 
        'YRzEWIGzaTo', 'fpZoGB_d0bA', 'rgdIEHUKYiM', 'D6Z0460gUW0', 'WasZsxO1ENM', 
        'hdIXMDz6Cds', 'wXLGk6dvcdE', 'JQ1xBFml1oE', 'dyg80S_11us', 'qKAEUZ6jATY', 
        'xeEAZvN0fm0', 'RvMxEDl-pFQ', 'x_7gF3aSoPQ', 's9C7p6kAMvM', 'NnQ6vEY-V_8', 
        'VX52hawFek4', '_iPzBxWRvdw', 'ZIbIq5lGyUc', 'VAhjlCALBOU', 'w0LEpDBRjrk', 
        'jdwcsFvFhMM', 'ygkdvLbj-2Q', 'CcbvDqykdDA', '0U8UF8Pbvxg', 'oJszJ0xBw7M', 
        'FtxApXpOqWE', '2Osf5Mdfvys', 'Yu1Lww_EyMI', 'TBn1xDzyXII', '8-Izv4WdN9Q', 
        'SLcnFf_Ryf0', 'JTfbgUV4e2M', 'DnuJlrH6N7c', 'buAAQmjAs5w', 'czWqLTPzFQI', 
        'X-cUnHjPukk', 'ntYiQLAijZw', 'IduuGNDGJnE', 'e9xxcs8tJCM', '6Rg2XhZQZIs', 
        'uuOzPawobSU', 'm6mhwImq2WE', '9rZxrZqm3u8', 'y7BjNGtbTUM', 'PMLkkAGDrt8', 
        '-ZbapCHiBNQ', 'zR-wColHabo', 'WiqEZ31wIC4', '0SFDXDHTHN0', 'XPKwFAtggmU', 
        '_NACWM05SjI', 'rqywiy80HrM', 'IyKu7yHJxCc', 'CQdzU6kEDZE', 'Us3lXD_-TBA', 
        'eyFkUm29gWs', 'ReOYumfFDiU', 't9vjGdOmgco', 'c06o4SjpFac', 'eAl2q4EeW5c', 
        'AOihd6c_Tqg', 'JGaq3czhpPk', 'E4LbuMI8258', 'P5L7DpqvxkY', 'LODT2BL5y3M', 
        'nziQ0nc3328', 'vBzkoMmtw8Y', 'ScdK5oBiso0', 'T8mskBXMqU8', '1iMxRFoqHLo', 
        '8p9lstQWq2c', 'oChS3wzr-x4', 'RyWQJPpKeCg', 'oXFFAfO0Zfc', '4uSIr9V68Hg', 
        'D183X-H9kz0', '62THSzhp4q4', 'kVSQ1od547o', '0mAvc_sSGgk', 'e9Oc0uyPbXk', 
        'HCiIV9ai0lU', 'EY8fi4t6Bug', '2-C3_81dMMQ', 'TV3MuztVoF8', 'nN8Wbbnbjsk', 
        'MAxjjupPYrM', '8QabPo-PD-Q', 'XaCgfY4G1TE', 'fN9O3Xrn7Vo', 'yUMtZyu1W1M', 
        'EBkxFzTYjT8', 'b0eFzB5O4iA', 'wizEP-oUNOU', 'YJEFspsbaDg', '61XFAUGLddQ', 
        'xnzAYEuzY5Y', 'YY8jEjZFSH0', '6WBsnHFS-AU', 'EGyt1OIj0eM', '-a3MVwS9cXc', 
        'gbL8bFknjCY', 'kk102qMlEmQ', '2liVb-WGv18', 'eJOw9aVIhiE', 'ZJhRbtv6ZgM', 
        'UuUXJGoG8e0', 'LITMa_ACjg0', 'AljcdhUjbzk', 'mLUsAkwczH8', 'riMPzU5BsXw', 
        'wMioodqaNWw', '4niNMVoR2jU', 'vzivDGTjT-4', 'cJpv3faf17U', 'oxxZBtUFSrw', 
        '-wSfogxHi3U', 'Q-3FZ59ukZQ', 'QvV7Xe7HMfo', '13JAbthv8nU', '6tV-LQqgjR0', 'udmwbqrml_Y', '0L9GTgAUkQs', 
        'r5aP54GTzeY', 'k-5HYPOG4Zc', '3vQkJsAMRS8', 'zPA82VWgKDc', '3T-NouLnDxI', 
        'liNZoaNpcQ4', '7GJDYGqA4C8', '-OVcEcYdoAI', 'LNHPBnFMC6c', 'x4gA3UWI36A', 
        'pwAuLc5uFzM', 'muPT_8t-cSw', 'lKZwmx4moO8', '4FkMlcnycho', 'APBwbX3jkgw', 
        'lLuqhJkA1D0', 'Gr4NNzzYOPM', '6pA6KQSQ2Sw', '9cGVc59SPLo', '_w4clNSyZsg', 
        'wBjEJCSQDns', 'n5PXqcsUjf8', '3NinVENn8Gw', 'k55zBynSYjk', '4Xb4_vsyhXo', 
        'hshZ2dRBpUQ', 'bEZFz37-ejE', 'gVf-aNTy4AY', '4clWv-Q5RGU', '7GV-NKWrxII', 
        'iDf7rCu17kk', 'Oemawe4tP08', 'S6JS5GFC0D4', 'HfRhTQ6V4Gs', 'Hqq-jh9EfYQ', 
        'blFxj2ostgQ', 'aDsPx0PELYQ', '8wnZlaE_G4k', '9_0O_odfvWU', 'NP5P6KpUB9c', 
        'SZcBfsOcTQY', 'kSMSJzBfyqE', 'tno7wLpAy94', 'y3sxtAQVwl4', 'reTIZ9KSQPA', 
        'tSm1GO6pFQs', 'tRifTFkvJwk', 'higLVo3_hto', 'yEknPbqH26o', 'wYFki0kCzF8', 
        'Eshfl7r-8U4', 'xCy5oeujVfg', 'geujJQ9z4_A', 'h0WwiOYvQI8', 'QKgjTA5Z2wU', 
        'X96PfUW8WBk', 'mpenpvdZIsI', 'VUHxe6n6aOs', 'KvgbR8DQgsA', 'KyfERfy5CLQ', 
        '3sAfW758IVk', 'PAeWMjgsDhc', 'DRTiTz9Uu6E', 'S3HkX70e8-E', 'QxDSxIyrQ7Y', 
        'Bj2B-r-4VeE', 'SX32g888A64', '9px_QwjLWyM', 'QuwzY6PjEbg', 'OiXzN_3lBNU', 
        'P4GfnmCV2ZA', 'lkOFxdAb9_M', 'melov2krOsk', 'aW5Pacmp_Y4', 'dom9qTLKdXI', 
        'H_okmfgnWGU', '_m3quVt_o_A', 'HbfQU1Zl7lk', 'SaKVnGKOOvg', 'uNsaaEizjkY', 
        'cEIHRyJP8Ig', '716OHocSIxQ', '2TNtrOUBcJQ', 'uoJedVY56R8', 'Og9hM7rc1jo', 
        'm8fDRwvpk8M', '5EnSjP261uI', 'Qv9Lnp4gcjY', '3c4kxloVT6o', 'q4h6EvqsKi4', 
        'kQJ1Sn6NOgg', '7Tsk6f4MmKk', 'nEZ5-NnaJDs', 'fJ-jXOv3A70', 'xQ7tP4hlq44', 
        'nnIrtbVtEsg', '0LC7tACxgSo', 'm0B3X-8Khw4', 'Kbr3OgfbFGc', 'Q5-davd8qE0', 
        'F_C7Nv6IU9k', 'FgC-0VJ5j_0', 'dEMdRgPwM7E', 'CyrzcCqiod8', '7PDuGg1b8Vw', 
        'Qx68B1mHyGQ', 'LXzbDhwtqkI', 'v7hRpilP2sg', 'nMRu4gkRm9w', 'sZu3n0aklP4', 
        'g8R6GTIcG-o', 'VJ5rSPPwpi0', '1BSvtkfk5bo', '2xRvBOxMVBE', 'R7bqOMm6j7M', 
        '7vWxiLR57kQ', '89qkbKHOCB0', '89nTBcRzG34', 'Pk955_tB9NM', 'FRt1apcTTV0', 
        '4CIp0qbsHSc', 'HxWZJ6kxQP8', 'RY4lLjnbLW4', 'Wx2_CSa5trM', 'ch9iMkScYjo', 
        '_4Z3cEXqwZo', 'kSAc9aeDFVY', 'uijVNYIoNNA', 'S-c6Zr1wgC0', 'ojj-GKd_rmA', 
        'IFhjlTmxzGA', 'fiG8QlfHzE8', '0nF97sfqqJc', 'MDJRFv6aaHs', 'm7q-hJE-R6s', 
        'soDKuda5zyE', 'chykiGYAvgY', 'aJZmWQKFM48', '_4dPUG32JUs', '75Gflcbz1tM', 
        'g3V_hTWy3O4', '7XV_-KBpGek', 'L6q1Q1EIP7M', 'S-LQBOuOUL4', 'Ohsvn_aSHAI', 
        '04D_D2w6D9c', 'WuPcIVE7qMc', '2wUZxP_-Ma8', 'LW1Jh9gIFvI', '7avrVV3zkDI', 
        'nguZaLnMPyg', 'JzUWZSLihDo', 'DtFnTCHR6qQ', 'I--LWOQQW-A', 'WLPW7CLNGEk', 
        'hUrUxOVNxqE', 'aCVFjlkc89A', 'APs5KU4Riu8', 'n2JAEDiDubk', 'TD6GqXStEGU', 
        '2GtBw5eHYi4', 'V8IEon7D9Kg', 'vfbdQNElnJ4', 'O9EMviqIk80', 'wXp0mWpvHRI', 
        'ohKmts9BMx4', 'GYBp5jOkcfE', 'CJw4GDh9PyI', 'DADWWo8Wamg', 'hRxJVcf7FEc', 
        'b6CVLxkNASs', 'LM5EB-J4_O0', 'g_APiMIsaG8', 'GNz5o7UiCXM', 'SrFZ9f92x64', 
        'P0S5vz0Hx4I', 'ywAax-dmhl8', 'u7zKZYUS_A4', 'rGPgOXPk7hw', 'sFrCQi1Bap4', 
        'MmwC258MHgA', 'j3cLOrYPs7I', 'Sf40c9_zm5w', 'WXlwcZYIrns', '45F-TSY4Y7Q', 
        'L4GWXdKK-9M', 'RUB5uoqtNdM', 'Pxr3CazC3pc', 'BKIgJKqzYug', 'gONvxsAg2QQ', 
        'vQEgtefXJH8', 'oCkda1olkaQ', 'xonGbUmoia0', 'xsCItcXe10w', 'ogS8kikNbeE', 
        'a1J6gbg-NnI', 'BzykqEJd-4Q', 'PA4pRl9o1hc', 'racBPI60d0M', 'dYgVem1ptto', 
        'BLKl-BP1rCI', 'V9eFolQVNjI', 'BJhAEx2sKp0', '81lmfV0fmro', 'cIjXle1PWPE', 
        'DuIHlib8zpg', 'ePQSa6A0FVw', 'L4qPXR80b3c', '3AWkyozBpwo', 'nnw4qM6lTlU', 
        'NZ4MYGSZvIs', '-RASRPRkolU', 'BsTn3SakA60', 'zx1nSfQVyg8', 'TZlvirkWofY', 
        'wShBjw-KhBk', 'FgTs7c6tdwg', 'F_8tslaAuIE', '5qRnX1U_TJU', 'xWwBNY8uTAs', 
        'Ae3FYVLo6mA', 'aapvSG_CRfY', 'mYeuHJA6jRU', 'zG_LWiSufXk', 'rafsoJX1IzQ', 
        'S76tQQVVYMI', 'dKQhyHO5rOw', 'sUfdAl_WXwA', 'U-nNh1kISCg', '-8ZlF2P2Fes', 
        'zbQ1e1rltCY', 'gUYhcFYBE68', 'rUgZw-NNBpA', 'A4Rhcqc8Sng', 'KKYDz94UW3o', 
        's3hlY_ejjbU', 'xTCLumVHvyg', '2fK4LAQ5gPE', 'N2n9qWmQIbY', 'i7ySYH9GSKI', 
        'IhBxATI0o9E', 'EQfN3Rh7y3I', 'KkEKrA0Ublg', 'YZPmLRHTuWo', 'OwQ4rztXtTw', 
        'sgELjVtUfds', 'sJEtQQz5Z38', 'U9rwVb4m2x0', 'r_p6m8lLa3E', 'FUleH8uuB88', 
        'C8twukz-0g0', 'v8sJfzhnwOM', '-tSInK_Q8mU', 'XMaEPoqZ2CE', 'aOgLtLhOPZc', 
        'SBdbKKnlEZU', 'tRpwth7wG4E', '0p4ND6eB1Z4', 'oH8Ghijwr4k', 'MMZQ8WkF2vI', 
        'kSb6l4Lrh24', '4MX5WAtnghc', 'wvHa6dS9130', 'XoqWjnQQN_8', 'wvHf7Hdu7QQ', 
        'YpLyUQs6vKQ', 'ZBuu21E4Zd8', '5JoTJkwvpxo', 'McnmywgjBtE', 'F2qL5dTi9vU', 
        'HOeGHhOWx_o', 'Zr_cjWvogIE', 'm0cmqpKaCBc', 'j7kq7_YrQto', 'dFWQHr92ZQo', 
        'B6OTTZLNops', '88c5NkQ6vK8', 'Ez5y-ufwQFg', '-vrSCxB-D88', 'swBxtMQUz_g', 
        '8ZAT8vFYDwM', 'lKUw2KNkR-s', 'sg9r-C6aRNI', '1h6BKjPk3-g', 'rY1AA0DtzT8', 
        'cLl-zNVrb_Q', 'leDtKgSBC38', '8uA6UVZ3790', 'VLLMoEavH0k', 'hfTkoOGL-n4', 
        'CM4Jy2KkaKg', 'PrzmB6fYXMM', 'bsCkSaiap6k', 'FNnrxY0G4FE', '6rUuIpN1oZk', 
        'n0YINaPglso', '40SlJGC-zrU', '82HmvxDApKA', 'W2KUbPW1CL0', '4SXjGKv30Gs', 
        'ON_mFs5OieE', 'IDN2p6EyFBM', '8NnYeIzEuBw', 'iSD9YAlc1ZE', '-KYhQP1JUBU', 
        '0NdoIF9T0Ps', 'yZffYQlwxl8', '0XDlGKRpxZ8', 'ONXhUJf-Bjg', '_nMOgPUUg5Q', 
        'e5d0CSA6e74', 'zF-T7uDNL0Y', 'sqytQKOVOWg', 'ymalJ5AMH4U', '8Vi6Pr9Z5Pg', 
        'dmxY3I4yaRc', 'N0l7F-PtTwU', 'VSqjI3WXLs4', 'vh9mLK36jzo', 'feskSn7ZI6Y', 
        'p5ifcfXvb8k', 'jNYXQLWlk6k', '9i_ZHeYy-lo', 'BiKU79XjelQ', 'iF_AaAIO2CM', 
        'EFLb-l0SR6c', 'qRhvCoJDyeQ', 'Tp-TNuATeM4', '9Z_WHjZkodM', 'Lyxjo0XPnNE', 
        'i-3aeVNQ6nc', 'yNwBhzH1YrM', '-IrItTA-cQA', 'H9IZynm-7Ss', '2hRmzZQez6k', 
        'MEKndbr8feE', '9_9jRZX9hrg', 'Dx3MBgrzQCI', '1WpuMH7ciTk', 'j-UCw3M0-64', 
        'oL0fF__CtWA', 'iK5t8QB87UU', 'vaXm2fPE_uk', 'bbYuiQbEAGs', 'XM7GScqMFVI', 
        '9dzniI0cwrM', '21ZEOwx6T94', 'rTevUCDeoDc', 'av36Zxy3f4A', 'zXxNQcb5t68', 
        'LX6SxcWG7YA', 'XVfJLpJxGTU', 'dudkYbR6xZI', '3gLfCwvWci8', 'rtZ2uvbhqaU', 
        'v3I717GTrRs', '8UYgoy2_Wtk', '8H5xYoFwe4M', 'nK9i8HC_1Sc', '7djDLx0quVc', 
        'oLHcfj-Ay34', 'Jao-T_qlHeM', 'UGQF3m-5sCE', 'KS28nYVA2tk', 'TwEYMTZlhWE', 
        '38BW7H47Zwk', 'mznJ7U97i6Q', 'mdTSen6ZRAo', '1FFlzAkA6CQ', 'xV7erzHcvXs', 
        'AEJappIRN2g', 'fNUrJBH1Brk', 'TPM42fKvcIM', 'fsH8VPOoqgA', 'BIwUxaCDURI', 
        'bKTMLHafM2s', 'Sx4ZJ4JuxVs', 'RGkDoeMu5d0', 'ipa1J7DBvjY', 'cW9ZVjriKfI', 
        'fBMFzP-dS4A', 'IxECMesGaFE', 'hc6TqDJoBv4', 'Dh3m_-Op8Ok', 'uUrxMkEkDg8', 
        'uc_sHgAQLjI', 'H_6TOiQC_c0', 'SJljQ-_AlxE', 'sz1HVxtwFAU', 'cAEZcqxDLmk', 
        'ZaSvEqhwrT8', 'pJ5bNbwRC1U', '57HmdnpMbS4', 'kBaC0nsO5NU', 'U820U1cPxSM', 
        '22vJrCORcfE', 'V26Y2YNc3fQ', 'uNptmD4fjCY', 'qbrsgEf1POA', 'KerYY3GniYA', 
        'AO3qA7RhRaw', '-ffafxOEM2A', 'CO9Tpccf4uM', 'BohBUy9a6c0', 'due8VTv4RYg', 
        'kGL9xG9xS94', '4lQpmXXDaNY', 'id2HywsUXS8', 'YWPKTHBUk6I', 'z6GI9kXPkg8', 
        '1VvmKyqd4u0', 'ac2MM-z6FgU', 'N-ogVnhgobA', 'dsHLvgHCKNo', 'fDUAd9Wqf_k', 
        '2FWfeRcint8', 'Am1sBwNn8uA', 'rp60ACO1N40', 'pBOH3G6WQ04', 'zxYv-MmauI4', 
        't7Q9DQbEkQw', 'uq_pj8PjNlI', 'Te9U7cSEnEQ', 'j7JU1KczoUg', '-yWMqQnU45A', 
        'u-hThEdepWk', 'ZPA2VVG87F8', '1R8mVN1WfKU', 'sBiRPAQMjBk', 'Egqt8rzSvVs', 
        'xUx-8FxCudo', 'Xub5ve4xq1E', 'u7X_AdYSHJA', 'WKaFuzlaPtQ', 'RqS3ntaSg_4', 
        '8f5MRaGQZjA', 'El7sbn4sWhg', 's5Ftt9w4R7M', '2TAD9twtq8w', 'tNjWNEwz8nc', 
        'V8YjcyLXI5U', 'hUDuhL-OznM', 'mNOLbEOnpcU', 'tRSSm8-8XEg', 'hQAoQWcjEIM', 
        'o-OZU5RnYcU', '2COYyDNe1cI', 'WLcWwsk-ZME', '78gIu6ADnxM', 'OoyFoFEkzTU', 
        'PWTv97ylMlY', 'vVpd28x7uyA', '7eGc7R69LYM', 's7OYDJEZGPk', 'n_Xp8sEf_c4', 
        '7dKzvxyAGBU', '5R4byPeu4xs', 'HmdBnxEXyH0', 'gGX5aav9d5E', 'GygbWBrQUsQ', 
        'PhlSNhSj-Xs', 'ltc-cJiYgAY', 'P4qh505E-Mo', 'JQuy4jr5QqE', 'HN0L80H3LF4', 
        'MDhyEjauvDs', 'n3imzkJzeR0', '7awf8LkBYEw', 'uEVuMaZHAcg', 'hXBc4lV1qgY', 
        '_Lh5QSXiyPI', 'XjoRpoSq8lk', '6iz4-_ZsKKs', 'izEaQA3KK3M', 'j4-r8_VlUuY', 
        'ERxWRENijiQ', 'VA1ZJmPyUQE', 'H1mscRG3P7c', 'H3ZwEkav6ss', 'azIz5xyYrdY', 
        'e8pdh3szrOE', 'AkPLqRH7vx4', 'fKrWIHaL1bs', 'vWjHiZ-O4e4', 'n5aRGe69li0', 
        'b8Gpnc7_2m8', 'fsK3a824NCg', 'za5-4AS12Wk', '8mNL4WkX5w8', 'JsI0rocx6n4', 
        'lHA8H-7S8a0', 'IZBpn6KTG24', 'vjAYX07PCm0', 'GULLdi2ECbw', 'd4gnypgklnA', 
        'J2Pd9OB3RM0', 'dpudAqaSoNU', '2glm0YhL6Go', 'YGPIvvshfzo', 'ULdQc6ZUtEE', 
        '6-6fv6geqmw', '_HdD8txCK4Q', '80CXUvy91_w', 'AH0D3YV5uzI', 'aMDAzXAr0cA', 
        '-jb7p_1fp5U', 'JLWF170NHFA', 'gdg45-Ourps', '7NUzPtqWJUI', 'i5vcWmuKeKU', 
        'ZpAMJ3kX6mE', '9A7fuTWGXDo', '1rt7X7vlph8', '1MtIjL-igWc', 'tgguRQOZo5c', 
        'B2yRN7z2TmM', 'edzVu2ENRa8', 'mpifJc5oSMY', 'rDQeikDX68A', 'Gv3JfBQurMc', 
        'yQXV7r_XAQ8', 'PCw5W1yGHEo', 'BA_J7GAYrb0', 'R9b4xX_I15E', 'kpQh4JzYryw', 
        'lIwLJ56vgcE', '3FDHZXlpci4', 'T-OC3rD4FWc', 'm34xQmDm0oA', 'IPxZVUQg9ok', 
        'g7b6xdzm5us', 'Ma0uaWSg8js', 'bzalCv7cRtk', 'gMcBtrQ4-6M', 'HWq47HdorUE', 
        'R87asGdaGRI', 'Gab6l7cczPY', 'SPh1-L0hpGs', 'TtMAE_y9enU', '22GappC8Xp0', 
        'srFtM497dBI', 'JbdHgATAb0M', 'bcr-l607Hu4', '3Z5mpUeBxvI', 'UDqybuemjbQ', 
        '23ZdyhN39GI', 'ppXiJR7bpqA', 'okuZFgTBI0s', 'lo1vxjbpJ6g', 'LMywAPQDeHU', 
        'k7Tly7kxb-k', 'GqmR67nr1l8', 'ntv5zw3fkhA', 'rGya-OPZWTE', 'TFOJyeAP_NA', 
        'CLrNGvzBrzM', 'tqsljXfSLOw', 'rxmhni8g8kM', '_QzmGMzDW3s', '140j-TnpH9E', 
        'P-KJYOMSND4', 'MaX0oZUyH6Q', 'Jbin6q0-8YU', '_S-Kq6psjPE', '05HJZeotl9g', 
        'UkCQm9JHH9s', 'VQpbkoB3-Rg', 'Xh6ds-_qR18', 'YHSHq99SZzg', '_G0py3Bb8HU', 
        'H3dTZegfKtU', 'mH2-SgVpJmA', 'oy0uXtqvQM8', 'oemPFsqqnyY', '0z1Aqup6NJU', 
        '4PWDFWy-r9Y', 'dF8E9wNNjfQ', 'eq8KgdhwkGI', 'YXLD4bY3N4Y', 'rEUD-ZK9jyQ', 
        '00G4GGQAwUA', 's8Vk7wPT-g0', 'VwuOa2F9jk4', 'lwlkogT_5Io', 'UJUwEcTBP5k', 
        'T1-gX_sC_q8', 'Rk9t4o3NqhU', 'T50PcyGPIxU', '5sm8dd4YEVo', '3p_-eBah8k8', 
        'SfxL2Q5mUPU', 'jESET6PUJDw', 'cylS7T7jlHM', '9vZxi2fs7bE', 'lCIVOFIZlO8', 
        'IMEVhTi2qiE', 'muAFPA8M7oQ', '2meJ4nA0xzs', 'cJQ3AG-8YHQ', 'W1lJyXrEv6g', 
        '7TGqtULSfLI', 'aKje5DQYDXk', 'DhqDZOdOtOU', 'jW5Tqa2KJK4', 'sZF0q_oAD-I', 
        'Y21_3b1ydMY', 'jzomSRPNEuE', 'gFV9UiUw-RM', 'i9akUj9XDq4', 'G-bUH1JVMI0', 
        'ig2s3PwxJ4M', 'pJo78VslV5w', 'd0tQnS3S6aw', 'Pc3-DDkmc1Q', '_bxgoymTRdE', 
        'yPxSWT0PG08', '7X2HSQJheaw', '84yT-P4qPnw', 'ktF4iNRVSTQ', 'ojfWlYexkxc', 
        '1B4DlHuA8R8', 'HHfqiOXOP-g', '3K8ChDwShgA', 'pv6nTVr3VhI', '4PHrqlyFxFo', 
        '66S1E-39otE', 'h5S_bua7ZeU', 'FSrWIyoXJos', 'TH8iqFrq72A', 'CkrJnxCq1N0', 
        'FDv0WCiR6ns', '6HL-Byd4tao', '57tDYvzSjW4', 'w9dtJLxxyf8', 'CgEyGDAIG1o', 
        'cESMczpa_RM', '9nwGKSAfU1I', 'HJ0-pgClSyM', 'IM4MNMsczyA', 'rd23Er04zYw', 
        'Juazpqyc_ac', '9yIoqX_q6Yc', 'mskWV9KraCg', '-4YBcic8_Ts', 'B_92nOv6Cqo', 
        'WQu_FMlWCEU', '27Y1YwRUY4U', 'i-dFA8bqfPQ', 'gqzWN6ypfVg', 'FZpHILw9e_A', 
        'c-YIZaQJNDY', 'DKa6tgCt8E4', 'tqaHBaVG6XU', 'TgC1nPBLWMU', 'SOPO4HbZoss', 
        'XjuvZtFXZsQ', 'LnKOrhd_pG4', 'oulJlWLXW_c', 'SIzKp2xPLpw', 'RrvLB6E0hD0', 
        '3UsSObPT3FY', 'rjD_oOr9YKI', 'xcwpy0sLZ2E', 'lfkZmMSXqvE', 'Ju4RO8Efud0', 
        '7msUbfhik4k', 'KKxFb-6sg8k', 'QzDszCu4_Z8', '-9QNkvqnhWQ', 'uq6jCSDd25o', 
        'Kq33l1K7Z7w', '9IPD-LEy5Sw', '3maJCRDS_uw', 'jYmiS1rSoxM', 'nvFljgEnGuU', 
        'nsLm5VQBNPk', 'KecRK29oV30', '_xmsbGt3DpA', 'H4AH_2RhVnE', 'rvFLdX-SYhc', 
        'TIdkeJP4UKI', 'Eej7KT7ILaQ', 'Fk1xhwOhgNo', 'YrXASegDCVI', 'cHCuymL-_j4', 
        'zPqPVALnbwo', '8RE-NAWktM8', 'ai-wTtrESiE', 'fI3kXjK93ps', '816YOgT-nS0', 
        '8-Rj_dLNDyI', 'S3T9T-2o3gM', 'HqASpc5oyA4', 'zn04cAZY3SM', 'dMrfNiv1DVI', 
        'wyWim02DHGY', 'p8Zsw7jTeF0', '63RdZA1lwnI', 'BqTvbhRMEVc', '0BkfhxbQt4I', 
        'nvFE_Gd4llc', '0Tf_eo-RqSM', 'F6qxioU3IEI', 'qcfS8jHFWeI', '09ajOS7oeJY', 
        'ZpUqh2WT1II', '--yT7SqZE-c', 'CHuGmGwJfUA', 'mU_g1_jmPIQ', 'heA1F39H2fE', 
        '0dtOaUm2KI0', 'qoIVvyNL6-Q', 'zsmPap4t0eo', '4tCybC_KHPk', 'huHqnY2yyM4', 
        'GOKmMRnOGVw', 'xpbZppTPGok', '_yEYLP5HVX0', 'pCZvEXOxUtg', 'Z77-3EdhmuA', 
        '0zQtFPPPzDE', 'SmpK_pBD2Sg', 'hAX2n2db-fE', 'v8sDw-LYfvw', '9zmBoAT1-T8', 
        'RiI5j_8hvmU', 'CrWv3dd75EE', 'UjyQZEzxjwY', 'y5Bls3Q4KM8', '2LFqSSAxHWw', 
        'IJrgYunQcrs', 'erBCJ5GT_sw', '3C9nF-mIY28', 'cNr6KgAAzkM', 'A2OBsypfr6g', 
        'cIHHCEpHmY8', 'YGoEVQLYMi0', '5SMtq4N_yXg', 'bx8BDG2-u2k', '4Jl692ly0U0', 
        'xYtlwDTjK-M', 'K6krF8ZaZXo', 'daZcNrJF8tA', '2nBSdR1xaqo', 'yDvapgj9OJE', 
        'gEw8KWZjk1E', '-EZItx8ugRQ', 'hkXvWgutjG0', 'ictA_ZFx3bc', 'HRyR178-H8Y', 
        'ziyGAOa7vN4', 'WgnN_2o9dz8', 'Cn6_XWkQ2Uw', 'quW0OUpW_pw', 'a1kcJHZRtec', 
        '5PFN6cZi9zk', 'HrJoU1ZTvXI', 'PrUEdGRy1y4', 'QyP6S88ap0s', '_3S1MOTzkcg', 
        'p1OtxDdcAqM', 'pUoUlMcKRTA', '0QxKyMHkp3g', 'CXo9i-pEGxI', 'KOZ5-FoaTEs', 
        'vtP-q2eNCQw', 'UXB6Hq7aF0Q', '1ieQHEjGslk', '3m4LX4CAzug', 'ecs3YOqr-5I', 
        'x2023UHyahU', 'tTMJzaK1_W8', 'Eor3zLfJpOg', 'iKGMioY7T3o', '4kOPIecQWdY', 
        '-BI1FaL7VkU', 'kLU0zE9Uxzs', 'Gkl7Dxn5zdo', '4P87RbwbAG0', 'uTPaD9ketUk', 
        '5ZC0uHO8z7U', 'kQGaVFbD1b0', '1x6if-OG3do', 'DRPOu8OCSZs', 'h_aHpUFbce8', 
        'ki1IaZVePos', 'kaTlhww3wvw', 'DPMaPR6KGKM', 'mR7U49TRtes', 'kiF8hSd2s0w', 
        '7IhuZ_6Q-8c', 'McvVMt4fFwc', 'Pop5suHbVkI', 'oYoW3nLKuS8', 'YJGplUT6u60', 
        'ZdwEV5-pUyQ', 'E8Kbi4ZX79Q'
    ];
    
    // Fetch video titles from YouTube oEmbed API with parallel batch processing
    songs = [];
    const batchSize = 50; // Process 50 songs at a time
    const batches = [];
    
    // Split video IDs into batches
    for (let i = 0; i < videoIds.length; i += batchSize) {
        batches.push(videoIds.slice(i, i + batchSize));
    }
    
    // Process each batch in parallel
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        
        // Update loading message
        songList.innerHTML = `<div style="text-align: center; padding: 20px; color: #fff;">Loading songs... ${songs.length}/${videoIds.length}</div>`;
        
        // Fetch all songs in this batch in parallel
        const promises = batch.map(async (id) => {
            try {
                const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
                const data = await response.json();
                
                // Parse title and artist from video title
                const fullTitle = data.title;
                let title = fullTitle;
                let artist = 'Unknown Artist';
                
                // Try to extract artist from common patterns
                if (fullTitle.includes(' - ')) {
                    const parts = fullTitle.split(' - ');
                    artist = parts[0].trim();
                    title = parts.slice(1).join(' - ').trim();
                } else if (fullTitle.includes(' by ')) {
                    const parts = fullTitle.split(' by ');
                    title = parts[0].trim();
                    artist = parts[1].trim();
                }
                
                return {
                    id: id,
                    title: fullTitle,
                    artist: artist,
                    duration: '3:30'
                };
            } catch (error) {
                console.error(`Error loading video ${id}:`, error);
                return {
                    id: id,
                    title: `Song`,
                    artist: 'Unknown',
                    duration: '3:30'
                };
            }
        });
        
        // Wait for all songs in this batch to load
        const batchResults = await Promise.all(promises);
        songs.push(...batchResults);
        
        // Small delay between batches to avoid rate limiting
        if (batchIndex < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
    
    // Cache the loaded songs
    localStorage.setItem('karaokeSongs', JSON.stringify(songs));
    localStorage.setItem('karaokeSongsTimestamp', Date.now().toString());
    
    filteredSongs = [...songs];
    renderSongList();
    
    console.log(`Loaded ${songs.length} songs with real titles and cached them!`);
}

// Render the song list
function renderSongList() {
    songList.innerHTML = '';
    
    filteredSongs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = `song-item ${index === currentSongIndex ? 'playing' : ''}`;
        songElement.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-details">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
        `;
        
        songElement.addEventListener('click', () => playSong(index));
        songList.appendChild(songElement);
    });
}

// Filter songs based on search input
function filterSongs() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        filteredSongs = [...songs];
    } else {
        filteredSongs = songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );
    }
    
    renderSongList();
}

// Auto-play next song setting
let autoPlayNext = false; // Default to false for auto-play

// Play a song
function playSong(index) {
    if (index < 0 || index >= filteredSongs.length) return;
    
    currentSongIndex = index;
    const song = filteredSongs[index];
    
    // Update UI
    currentSongElement.textContent = `${song.title} - ${song.artist}`;
    scoreDisplay.style.display = 'none'; // Hide score when starting new song
    scoreDisplay.classList.remove('show'); // Remove show class
    
    // Wait for YouTube API to be ready
    if (!isYouTubeAPIReady) {
        console.log('Waiting for YouTube API...');
        setTimeout(() => playSong(index), 500);
        return;
    }
    
    // Load and play the video - simple and direct
    if (player && player.loadVideoById) {
        // If player already exists, just load the new video
        player.loadVideoById(song.id);
    } else {
        // Create the YouTube player for the first time
        player = new YT.Player('player', {
            height: '500',
            width: '100%',
            videoId: song.id,
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'enablejsapi': 1,
                'origin': window.location.origin
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
    
    // Update the song list to highlight the current song
    renderSongList();
    
    // Scroll to the current song
    const songElements = document.querySelectorAll('.song-item');
    if (songElements[index]) {
        songElements[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// YouTube Player API callbacks
function onYouTubeIframeAPIReady() {
    // This function is called by the YouTube API when it's ready
    isYouTubeAPIReady = true;
    console.log('YouTube API is ready');
}

function onPlayerStateChange(event) {
    // When video starts playing
    if (event.data === YT.PlayerState.PLAYING) {
        // Start microphone analysis when song starts
        startMicrophoneAnalysis();
        scoreDisplay.style.display = 'none'; // Hide score while singing
        scoreDisplay.classList.remove('show'); // Remove show class
        recordingIndicator.style.display = 'block'; // Show recording indicator
    }
    
    // When video is paused
    if (event.data === YT.PlayerState.PAUSED) {
        stopMicrophoneAnalysis();
        recordingIndicator.style.display = 'none';
    }
    
    // When video ends
    if (event.data === YT.PlayerState.ENDED) {
        // Stop recording and calculate real score based on pitch and tempo
        stopMicrophoneAnalysis();
        recordingIndicator.style.display = 'none'; // Hide recording indicator
        
        const score = calculateScore();
        updateScore(score);
        scoreDisplay.style.display = 'block'; // Show score after song ends
        
        console.log(`Performance Score: ${score}`);
        console.log(`Pitch samples: ${pitchData.length}, Tempo samples: ${tempoData.length}`);
        
        // Auto-play next song after a delay if enabled
        if (autoPlayNext) {
            setTimeout(() => {
                if (currentSongIndex < filteredSongs.length - 1) {
                    playSong(currentSongIndex + 1);
                }
            }, 3000);
        }
    }
}

// Start microphone recording and analysis
async function startMicrophoneAnalysis() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
        
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 2048;
        
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        
        pitchData = [];
        tempoData = [];
        isRecording = true;
        
        let lastBeatTime = 0;
        
        scriptProcessor.onaudioprocess = function() {
            if (!isRecording) return;
            
            const buffer = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(buffer);
            
            // Detect pitch (fundamental frequency)
            const pitch = detectPitch(buffer, audioContext.sampleRate);
            if (pitch > 0) {
                pitchData.push(pitch);
            }
            
            // Detect tempo/rhythm (beat detection)
            const volume = buffer.reduce((a, b) => a + b) / buffer.length;
            if (volume > 100) { // Threshold for beat detection
                const currentTime = Date.now();
                if (currentTime - lastBeatTime > 200) { // Minimum 200ms between beats
                    const bpm = 60000 / (currentTime - lastBeatTime);
                    if (bpm > 40 && bpm < 200) { // Reasonable BPM range
                        tempoData.push(bpm);
                    }
                    lastBeatTime = currentTime;
                }
            }
        };
        
        console.log('Microphone analysis started');
    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Please allow microphone access to enable scoring!');
    }
}

// Stop microphone recording
function stopMicrophoneAnalysis() {
    isRecording = false;
    
    if (scriptProcessor) {
        scriptProcessor.disconnect();
    }
    if (microphone) {
        microphone.disconnect();
    }
    if (analyser) {
        analyser.disconnect();
    }
    if (audioContext) {
        audioContext.close();
    }
}

// Detect pitch using autocorrelation
function detectPitch(buffer, sampleRate) {
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let best_offset = -1;
    let best_correlation = 0;
    let rms = 0;
    
    // Calculate RMS (Root Mean Square) for volume detection
    for (let i = 0; i < SIZE; i++) {
        const val = (buffer[i] - 128) / 128;
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    
    // Not enough signal
    if (rms < 0.01) return -1;
    
    // Autocorrelation
    let lastCorrelation = 1;
    for (let offset = 1; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;
        
        for (let i = 0; i < MAX_SAMPLES; i++) {
            correlation += Math.abs(((buffer[i] - 128) / 128) - ((buffer[i + offset] - 128) / 128));
        }
        
        correlation = 1 - (correlation / MAX_SAMPLES);
        
        if (correlation > 0.9 && correlation > lastCorrelation) {
            const foundGoodCorrelation = correlation > best_correlation;
            if (foundGoodCorrelation) {
                best_correlation = correlation;
                best_offset = offset;
            }
        }
        
        lastCorrelation = correlation;
    }
    
    if (best_offset === -1) return -1;
    
    const frequency = sampleRate / best_offset;
    return frequency;
}

// Calculate final score based on pitch and tempo accuracy
function calculateScore() {
    if (pitchData.length === 0 && tempoData.length === 0) {
        return Math.floor(Math.random() * 40) + 30; // Random low score if no data
    }
    
    let pitchScore = 0;
    let tempoScore = 0;
    
    // Pitch scoring (50% of total score)
    if (pitchData.length > 0) {
        // Calculate pitch stability (less variation = better)
        const avgPitch = pitchData.reduce((a, b) => a + b) / pitchData.length;
        const pitchVariance = pitchData.reduce((sum, pitch) => {
            return sum + Math.abs(pitch - avgPitch);
        }, 0) / pitchData.length;
        
        // Lower variance = higher score (normalize to 0-50)
        pitchScore = Math.max(0, 50 - (pitchVariance / 10));
    }
    
    // Tempo scoring (50% of total score)
    if (tempoData.length > 0) {
        // Calculate tempo consistency
        const avgTempo = tempoData.reduce((a, b) => a + b) / tempoData.length;
        const tempoVariance = tempoData.reduce((sum, tempo) => {
            return sum + Math.abs(tempo - avgTempo);
        }, 0) / tempoData.length;
        
        // Lower variance = higher score (normalize to 0-50)
        tempoScore = Math.max(0, 50 - (tempoVariance / 2));
    }
    
    // Bonus points for having data
    const dataBonus = (pitchData.length > 10 ? 10 : 0) + (tempoData.length > 5 ? 10 : 0);
    
    const finalScore = Math.min(100, Math.round(pitchScore + tempoScore + dataBonus));
    return Math.max(30, finalScore); // Minimum score of 30
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd166', '#ff9f1c'];
    const container = document.createElement('div');
    container.className = 'confetti';
    document.body.appendChild(container);

    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
        container.remove();
    }, 5000);
}

// Get score message based on score
function getScoreMessage(score) {
    if (score >= 90) return 'Amazing! Perfect performance!';
    if (score >= 80) return 'Excellent! You rocked it!';
    if (score >= 70) return 'Great job! Almost there!';
    if (score >= 60) return 'Good effort! Keep practicing!';
    if (score >= 50) return 'Not bad! Try again!';
    return 'Keep practicing! You\'ll get better!';
}

// Update the score display with animation
function updateScore(score) {
    const scoreDisplay = document.getElementById('score-display');
    const scoreNumber = document.getElementById('score');
    const scoreFill = document.getElementById('score-fill');
    const scoreMessage = document.querySelector('.score-message');
    
    // Show the score overlay
    scoreDisplay.style.display = 'flex';
    setTimeout(() => scoreDisplay.classList.add('show'), 50);
    
    // Animate score counting up
    let currentScore = 0;
    const duration = 2000; // Animation duration in ms
    const stepTime = 20; // Update interval in ms
    const steps = duration / stepTime;
    const increment = score / steps;
    
    const timer = setInterval(() => {
        currentScore = Math.min(score, currentScore + increment);
        const displayScore = Math.round(currentScore);
        
        scoreNumber.textContent = displayScore;
        scoreFill.style.width = `${currentScore}%`;
        
        // Update message based on current score
        scoreMessage.textContent = getScoreMessage(displayScore);
        
        // Change color based on score
        if (displayScore >= 80) {
            scoreFill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
        } else if (displayScore >= 60) {
            scoreFill.style.background = 'linear-gradient(90deg, #ffc107, #ff9800)';
        } else {
            scoreFill.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
        }
        
        if (currentScore >= score) {
            clearInterval(timer);
            // Trigger confetti for good scores
            if (score >= 70) {
                createConfetti();
            }
        }
    }, stepTime);
}

// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', init);
