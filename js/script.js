document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        playSong();
    }
    else if(e.keyCode == 78){
        playNext();
    }
    else if(e.keyCode == 80){
        playPrev();
    }
    else{
    }
}

var songsList = [
    {name:"Closer", artist:"The Chainsmokers", cover:"../songs/closer.jpg", url:"../songs/Closer.mp3", duration:"4:21"},
    {name:"Photograph", artist:"Ed Sheeran", cover:"../songs/perfect.jpeg", url:"../songs/Photograph.mp3",  duration:"4:24"},
    {name:"Love Yourself", artist:"Justin Bieber", cover:"../songs/love.png", url:"../songs/Love Yourself.mp3", duration:"04:02"},
    {name:"Free", artist:"Lenka", cover:"../songs/Free.jpg", url:"../songs/Free.mp3", duration:"3:20"},
    {name:"Everything At Once", artist:"Lenka", cover:"https://img.discogs.com/u7o4RUjl9HShAXaUzzVfvmsMyq0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-4109489-1355535022-8085.jpeg.jpg", url:"../songs/Everything At Once.mp3", duration:"02:42"},
];

var carArray = songsList.slice(0,3);
var isPlaying = false;
var audioPlayer = document.getElementById("audioPlayer");
audioPlayer.src = carArray[0].url;
var last = 3;
var prev = songsList.length - 1;


var playBtn = document.getElementById("playBtn");

var progressBar = document.getElementById("progressBar");



var carousel = document.querySelectorAll(".currentPlayer  > input");
var carouselImage = document.querySelectorAll("#cards  > label > img");
let i = 0;
carouselImage.forEach((e)=>{
    e.src = carArray[i++].cover;
})
carouselImage[2].src = songsList[songsList.length - 1].cover;


var songList = document.getElementById("songList");

// for(let i = 0; i < songsList.length; i++)
var a = document.createElement("audio");
var num = 0;

songsList.forEach((elem)=>{   
            
    songList.innerHTML += `
    <div class="songDetails" id =${num} onclick = playASong(${num})>
        <span class="songName"><i class="fa fa-play-circle-o"></i> ${songsList[num].name}</span>
        <span class="artistName">${songsList[num].artist}</span>
        <span class = "songDuration">${songsList[num].duration}</span>
    </div>
    `;
    num++;
    });


function playASong(id)
{

    audioPlayer.src = songsList[id].url;
    if(isPlaying)
    {
        playSong();
        playSong();
    }
    else{
        playSong();
    }
    last = inRange(id + 3, songsList.length);
    prev = inRange(id - 1, songsList.length);
    var next = inRange(id + 1, songsList.length);

    carArray[0] = songsList[id];
    carArray[1] = songsList[next]
    carArray[2] = songsList[inRange(id+2, songsList.length)]


    carouselImage[0].src = carArray[0].cover;
    carouselImage[1].src = carArray[1].cover;
    carouselImage[2].src = songsList[prev].cover;
    selectedSong(inRange(prev+1, songsList.length));


}


function playSong() {
    if (isPlaying) {
        isPlaying = false;
        playBtn.classList.add("fa-play-circle");
        playBtn.classList.remove("fa-pause-circle");
        carousel[0].checked = true;
        audioPlayer.pause();
    }
    else {

        isPlaying = true;
        var currentPlaying = document.getElementById(inRange(prev+1, songsList.length));

        currentPlaying.classList.add("musicSelected");
        audioPlayer.play();
        carousel[0].checked = true;
        playBtn.classList.add("fa-pause-circle");
        playBtn.classList.remove("fa-play-circle");
        setInterval(changeProgress,1000);
    }
}

function playNext() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = 0;
    }
    
    let temp = carArray.shift();
    carArray.push(songsList[last]);
    last++;
    prev++;
    
    
    
    
    prev = inRange(prev,songsList.length);
    last = inRange(last, songsList.length);

    

    audioPlayer.src = carArray[0].url;;
    let i = 0;
    carouselImage.forEach((e)=>{
        e.src = carArray[i++].cover;
    });
    carouselImage[2].src = temp.cover; 
    selectedSong(inRange(prev+1, songsList.length));


    
    playSong();
}

function playPrev() {

    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = 0;
    }
    
    let temp = carArray.pop();
    carArray.unshift(songsList[prev]);
    prev--;
    last--;


    prev = inRange(prev,songsList.length);
    last = inRange(last, songsList.length);
    
    

    audioPlayer.src = carArray[0].url;;
    let i = 0;
    carouselImage.forEach((e)=>{
        e.src = carArray[i++].cover;
    });
    carouselImage[2].src = songsList[prev].cover; 
    selectedSong(inRange(prev+1, songsList.length));


    playSong();
}

function changeProgress()
{
    progressBar.value = audioPlayer.currentTime;
    progressBar.max = audioPlayer.duration;
    if(audioPlayer.ended)
    {
        playNext();
    }
}

function selectedSong(id)
{
    var chosen = document.getElementsByClassName("songDetails");
    for(let i = 0; i < chosen.length; i++){
        if(i == id)
            chosen[i].classList.add("musicSelected");
        else{
            chosen[i].classList.remove("musicSelected");
        }
    }
    
}

function inRange(n, length){
    if(n > length - 1)
    {
        return n % length;
    }
    else if(n < 0)
    {
        return length - 1;
    }

    return n;
}

function changeTime(){
    audioPlayer.currentTime = progressBar.value;
}