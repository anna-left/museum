// import comparsionExplorer from './explore.js';

document.querySelector('.burger__menu__icon').addEventListener('click', toggle);

document.querySelector('.burger__menu__link').addEventListener('click', toggle);

// document.querySelector('section').addEventListener('click', close);


const burgerMenu = document.querySelector('.burger__menu');
const welcomeText = document.querySelector('.welcome__text');
const burgerMenuIcon = document.querySelector('.burger__menu__icon');
const welcome__block = document.querySelector('.welcome__block');
const welcome__block__small = document.querySelector('.welcome__block__small');

const welcome__text__small = document.querySelector('.welcome__text__small');
const control__slider = document.querySelector('.control__slider');

const clientWidth = document.body.clientWidth;


function toggle() {
    if (burgerMenu.classList.contains('burger__menu__no')) {
        burgerMenu.classList.remove('burger__menu__no');
        burgerMenu.classList.add('burger__menu__yes');

        burgerMenuIcon.classList.remove('burger__open');
        burgerMenuIcon.classList.add('burger__close');



        if (clientWidth <= 768) {
            welcome__block.classList.remove('visible__yes');
            welcome__block.classList.add('visible__no');

            welcome__text__small.classList.remove('visible__yes');
            welcome__text__small.classList.add('visible__no');

            control__slider.classList.remove('visible__yes');
            control__slider.classList.add('visible__no');

            welcome__block__small.classList.remove('visible__no');
            welcome__block__small.classList.add('visible__yes');
        }
        else {
            welcomeText.classList.remove('visible__yes');
            welcomeText.classList.add('visible__no');
        }

    } else {
        close();
    }
}

function close() {
    burgerMenu.classList.remove('burger__menu__yes');
    burgerMenu.classList.add('burger__menu__no');

    function closeBurger() {

        burgerMenuIcon.classList.remove('burger__close');
        burgerMenuIcon.classList.add('burger__open');

        if (clientWidth <= 768) {
            welcome__block.classList.remove('visible__no');
            welcome__block.classList.add('visible__yes');

            welcome__text__small.classList.remove('visible__no');
            welcome__text__small.classList.add('visible__yes');

            control__slider.classList.remove('visible__no');
            // control__slider.classList.add('visible__yes');

            welcome__block__small.classList.remove('visible__yes');
            welcome__block__small.classList.add('visible__no');
        }
        else {
            welcomeText.classList.remove('visible__no');
            welcomeText.classList.add('visible__yes');
        }
    }

    setTimeout(closeBurger, 500);
}

// comparsionExplorer();




console.log(`
Самооценка: 150 / 150
Не выполненные/не засчитанные пункты:
1) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки
2) слайды перелистываются плавно с анимацией смещения вправо или влево
3) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр
4) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется)
Частично выполненные пункты:
1) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв
2) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры"
feedback: невалидные значения выделяются стилем - красной рамкой

54) Доп.функционал:
1) стрелка для прокрутки вверх;
2) в видеоплеере - доп.горячие клавиши
- Клавиша " k " приостановить или продолжить воспроизведение,
- Клавиша " j " — перемотать ролик на 10 секунд назад,
- Клавиша " l " — перемотать ролик на 10 секунд вперед,
- Клавиша " P " (Shift + p) — перейти к предыдущему видео,
- Клавиша " N " (Shift + n) — перейти к следующему видео,
- Стрелка вверх — увеличить громкость,
- Стрелка вниз — уменьшить громкость,
- Перейти к определенному моменту видео (например, при нажатии на цифру "7" ролик будет перемотан до временной отметки, которая соответствует 70% от длительности видео) 0..9


`);