const videoContainer = document.querySelector('.video__container');
const video = videoContainer.querySelector('.viewer');
const fullScreenControl = videoContainer.querySelector('.full__screen__control');
const fullScreenButton = videoContainer.querySelector('.full__screen__control>img');
const progressControl = videoContainer.querySelector('.progress__control');
const playControl = videoContainer.querySelector('.play__control');
const symbPlay = videoContainer.querySelector('.play__control>img');
const muteСontrol = videoContainer.querySelector('.mute__control');
const muteСontrolImg = videoContainer.querySelector('.mute__control>img');
const volumeControl = videoContainer.querySelectorAll('.volume__control');
const playBg = document.querySelector('.play__ico__bg');
const volume = document.querySelector('.volume__control');

let openForm = false;

let curVolume = 0.5;
video.volume = curVolume;
volume.value = curVolume;
video.playbackRate = 1;
video.currentTime = 0;
styleRangeUpdate(volume);

function toggleFullScreen() {

    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        fullScreenButton.src = './assets/svg/fullscreen_exit.svg';
        videoContainer.style.maxWidth = '100%';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullScreenButton.src = './assets/svg/full_screen.svg';
        }
    }
}

function togglePlay() {
    if (video.paused) {
        playBg.classList.remove('play__ico__bg__img');
        video['play']();
    }
    else {
        playBg.classList.add('play__ico__bg__img');
        video['pause']();
    }
}

function сrossMute() {
    muteСontrolImg.src = './assets/svg/mute__stop.svg';
}

function сrossMuteNo() {
    muteСontrolImg.src = './assets/svg/mute__control.svg';
}

function toggleMute() {
    if (video.volume > 0) {
        curVolume = video.volume;
        video.volume = 0;
        volume.value = 0;
        сrossMute();
    } else {
        video.volume = curVolume;
        сrossMuteNo();
        volume.value = curVolume;
    }

    styleRangeUpdate(volume);
}

function updateButton() {
    // изменяет иконку play-pause
    const icon = this.paused ? './assets/svg/play.svg' : './assets/svg/pause.svg';
    symbPlay.src = icon;
}

function styleRangeUpdate(curElem) {
    const percent = 100 * (curElem.value - curElem.min) / (curElem.max - curElem.min);
    curElem.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${percent}%, #B3B3B3 ${percent}%, #B3B3B3 100%)`;
}

// прогрессор времени проигрывания
function displayProgress() {
    let percent = video.currentTime / video.duration * 100;
    progressControl.value = percent;

    progressControl.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${percent}%, #b3b3b3 ${percent}%, #b3b3b3 100%)`

    if (video.currentTime === video.duration) {
        playBg.classList.add('play__ico__bg__img');
    }
}

function handleProgressUpdate() {
    video[this.name] = (video.currentTime / video.duration) * 100;
    styleRangeUpdate(this);
}
function handleVolumeUpdate() {
    video[this.name] = this.value;
    if (this.value === "0") {
        сrossMute();
    }
    else {
        сrossMuteNo();
    }
    styleRangeUpdate(this);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressControl.style.flexBasis = `${percent}%`;
    video['currentTime'] = this.value;
    styleRangeUpdate(this);
}

