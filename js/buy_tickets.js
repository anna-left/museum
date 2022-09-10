var ticketType;
var countBasic;
var countSenior;
var now = new Date();

const countB = document.getElementById("countB");
const countS = document.getElementById("countS");
const totalText = document.getElementById('totalText');

const countBFLeft = document.getElementById("countBFLeft");
const countSFLeft = document.getElementById("countSFLeft");

const countBF = document.getElementById("countBF");
const countSF = document.getElementById("countSF");
const totalTextF = document.getElementById('totalTextF');

const priceBasic = document.getElementById('priceBasic');
const priceSenior = document.getElementById('priceSenior');

const sumBasic = document.getElementById('sumBasic');
const sumSenior = document.getElementById('sumSenior');

const priceBasicLeft = document.getElementById('priceBasicLeft');
const priceSeniorLeft = document.getElementById('priceSeniorLeft');

const bookDate = document.getElementById('book__date');
const OverviewDate = document.getElementById('Overview__date');
const bookTime = document.getElementById('book__time');

var minDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2)
var maxDate = String(now.getFullYear()+1) + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2)

bookDate.value = minDate;
bookDate.min = minDate;
bookDate.max = maxDate;
OverviewDate.innerText = now.toDateString()
Overview__time.innerText = bookTime.value;

bookDate.addEventListener("change", function (e) {
    let curDate = new Date(bookDate.value);
    OverviewDate.innerText = curDate.toDateString()
});
bookTime.addEventListener("change", function (e) {Overview__time.innerText = bookTime.value});

// calcTicket();

function calcTicket(){
    let price = 0;

    if (document.getElementById ('type1').checked) {price = 20;ticketType = 1}
    if (document.getElementById ('type2').checked) {price = 25;ticketType = 2}
    if (document.getElementById ('type3').checked) {price = 40;ticketType = 3}

    priceBasic.innerText = 'Basic (' + String(price) + ' €)';
    priceSenior.innerText = 'Senior (' + String(price/2) + ' €)';
    
    priceBasicLeft.innerText = 'Basic 18+ (' + String(price) + ' €)';
    priceSeniorLeft.innerText = 'Senior 65+ (' + String(price/2) + ' €)';
    
    sumBasic.innerText = String(price*countBasic) + ' €';
    sumSenior.innerText = String(price*countBasic/2) + ' €';

    countBasic = Number(document.getElementById ('countB').value);
    countSenior = Number(document.getElementById ('countS').value);
    
    let totalSum = price*(countBasic + countSenior/2);
    totalText.innerText = "Total € " + String(totalSum);
    totalTextF.innerText = "Total € " + String(totalSum);

    localStorage.setItem('countBasic', countBasic);
    localStorage.setItem('countSenior', countSenior);
    localStorage.setItem('ticketType', ticketType);
}

function changeValuesB(numb) {
    countB.value = Math.max(Number(countB.value) + numb,0);
    countBFLeft.value = countB.value;
    countBF.innerText = countB.value;
    calcTicket();    
}
function changeValuesS(numb) {
    countS.value = Math.max(Number(countS.value) + numb,0);
    countSFLeft.value = countS.value;
    countSF.innerText = countS.value;
    calcTicket();      
}

function isValidPhone(myPhone) { 
   return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(myPhone); 
} 


// ********************************************************************
document.getElementById("countBDown").addEventListener("click", function (e) {
    changeValuesB(-1)
});
document.getElementById("countBUp").addEventListener("click",  function (e) {
    changeValuesB(+1)
});
document.getElementById("countSDown").addEventListener("click", function (e) {
    changeValuesS(-1)
});
document.getElementById("countSUp").addEventListener("click",  function (e) {
    changeValuesS(+1)
});

document.getElementById("countBDownF").addEventListener("click", function (e) {
    changeValuesB(-1)
});
document.getElementById("countBUpF").addEventListener("click",  function (e) {
    changeValuesB(+1)
});
document.getElementById("countSDownF").addEventListener("click", function (e) {
    changeValuesS(-1)
});
document.getElementById("countSUpF").addEventListener("click",  function (e) {
    changeValuesS(+1)
});

