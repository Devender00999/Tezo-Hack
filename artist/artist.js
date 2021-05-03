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
        // console.log(e.keyCode);
    }
}

var songsList = [
    {name:"Closer", streams:585, cover:"../songs/closer.jpg", url:"../songs/Closer.mp3", streamtime:"41"},
    {name:"Photograph", streams:458, cover:"../songs/perfect.jpeg", url:"../songs/Photograph.mp3",  streamtime:"46"},
    {name:"Love Yourself", streams:448, cover:"../songs/love.png", url:"../songs/Love Yourself.mp3", streamtime:"45"},
    {name:"Free", streams:480, cover:"../songs/Free.jpg", url:"../songs/Free.mp3", streamtime:"50"},
    {name:"Everything At Once", streams:585, cover:"https://img.discogs.com/u7o4RUjl9HShAXaUzzVfvmsMyq0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-4109489-1355535022-8085.jpeg.jpg", url:"../songs/Everything At Once.mp3", streamtime:"90"},
];

var carArray = songsList.slice(0,3);
var isPlaying = false;
var audioPlayer = document.getElementById("audioPlayer");
audioPlayer.src = songsList[0].url;
console.log("Duration: ", audioPlayer);
var last = 3;
var prev = songsList.length - 1;


var playBtn = document.getElementById("playBtn");


var carousel = document.querySelectorAll(".currentPlayer  > input");
var carouselImage = document.querySelectorAll("#cards  > label > img");
let i = 0;
carouselImage.forEach((e)=>{
    

    e.src = carArray[i++].cover;
})
carouselImage[2].src = songsList[songsList.length - 1].cover;
audioPlayer.src = carArray[0].url;


var songList = document.getElementById("songList");

// for(let i = 0; i < songsList.length; i++)
var a = document.createElement("audio");
var num = 0;
var songTime = [];
let myPromise;
songsList.forEach((elem)=>{   
            
    songList.innerHTML += `
    <div class="songDetails" id =${num} onclick = songPlayer(${num})>
        <span class="songName"><i class="fa fa-play-circle-o"></i> ${songsList[num].name}</span>
        <span class="artistName">${songsList[num].streams}</span>
        <span class = "songDuration">${songsList[num].streamtime}</span>
    </div>
    `;
    num++;
    });

function songPlayer(id)
{
    var a = document.getElementsByClassName('songDetails');
    for (let i=0; i<a.length;i++)
    {
        if (i == id)
        {
            a[i].classList.add("musicSelected");
            audioPlayer.src = songsList[i].url;
            console.log(i);
            playSong();

        }
        else{
            a[i].classList.remove("musicSelected");
        }
    }
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

        audioPlayer.play();
        carousel[0].checked = true;
        playBtn.classList.add("fa-pause-circle");
        playBtn.classList.remove("fa-play-circle");
        setInterval(change_vol,1000);
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

    console.log(temp);

    if(last > songsList.length - 1)
        last = 0;

    if(prev > songsList.length - 1)
        prev = 0;


    
    

    audioPlayer.src = carArray[0].url;;
    let i = 0;
    carouselImage.forEach((e)=>{
        e.src = carArray[i++].cover;
    });
    carouselImage[2].src = temp.cover; 

    
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


    if(last < 0)
        last = songsList.length - 1;

    if(prev < 0)
        prev = songsList.length - 1;

    console.log(carArray);
    audioPlayer.src = carArray[0].url;;
    let i = 0;
    carouselImage.forEach((e)=>{
        e.src = carArray[i++].cover;
    });

    // console.log(temp);
    carouselImage[2].src = songsList[prev].cover; 

    playSong();
}

function change_vol()
{
    var con = document.getElementById("change_vol");
    con.value = audioPlayer.currentTime;
    con.step = 0;
    con.max = audioPlayer.duration;
}

function chooseSong(id)
{
    var chosen = document.getElementById(id);
    chosen.classList.add("musicSelected");
}
