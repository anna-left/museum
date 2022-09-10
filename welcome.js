const arrow__left = document.querySelector('.arrow__left')
const arrow__right = document.querySelector('.arrow__right')
const welcome__block = document.querySelector('welcome__block')

// background: url(../assets/img/welcome_background.jpg) right bottom no-repeat;
// const arr = [];
// for (let i = 1; i < 5; i++) {
//     arr[i].push(i);
// }
let curImg = 1;

arrow__left.addEventListener('click', () => changeSlide('left', true))
butarrow__righttonDown.addEventListener('click', () => changeSlide('right', true))


const addSlide = () => {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = `assets/img/galery/galery1.jpg`;
    img.alt = `galery1`;
    pictureInnerContainer.append(img);  
    
    const img = `<img class="gallery-img" src="assets/img/galery/galery1.jpg" alt="galery1">`;
    pictureInnerContainer.innerHTML = img;
}


const changeSlide = (direction, isButton) => {
    // const sliderHeight = sliderContainer.clientHeight
    if (direction === 'left') {
        curImg = (curImg===5)? 0 : curImg++;
        if (isButton === true) {
            // для того чтобы анимация кнопки срабатывала каждый раз 
            buttonUp.classList.remove('progress-up');
            void buttonUp.offsetWidth;
            buttonUp.classList.add('progress-up');
        }

        

        const lastName = slideLeft.querySelector('div:last-child');
        const firstName = slideLeft.querySelector('div:first-child');
        slideLeft.insertBefore(lastName, firstName);
        // setTimeout(() => slideLeft.classList.add("animate"), i * 500);

        const lastPicture = slideRight.querySelector('.slide');
        const firstPicture = slideRight.querySelector('div:first-child');
        slideRight.appendChild(lastPicture);

    } else if (direction === 'down') {
        if (isButton === true) {
            // для того чтобы анимация кнопки срабатывала каждый раз 
            buttonDown.classList.remove('progress-down');
            void buttonDown.offsetWidth;
            buttonDown.classList.add('progress-down');
        }

        
        const lastName = slideLeft.querySelector('div:last-child');
        const firstName = slideLeft.querySelector('div:first-child');
        slideLeft.appendChild(firstName);

        const lastPicture = slideRight.querySelector('div:last-child');
        const firstPicture = slideRight.querySelector('div:first-child');
        slideRight.insertBefore(lastPicture, firstPicture);

    }
}