//устанавливаем заданное время
function scrub(e) {
    const scrubTime = (e.offsetX / progressControl.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    displayProgress(this);
}

fullScreenControl.addEventListener('click', toggleFullScreen);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
playBg.addEventListener('click', togglePlay)

playControl.addEventListener('click', togglePlay);
muteСontrol.addEventListener('click', toggleMute);
volumeControl.forEach(range => range.addEventListener('change', handleVolumeUpdate));
volumeControl.forEach(range => range.addEventListener('mousemove', handleVolumeUpdate));
video.addEventListener('timeupdate', displayProgress);
video.addEventListener('change', displayProgress);
video.addEventListener('mousemove', displayProgress);

progressControl.addEventListener('click', scrub);

document.addEventListener('keyup', function (curSymb) {
    if (openForm) {
        return;
    }
    let code = curSymb.code;
    let key;
    if (curSymb.key !== undefined) {
        key = curSymb.key;
    } else if (curSymb.keyIdentifier !== undefined) {
        key = curSymb.keyIdentifier;
    } else if (curSymb.keyCode !== undefined) {
        key = curSymb.keyCode;
    }

    if ('0123456789'.indexOf(key) !== -1) {
        video.currentTime = video.duration * Number(key) / 10;
    } else if (key === '<' || key === 'Б') {
        let presValue = Math.max(video.playbackRate - 0.1, 0.5);
        video.playbackRate = presValue;
        speed.value = presValue;
        styleRangeUpdate(speed);

    } else if (key === '>' || key === 'Ю') {
        let presValue = Math.min(video.playbackRate + 0.1, 2);
        video.playbackRate = presValue;
        speed.value = presValue;
        styleRangeUpdate(speed);

    } else if (key === 'ArrowUp') {
        let presValue = Math.min(video.volume + 0.1, 1);
        video.volume = presValue;
        volume.value = presValue;
        styleRangeUpdate(volume);
    } else if (key === 'ArrowDown') {
        let presValue = Math.max(video.volume - 0.1, 0);
        video.volume = presValue;
        volume.value = presValue;
        styleRangeUpdate(volume);
    } else if (curSymb.shiftKey) {
        if (code === ',') {
            video.playbackRate = Math.max(video.playbackRate - 0.1, 0);
            styleRangeUpdate(speed);
        } else if (code === '.') {
            video.playbackRate = Math.min(video.playbackRate + 0.1, 2);
            styleRangeUpdate(speed);
        }
    }

})

document.addEventListener('keydown', function (event) {
    if (openForm) {
        return;
    }
    switch (event.code) {
        case "Space":
            event.preventDefault();
            togglePlay();
            updateButton();
            break;
        case "KeyM":
            event.preventDefault();
            toggleMute();
            break;
        case "KeyF":
            event.preventDefault();
            toggleFullScreen();
            break;
        case "KeyJ":
            event.preventDefault();
            video.currentTime += -10;
            break;
        case "KeyL":
            event.preventDefault();
            video.currentTime += 10;
            break;
        case "KeyK":
            event.preventDefault();
            togglePlay();
            updateButton();
            break;
        default:

            break;
    }
});


// ******************************************************

const videoViewer = videoContainer.querySelector('.viewer');
const videoCarousel = document.querySelector('.video__carousel')

const videoCards = document.querySelectorAll('.video__carousel>div')
const iframes = document.querySelectorAll('.video__carousel>div>iframe')
const switchers = document.querySelectorAll('.video__slider__switcher')
const videoLeft = document.querySelector('.video__slider__left')
const videoRight = document.querySelector('.video__slider__right')

const widthCard = videoCards.offsetWidth;

const sources = [];
const posters = [];
const bigVideo = [];
for (let i = 0; i <= 4; i++) {
    sources.push('./assets/video/video' + i + '.mp4');
    posters.push('./assets/img/posters/poster' + i + '.jpg');
    bigVideo.push(iframes[i]);
}

let curIndexVideo = 0;
videoViewer.src = sources[curIndexVideo];
videoViewer.poster = posters[curIndexVideo];
stylizeSwitcher(curIndexVideo)

function stylizeSwitcher(par) {
    for (let i = 0; i < switchers.length; i++) {
        if (i === par) {
            switchers[i].style.backgroundColor = "#000000";
        }
        else {
            switchers[i].style.backgroundColor = "#999999";
        }
    }
}

function switchVideoBullet(par) {
    difference = curIndexVideo - par;
    if (difference > 0) {
        for (let i = 1; i <= difference; i++) {
            changeVideo('left', true);
        }
    }
    if (difference < 0) {
        for (let i = 1; i <= -difference; i++) {
            changeVideo('right', true);
        }
    }
}

function stopVideo(par) {
    for (let i = 0; i < 5; i++) {
        if (par !== i) {
            let iframe = iframes[i].contentWindow;
            func = 'pauseVideo';
            iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
        }
    }
}

var monitor0 = setInterval(function () {
    var elem = document.activeElement;
    for (let i = 0; i < 5; i++) {
        if (elem && elem.id == 'video' + i) {
            stopVideo(i);
            // clearInterval(monitor0);
        }
    }
}, 100);


for (let i = 0; i < 5; i++) {
    switchers[i].addEventListener('click', () => switchVideoBullet(i));
}

for (let i = 0; i < 5; i++) {
    videoCards[i].addEventListener('click', () => stopVideo(i));
}
for (let i = 0; i < 5; i++) {
    iframes[i].addEventListener('click', () => stopVideo(i));
}

videoLeft.addEventListener('click', () => changeVideo('left'));
videoRight.addEventListener('click', () => changeVideo('right'));

const changeVideo = (direction,) => {
    stopVideo(99);
    const lastName = videoCarousel.querySelector('div:last-child');
    const firstName = videoCarousel.querySelector('div:first-child');

    if (direction === 'left') {
        curIndexVideo--;
        curIndexVideo = (curIndexVideo === -1) ? 4 : curIndexVideo;
        videoCarousel.insertBefore(lastName, firstName);
        videoCarousel.style.transform = `translateX(${widthCard}px)`

    } else if (direction === 'right') {

        curIndexVideo++;
        curIndexVideo = (curIndexVideo === 5) ? 0 : curIndexVideo;
        videoCarousel.appendChild(firstName);
        videoCarousel.style.transform = `translateX(${-widthCard}px)`

    }
    stylizeSwitcher(curIndexVideo);
    videoViewer.src = sources[curIndexVideo];
    videoViewer.poster = posters[curIndexVideo];
    video.currentTime = 0;
    displayProgress(progressControl);
    togglePlay(); togglePlay();
    // progressControlBigVideo.value = 0;
    // progressControlBigVideo.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${0}%, #b3b3b3 ${0}%, #b3b3b3 100%)`

}