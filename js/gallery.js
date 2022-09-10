const galleryPict = document.querySelectorAll('.gallery__pict');
const gallery = document.querySelector('.gallery__inner__container');

function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function ready() {
    // alert('DOM готов');

    let arr = [];
    let h = 0;
    // const heightCol = gallery.getAttribute('max-height');

    galleryPict.forEach((el) => {
        let src = el.getAttribute('src');
        let width = el.getAttribute('width');
        let height = el.getAttribute('height');
        let obj = { src: src, width: width, height: height };
        arr.push(obj);
    });

    arr = shuffle(arr);
    let n = 0;
    let p = 1;
    galleryPict.forEach((el) => {
        let hightEl = Number(arr[n]['height']);
        // (2840)
        if ((h + hightEl > 2840 && p === 1) || (h + hightEl > 2915 && p === 2)) {
            p++;
            h = hightEl;
        } else { h = h + hightEl; }
        if (n === 0 || (p === 3 && h === hightEl)) {
            el.classList.add('gallery__pict__padd');
        } else { el.classList.remove('gallery__pict__padd') }
        el.setAttribute('width', arr[n]['width']);
        el.setAttribute('height', arr[n]['height']);
        el.setAttribute('src', arr[n]['src']);
        n++;
    });
}

document.addEventListener("DOMContentLoaded", ready);



// const i = document.querySelectorAll(".gallery-wrapper");
//             let c = !1;
//             function o() {
//                 i.forEach((e=>{
//                     !function(e) {
//                         const t = e.getBoundingClientRect()
//                           , n = t.top
//                           , i = t.bottom
//                           , c = t.height;
//                         return n + c >= 0 && c + window.innerHeight >= i
//                     }(e) ? e.classList.remove("active") : e.classList.add("active")
//                 }
//                 ))
//             }

let flag = !1;
function changeClassGallery() {
    galleryPict.forEach((e=>{
        !function(e) {
            let lSizes = e.getBoundingClientRect()
            let lTop = lSizes.top
            let lBottom = lSizes.bottom
            let lHeight = lSizes.height
            return lTop + lHeight >= 0 && lHeight + window.innerHeight >= lBottom
        }(e) ? e.classList.remove("gallery__pict__active") : e.classList.add("gallery__pict__active")
    }
    ))
}

document.addEventListener("DOMContentLoaded", changeClassGallery),
            window.addEventListener("scroll", (function(e) {
                0 == flag && window.requestAnimationFrame((function() {
                    changeClassGallery(),
                    flag = !1
                }
                )),
                flag = !0
            }
            ), !1)

// window.addEventListener('scroll', () => {
//     console.log('scroll')
// })
