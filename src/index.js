var sound = document.getElementById('currentSound');
var soundName = document.getElementById('input');
var i = 0;

voxlist = document.getElementsByName('vox');
var soundList, vox;


function play() {
    vox = voxlist[0].checked ? 'vox' : 'vox2';
    soundList = soundName.value.split(' ');
    startAnnoucement();
}

function startAnnoucement() {
    sound.src = `./src/sounds/${vox}/${soundList[i]}.wav`;
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