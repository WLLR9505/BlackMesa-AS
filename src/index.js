var soundName = document.getElementById('input');
var i = 0;

voxlist = document.getElementsByName('vox');
var soundList, vox, audioCTX, analyser, source, bufferLength, dataArray;

let canvas = document.getElementById('waves-sound');
let WIDTH = canvas.width;
let HEIGHT = canvas.height;

let sliceWidth = WIDTH * 1.0 / bufferLength;
const SPECIALCHARS = ['.', ',', '!', '?', ':'];

canvasCtx = canvas.getContext('2d');
canvasCtx.fillStyle = '#3e4637';
canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

function createAnalizer(sound) {
    audioCTX = new AudioContext();
    analyser = audioCTX.createAnalyser();
    source = audioCTX.createMediaElementSource(sound);
    source.connect(analyser);
    source.connect(audioCTX.destination);
    analyser.fftSize = 512;
    bufferLength = analyser.fftSize;
    dataArray = new Uint8Array(bufferLength);
}

function oscilloscope() {
    requestAnimationFrame(oscilloscope);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = '#3e4637';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 3;
    canvasCtx.strokeStyle = '#96882f';
    canvasCtx.beginPath();
    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}

function play() {
    vox = voxlist[0].checked ? 'vox' : 'vox2';
    soundList = soundName.value;
    for (let i = 0; i < SPECIALCHARS.length; i++) {
        soundList = soundList.replace(SPECIALCHARS[i], '');
    }
    console.log(soundList);
    
    soundList = soundList.split(' ');
    startAnnoucement();
}

function startAnnoucement() {
    var sound = new Audio();

    sound.src = `./src/sounds/${vox}/${soundList[i]}.wav`;
    createAnalizer(sound);
    oscilloscope();
    sound.play();
    sound.addEventListener('ended', next, false)
}

function next() {
    if (i === soundList.length - 1) {
        i = 0;
        return
    } else {
        i++;
    }
    play();
}

function showWindow(target) {
    let BMAS = document.getElementById('BMAS');
    let Settings = document.getElementById('Settings');
    let menu = document.getElementsByClassName('item-menu');

    if (target.innerText == 'BMAS') {
        BMAS.style.display = 'block';
        Settings.style.display = 'none';
        menu[0].style.color = '#96882f';
        menu[1].style.color = '#b1b39f';
        menu[0].style.zIndex = 3;
        menu[1].style.zIndex = 1;

    } else {
        Settings.style.display = 'block';
        BMAS.style.display = 'none';
        menu[1].style.color = '#96882f';
        menu[0].style.color = '#b1b39f';
        menu[1].style.zIndex = 3;
        menu[0].style.zIndex = 1;
    }
}