countB.addEventListener("click",  function (e) {
    countBFLeft.value = countB.value;
    countBF.innerText = countB.value;
    calcTicket(); 
});
countS.addEventListener("click",  function (e) {
    countSFLeft.value = countS.value;
    countSF.innerText = countS.value;
    calcTicket(); 
});

document.getElementById("type1").addEventListener("click", function (e) {
    document.querySelector('#book__Type').getElementsByTagName('option')[1].selected = true;
    document.querySelector('#Overview__temporary').innerText = 'Permanent exhibition';
    calcTicket()});
document.getElementById("type2").addEventListener("click", function (e) {
    document.querySelector('#book__Type').getElementsByTagName('option')[2].selected = true;
    document.querySelector('#Overview__temporary').innerText = 'Temporary exhibition';
    calcTicket()});
document.getElementById("type3").addEventListener("click", function (e) {
    document.querySelector('#book__Type').getElementsByTagName('option')[3].selected = true;
    document.querySelector('#Overview__temporary').innerText = 'Combined Admission';
    calcTicket()});
document.getElementById("book__Type").addEventListener("change", function (e) {
    for (let i = 1; i <= 3; i++) {
        let curType = document.querySelector('#book__Type').getElementsByTagName('option');
    if (curType[i].selected) {
        document.getElementById("type"+i).checked = true;
        document.querySelector('#Overview__temporary').innerText = curType[i].innerText;
    }
    }
    calcTicket()});

//************************************************************* */
// ripple effect
document.getElementById("button__book").addEventListener("click", function (e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (button.offsetLeft + radius)
        } px`;

    circle.style.top = `${e.clientY - (button.offsetTop + radius)} px`;
    circle.classList.add('circle');

    const ripple = button.getElementsByClassName('circle')[0];
    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);
});

document.getElementById("button__buy__now").addEventListener("click", function (e) {

    openForm = true;
    function closeForm() {
        document.querySelector('.overlay').classList.add('overlay__yes');
        document.querySelector('.overlay').classList.remove('overlay__no');
        document.querySelector('.book__tickets__form').classList.add('book__tickets__form__yes');
        document.querySelector('.book__tickets__form').classList.remove('book__tickets__form__no');
    }

    setTimeout(closeForm, 500);

});

document.getElementById("overlay").addEventListener("click", closeForm);

document.getElementById("button__close").addEventListener("click", closeForm);

function closeForm() {
    openForm = false;
    document.querySelector('.overlay').classList.add('overlay__no');
    document.querySelector('.overlay').classList.remove('overlay__yes');
    document.querySelector('.book__tickets__form').classList.add('book__tickets__form__no');
    document.querySelector('.book__tickets__form').classList.remove('book__tickets__form__yes');
}

function ready() {
    countBasic = localStorage.getItem('countBasic');
    countSenior = localStorage.getItem('countSenior');
    ticketType = localStorage.getItem('ticketType');
    countBasic = (countBasic==='null')? 1 : Number(countBasic);
    countSenior = (countSenior==='null')? 1 : Number(countSenior);
    ticketType = (ticketType==='null')? 1 : Number(ticketType);
    document.getElementById('type' + ticketType).checked=true;
    document.querySelector('#book__Type').getElementsByTagName('option')[ticketType].selected = true;
    document.querySelector('#Overview__temporary').innerText = document.querySelector('#book__Type').getElementsByTagName('option')[ticketType].innerText;
    
    countB.value = countBasic;
    countBFLeft.value = countB.value;
    countBF.innerText = countB.value;
    
    countS.value = countSenior;
    countSFLeft.value = countS.value;
    countSF.innerText = countS.value;

    calcTicket();

}





/*   --------------------------------------------------------------*/
/*  Функция для прокрутки с контролем скорости
/*  --------------------------------------------------------------*/
function scrollTo(to, duration = 700) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
            else {
                element.scrollTop = to;
            }
        };
    animateScroll();
}

document.addEventListener('DOMContentLoaded', function () {
    let btn = document.querySelector('#buttonUp');
    // При клике прокручиваем на самый верх
    btn.onclick = function (click) {
        click.preventDefault();
        // Вызываем функцию, первый аргумент - отступ, второй - скорость скролла, чем больше значение, тем медленнее скорость прокрутки
        scrollTo(0, 400);
    }
});

// ***********************************
// перезагружена страница - установим сохраненные значения
document.addEventListener("DOMContentLoaded", ready);