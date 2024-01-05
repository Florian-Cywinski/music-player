// Create an individual audio interface

// To get all relevant elements of the HTML file
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;  //Which is ukulele

// Initially load song details (including the name, the image and the audio)
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;    // The defualt audio for audio.src in the HTML is src="images/ukulele.mp3"
    cover.src = `images/${song}.jpg`;   // The defualt value for cover.src in the HTML is src="images/ukulele.jpg"
};

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');  // i is the icon (i tag) we select with the class of fas (font awesome) - fa-play is the play icon we want to remove
    playBtn.querySelector('i.fas').classList.add('fa-pause');  // i is the icon (i tag) we select with the class of fas (font awesome) - fa-pause is the pause icon we want to add
    audio.play();   // To play the song
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');  // i is the icon (i tag) we select with the class of fas (font awesome) - fa-play is the play icon we want to add
    playBtn.querySelector('i.fas').classList.remove('fa-pause');  // i is the icon (i tag) we select with the class of fas (font awesome) - fa-pause is the pause icon we want to remove
    audio.pause();   // To pause the song
}

function prevSong() {
    songIndex--;    // To decrement the songIndex by 1

    if (songIndex < 0) {    // For the case the songIndex is -1 we set it to 2
        songIndex = songs.length -1;    // songs.length = 3 - -1 to have the last element of the array
    }

    loadSong(songs[songIndex]); // To load the specific song
    playSong(); // To play the song
}

function nextSong() {
    songIndex++;    // To increment the songIndex by 1

    if (songIndex > songs.length -1) {    // For the case the songIndex is 3 we set it to 0
        songIndex = 0;    // To set it back to 0 (first song)
    }

    loadSong(songs[songIndex]); // To load the specific song
    playSong(); // To play the song
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;   // Gives us the source Element which is the audio element - we wanna get from it the duration (length of the song) and the current time
    const progressPercent = (currentTime / duration) * 100; // To get the percentage of the progress
    progress.style.width = `${progressPercent}%`;   // progess is the progress bar
}

function setProgress(e) {
    const width = this.clientWidth; // 'this' referes to the element that we call the event on - clientWidth is the width of the progress bar
    const clickX = e.offsetX;   // To get the offset (x axis)
    const duration = audio.duration;    // To get the duration of the song

    audio.currentTime = (clickX / width) * duration;    // To set the current time respective to the progress bar setting
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');    // When it is playing the container has the class play - then it is true

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    };
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);   // It will fire up an update everytime time the time updates
progressContainer.addEventListener('click', setProgress);   // To change the progress of the song by clicking into the progress bar