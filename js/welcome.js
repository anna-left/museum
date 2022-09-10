const welcomeSlider = document.querySelector('.welcome__slider')
const slides = document.querySelector('.welcome__slides')
const arrowLeft = document.querySelector('.arrow__left')
const arrowRight = document.querySelector('.arrow__right')
const slidesCount = welcomeSlider.querySelectorAll('.slide').length
const bullets = document.querySelector('.welcome__carousel').getElementsByTagName('button');
const sliderNumber = document.getElementById('slider__number')
const width = slides.offsetWidth;

let activeSlideIndex = 1
stylizeBullet(activeSlideIndex)
sliderNumber.innerText = `0${activeSlideIndex + 1}`
//slides.style.left = `-${(slidesCount - activeSlideIndex) * 100}vw`
slides.classList.remove('trans');
// slides.style.left = `-${(activeSlideIndex-1) * width}px`

function switchBullet(par) {
    difference = activeSlideIndex - par;
    if (difference > 0) {
        for (let i = 1; i <= difference; i++) {
            changeSlide('left', true);
        }
    }
    if (difference < 0) {
        for (let i = 1; i <= -difference; i++) {
            changeSlide('right', true);
        }
    }
}

for (let i = 0; i < 5; i++) {
    bullets[i].addEventListener('click', () => switchBullet(i));
}
arrowLeft.addEventListener('click', () => changeSlide('left', true))
arrowRight.addEventListener('click', () => changeSlide('right', true))

let org = "";
window.onload = function () {
    org = slides.offsetWidth;
}

function stylizeBullet(par) {
    for (let i = 0; i < bullets.length; i++) {
        if (i === par) {
            bullets[i].style.backgroundColor = "#9d8665";
        }
        else {
            bullets[i].style.backgroundColor = "#FFFFFF";
        }
    }
}

const changeSlide = (direction, isButton) => {
    // slides.classList.remove('trans');
    // setTimeout(slides.classList.add('trans'), 1000);
    // void slides.offsetWidth;
    // slides.classList.add('trans');

    const lastName = slides.querySelector('img:last-child');
    const firstName = slides.querySelector('img:first-child');

    if (direction === 'left') {

        activeSlideIndex--;
        activeSlideIndex = (activeSlideIndex === -1) ? 4 : activeSlideIndex;

        slides.insertBefore(lastName, firstName);

        // slides.style.transform = `translateX(${width}px)`

    } else if (direction === 'right') {

        activeSlideIndex++;
        activeSlideIndex = (activeSlideIndex === 5) ? 0 : activeSlideIndex;

        slides.appendChild(firstName);

        // slides.style.transform = `translateX(${width}px)`

        // slides.style.transform = `translateX(${-width}px)`

    }
    stylizeBullet(activeSlideIndex);
    sliderNumber.innerText = `0${activeSlideIndex + 1}`
    slides.classList.remove('trans');
}


// if (welcomeSlider.addEventListener) {
//     let nameEvent = '';
//     if ('onwheel' in document) {
//         // IE9+, FF17+, Ch31+
//         nameEvent = 'wheel';
//     } else if ('onmousewheel' in document) {
//         // устаревший вариант события
//         nameEvent = 'mousewheel';
//     } else {
//         // Firefox < 17
//         nameEvent = 'MozMousePixelScroll';
//     }
//     welcomeSlider.addEventListener(nameEvent, throttle(onWheel, 500));

// } else { // IE8-
//     welcomeSlider.attachEvent("onmousewheel", onWheel);
// }

// function throttle(fn, wait) {
//     var time = Date.now();
//     return function() {
//         if ((time + wait - Date.now()) < 0) {
//             fn();
//             time = Date.now();
//         }
//     }
// }

// function onWheel(e) {
//     e = e || window.event;

//     let delta = e.deltaY || e.detail || e.wheelDelta;
//     if (delta < 0) {
//         changeSlide('left', false);
//     } else {
//         changeSlide('right', false)
//     }
// }


// welcomeSlider.addEventListener('mousemove', throttle(onWheel, 500));



// function throttle(fn, wait) {
//     var time = Date.now();
//     return function() {
//         if ((time + wait - Date.now()) < 0) {
//             fn();
//             time = Date.now();
//         }
//     }
// }

// function onWheel(e) {
//     e = e || window.event;

//     let delta = e.deltaY || e.detail || e.wheelDelta;
//     if (delta < 0) {
//         changeSlide('left', false);
//     } else {
//         changeSlide('right', false)
//     }
// }

// mousemove  

