console.log("welcome ")
//intialise the variables
let songindex=1;
let audioElement=new Audio('1.mp3');
let masterPlay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Perfect-Ed Sheeran", filePath: "1.mp3", coverPath: "cover 1.jpg"},
    {songName: "Tum Se Hi-Pritam,Mohit Chauhan", filePath: "2.mp3", coverPath: "cover 2.jpg"},
    {songName: "Saiyyan-kailash Kher", filePath: "3.mp3", coverPath: "cover 3.jpg"},
    {songName: "Pehli Nazar Mein-Atif Aslam", filePath: "4.mp3", coverPath: "cover 4.jpg"},
    {songName: "Khamoshiyan - Arijit Singh", filePath: "5.mp3", coverPath: "cover 5.jpg"},
    {songName: "Mann Mera - Gajendra Verma", filePath: "6.mp3", coverPath: "cover 6.jpg"},
    {songName: "Baatein Karo - Vayu", filePath: "7.mp3", coverPath: "cover 7.jpg"},
    {songName: "chaand Baaliyan - Aditya A", filePath: "8.mp3", coverPath: "cover 8.jpg"},
    {songName: "Mera Pehla Pehla Pyaar - KK", filePath: "9.mp3", coverPath: "cover 9.jpg"},
    {songName: "Khuda Jaane -KK ", filePath: "10.mp3", coverPath: "cover 10.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
})
//handel play /pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        cs=document.getElementById(`${songindex}`);
        cs.target.classList.remove('fa-pause-circle');
        cs.target.classList.add('fa-play-circle');
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
    if(progress==100){
        if(songindex>=10){
            songindex = 1
        }
        else{
            songindex += 1;
        }
        audioElement.src = `${songindex}.mp3`;
        masterSongName.innerText= songs[songindex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
})
myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})
//listen on song click
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
const makeAllPause = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{


    element.addEventListener('click', (e)=>{ 
        //if(e.target.classList.('fa-play-circle'))

        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `${songindex}.mp3`;
        masterSongName.innerText = songs[songindex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
//listen on click next
document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=10){
        songindex = 1
    }
    else{
        songindex += 1;
    }
    audioElement.src = `${songindex}.mp3`;
    masterSongName.innerText= songs[songindex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
})
//listen on click previous
document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=1){
        songindex = 10;
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `${songindex}.mp3`;
    masterSongName.innerText = songs[songindex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})