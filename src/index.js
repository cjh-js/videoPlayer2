const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");

// Timer Element
const timeBar = document.getElementById('time-bar');
const clickTime = document.getElementById('time');
const timer = document.getElementById('timer');

// Full Screen Element
const fullSBtn = document.getElementById('fullscreen');
const videoContainer = document.getElementById('videoContainer');

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value }
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

// Time Functions
function updateTime(e){
  // Time Bar Update
  const {duration, currentTime} = e.target;
  const progressPercent = (currentTime / duration) * 100;
  timeBar.style.width = `${progressPercent}%`;

  // Time Text Update
  let minutes = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime - minutes * 60);
  timer.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function setVideoTime(){
  video.currentTime = (timeBar.value * video.duration) / 100;
}

function stopVideo(){
  video.pause();
  video.currentTime = 0;
  psBtn.className = "fas fa-play";
}

function changeTime(e){
  const width = clickTime.clientWidth;
  const clickX = e.offsetX;
  const duration = video.duration;
  video.currentTime = (clickX / width) * duration;
}

// Full Screen Function
function getFullScreen(){
  const fullscreen = document.fullscreenElement;
  if(fullscreen){
    document.exitFullscreen();
    fullSBtn.innerText = 'Enter Full Screen';
  } else{
    videoContainer.requestFullscreen();
    fullSBtn.innerText = 'Exit Full Screen';
  }
}

psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);

// Time Event Listeners
video.addEventListener('timeupdate', updateTime);
timeBar.addEventListener('input', setVideoTime);
video.addEventListener('ended', stopVideo);
clickTime.addEventListener('click', changeTime);

// Full Screen Event
fullSBtn.addEventListener('click', getFullScreen);
document.addEventListener('keydown', (e) => {

  // 'F' Event
  const fullscreen = document.fullscreenElement;
  if(e.keyCode === 70 && !fullscreen){
    videoContainer.requestFullscreen();
    fullSBtn.innerText = 'Exit Full Screen';
  }

  // Space Bar Event
  if(e.keyCode === 32 && video.paused){
    video.play();
    psBtn.className = "fas fa-pause";
  } else if(e.keyCode === 32 && !video.paused){
    video.pause();
    psBtn.className = "fas fa-play";
  }
});