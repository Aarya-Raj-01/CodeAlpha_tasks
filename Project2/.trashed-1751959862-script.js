/*let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar =
document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click',()=>{
  if(playBtn.className.includes('pause')){
    music.play();
}else{
   music.pause();
}
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

const setMusic = (i) => {
      seekBar.value = 0;
       let song = songs[i];
       currentMusic = i;
       music.src = song.path;

       songName.innerHTML =song.name;
       artistName.innerHTML = song.artist;
       disk.style.backgroundImage = `url('${song.cover}')`;

   currentTime.innerHTML = '00:00';
   setTimeout(() =>{
       seekBar.max = music.duration;
       musicDuration.innerHTML =  formatTime(music.duration);
},300);
}
setMusic(0);
 

const formatTime = (time) =>{
     let min = Math.floor(time/60);
     if(min<10){
          min = `0${min}`;
}
      let sec = Math.floor(time%60);
       if(sec < 10){
            sec = `0${sec}`;
}
  return `${min}:${sec}`;
}

setInterval(()=>{
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
},500)

    seekBar.addEventListener('change',() =>{
      music.currentTime=seekBar.value;
})

const playMusic = ()=>{
   music.play();
   playBtn.classList.remove('pause');
   disk.classList.add('play');
}

forwardBtn.addEventListener('click',() =>{
   if(currentMusic >= songs.length - 1)
{
   currentMusic = 0;
}else{
    currentMusic++;
}
setMusic(currentMusic);
playMusic();
})

backwardBtn.addEventListener('click',() =>{
   if(currentMusic <= 0)
{
   currentMusic = songs.length - 1;
}else{
    currentMusic--;
}
setMusic(currentMusic);
playMusic();
})   */
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) sec = "0" + sec;
  return `${min}:${sec}`;
}

song.onloadedmetadata = () => {
  progress.max = song.duration;
  progress.value = 0;
  currentTimeEl.innerText = "0:00";
  durationEl.innerText = formatTime(song.duration);
};
const setMusic = (i) => {
      seekBar.value = 0;
       let song = songs[i];
       currentMusic = i;
       music.src = song.path;

       songName.innerHTML =song.name;
       artistName.innerHTML = song.artist;
       disk.style.backgroundImage = `url('${song.cover}')`;
function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}
song.ontimeupdate = () => {
  progress.value = song.currentTime;
  currentTimeEl.innerText = formatTime(song.currentTime);
};
progress.oninput = () => {
  song.currentTime = progress.value;
};let currentSong = 0;
const music = document.querySelector('#audio');
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const ctrlIcon = document.getElementById("ctrlIcon");
const songImg = document.querySelector(".song-img");

song.onplay = () => songImg.classList.add("spin");
song.onpause = () => songImg.classList.remove("spin");

// Handle spin animation on play/pause
song.onplay = () => songImg.classList.add("spin");
song.onpause = () => songImg.classList.remove("spin");

// Format seconds to mm:ss
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) sec = "0" + sec;
  return `${min}:${sec}`;
}

song.onloadedmetadata = () => {
  progress.max = song.duration;
  durationEl.innerText = formatTime(song.duration);
};

song.ontimeupdate = () => {
  progress.value = song.currentTime;
  currentTimeEl.innerText = formatTime(song.currentTime);
};

progress.oninput = () => {
  song.currentTime = progress.value;
};

function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}

// Load first song on page load
loadSong(currentSong);