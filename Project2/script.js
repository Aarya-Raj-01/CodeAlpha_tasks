
let currentSong = 0;

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const ctrlIcon = document.getElementById("ctrlIcon");
const songImg = document.querySelector(".song-img");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const prevBtn= document.querySelector(".fa-backward");
const nextBtn = document.querySelector(".fa-forward");
const barsIcon = document.getElementById("menuIcon");
const songListContainer = document.querySelector(".song-list-container");
const backIcon = document.getElementById("backIcon");
const musicPlayer = document.querySelector(".music-player");
const miniPlayer = document.getElementById("miniPlayer");
const miniSong = document.getElementById("miniSong");
const miniArtist = document.getElementById("miniArtist");
const miniPlayPause = document.getElementById("miniPlayPause");
const songListElement = document.getElementById('songList');
const overlay = document.getElementById('songListOverlay');



prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function loadSong(index) {
  const selected = songs[index];
  audio.src = selected.path;
  songName && (songName.innerText = selected.name);
  artistName && (artistName.innerText = selected.artist);
  songImg.src = selected.cover;
  updateMiniPlayer(selected);
  audio.load();
}

audio.onplay = () => songImg.classList.add("spin");
audio.onpause = () => songImg.classList.remove("spin");

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) sec = "0" + sec;
  return `${min}:${sec}`;
}

audio.onloadedmetadata = () => {
  progress.max = audio.duration;
  durationEl.innerText = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
  progress.value = audio.currentTime;
  currentTimeEl.innerText = formatTime(audio.currentTime);
};
progress.addEventListener("input", () => {
  console.log("Seek to: ", progress.value);
  audio.currentTime = progress.value;
});

function playPause() {
  if (audio.paused) {
    audio.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");

    miniPlayPause.classList.add("fa-pause");
    miniPlayPause.classList.remove("fa-play");
  } else {
    audio.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");

    miniPlayPause.classList.remove("fa-pause");
    miniPlayPause.classList.add("fa-play");
  }
}
  

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
  miniPlayPause.classList.add("fa-pause");
  miniPlayPause.classList.remove("fa-play");
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
  miniPlayPause.classList.add("fa-pause");
  miniPlayPause.classList.remove("fa-play");
}
 barsIcon.addEventListener("click", () => {
  const isVisible = !songListContainer.classList.contains('hidden');

  if (isVisible) {
    songListContainer.classList.add('hidden');
    overlay.classList.add('hidden');
  } else {
    songListContainer.classList.remove('hidden');
    overlay.classList.remove('hidden');
    miniPlayer.classList.remove('hidden');
    musicPlayer.classList.add('hidden');
  }
});


function populateSongList() {
  songListElement.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerText = `${song.name} — ${song.artist}`;
    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      ctrlIcon.classList.add("fa-pause");
      ctrlIcon.classList.remove("fa-play");
      togglePlayerView('main');
    });
    songListElement.appendChild(li);
  });
}

backIcon.addEventListener("click", () => {
  console.log("Back icon clicked");
  togglePlayerView('mini');
});

miniPlayer.addEventListener("click", () => {
  toghlePlayerView('main');
});

miniPlayPause.addEventListener("click", (e) =>{
  e.stopPropagation();
  playPause();
});

function updateMiniPlayer(song) {
  miniSong.innerText = song.name;
  miniArtist.innerText = song.artist;
};



songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.name} - ${song.artist}`;
  li.dataset.index = index;
  li.addEventListener('click', () => {
    loadSong(index); 
    togglePlayerView('main'); 
  });
  songListElement.appendChild(li);
});
function togglePlayerView(view) {
  if (view === 'mini') {
    musicPlayer.classList.add('hidden');
    miniPlayer.classList.remove('hidden');
    songListContainer.classList.add('hidden');
    overlay.classList.add('hidden');
  } else {
    musicPlayer.classList.remove('hidden');
    miniPlayer.classList.add('hidden');
    songListContainer.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}

document.querySelector('.mini-player').addEventListener('click', (e) => {
    if (e.target.closest('#miniPlayPause')) return;
  
  togglePlayerView('main');
});


populateSongList();
loadSong(currentSong);