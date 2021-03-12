const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('.filters output');

const editorBtns = document.querySelectorAll('.btn');
const btnReset = document.querySelector('.btn-reset');
const btnNext = document.querySelector('.btn-next');
const btnLoad = document.querySelector('.btn-load');
const btnSave = document.querySelector('.btn-save');

const filters = document.querySelector('.filters');
const currentImg = document.querySelector('#editor-image');

const fullScreenBtn = document.querySelector('.fullscreen');

const requestFullScreen = (element) => {
    var requestMethod = element.requestFullScreen
        || element.webkitRequestFullScreen
        || element.mozRequestFullScreen
        || element.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

const removeClassActiveForBnts = () => {
    editorBtns.forEach((el) => {
        el.classList.remove('btn-active');
    });
}

const getRandomImage = (num) => {
   num = [Math.floor(Math.random() * 20) +1];
  
    if (num < 10) {
        number = '0' + num;
    } else {
        number = num;
    }

    return number;      
}

const setImage = () => {
   let today = new Date();
   let hour = today.getHours();

   if (hour < 6) {
       currentImg.src = `./assets/images/night/${getRandomImage()}.jpg`;      
   } else if (hour < 12) {
       currentImg.src = `./assets/images/morning/${getRandomImage()}.jpg`;
   } else if (hour < 18) {
       currentImg.src = `./assets/images/day/${getRandomImage()}.jpg`;
   } else {
       currentImg.src = `./assets/images/evening/${getRandomImage()}.jpg`;       
   }
   // console.log(currentImg.src); 
}

function changeStylesForImage() {
    const sizing = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + sizing);
}

function resetStylesForImage() {
    document.documentElement.style.setProperty(`--blur`, '0px');
    document.documentElement.style.setProperty(`--invert`, '0%');
    document.documentElement.style.setProperty(`--sepia`, '0%');
    document.documentElement.style.setProperty(`--saturate`, '100%');
    document.documentElement.style.setProperty(`--hue`, '0deg');    
}

fullScreenBtn.addEventListener('click', () => {
    requestFullScreen(document.body);
})

fullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
});

inputs.forEach(input => input.addEventListener('input', changeStylesForImage));

filters.addEventListener('input', (event) => {
    if (event.target.dataset.sizing != undefined) {
        for (i = 0; i < inputs.length; i++) {
            outputs[i].value = inputs[i].value;
        }
    }   
});

btnReset.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnReset.classList.add('btn-active');
   
    outputs[0].value = 0;
    outputs[1].value = 0;
    outputs[2].value = 0;
    outputs[3].value = 100;
    outputs[4].value = 0;

    inputs[0].value = 0;
    inputs[1].value = 0;
    inputs[2].value = 0;
    inputs[3].value = 100;
    inputs[4].value = 0;
    
    resetStylesForImage();
});

btnNext.addEventListener('click', () => {               
    removeClassActiveForBnts();
    btnNext.classList.add('btn-active');

    setImage();
});

btnLoad.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnLoad.classList.add('btn-active');

});
btnSave.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnSave.classList.add('btn-active');
});

setImage();