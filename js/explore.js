function comparsionExplorer() {

  const exploreBefore = document.querySelector('.explore__before')
  const exploreAfter = document.querySelector('.explore__after')
  const exploreBeforeImg = document.querySelector('.explore__before__img')

  function changeDivision(curImg) {
    // const w = curImg.offsetWidth;
    const w = exploreAfter.offsetWidth;
    const exploreSlider = document.createElement('DIV');
    let clicked = 0;

    exploreSlider.classList.add('explore__picture__slider');
    curImg.insertAdjacentElement('afterend', exploreSlider);
    slideDefault();

    //мышь нажата
    exploreSlider.addEventListener('mousedown', slideReady);
    // мышь отпущена
    window.addEventListener('mouseup', slideFinish);

    exploreSlider.addEventListener('touchstart', slideReady);
    window.addEventListener('touchend', slideFinish);
    window.addEventListener('resize', slideDefault);

    function slideReady(e) {
      //предотвратить действия по умолчанию
      e.preventDefault();
      clicked = 1;
      //мышь движется
      window.addEventListener('mousemove', slideMove);
      window.addEventListener('touchmove', slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      let curPos;

      if (clicked == 0) return false;
      curPos = getCursorPos(e);
      if (curPos < 0) curPos = 0;
      if (curPos > w) curPos = w;
      curImg.style.width = curPos + 'px';
      exploreSlider.style.left = curImg.offsetWidth - exploreSlider.offsetWidth / 2 + 'px';
    }
    function getCursorPos(e) {
      let x = 0;
      e = e || window.event;
      //координаты
      let a = curImg.getBoundingClientRect();
      x = (e.pageX || e.changedTouches[0].pageX) - a.left;
      x = x - window.pageXOffset;
      return x;
    }

    function slideDefault() {
      curImg.style.width = '61.11%';
      exploreBeforeImg.style.height = exploreAfter.offsetHeight + 'px';
      exploreSlider.style.height = exploreAfter.offsetHeight + 'px';
      exploreSlider.style.left = exploreBefore.offsetWidth - exploreSlider.offsetWidth / 2 + 'px';
    }
  }

  changeDivision(exploreBefore);
}

comparsionExplorer();