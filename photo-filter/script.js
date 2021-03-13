const inputs = document.querySelectorAll('.filters input');
const outputs = document.querySelectorAll('.filters output');

const editorBtns = document.querySelectorAll('.btn');
const btnReset = document.querySelector('.btn-reset');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnLoad = document.querySelector('.btn-load');
const btnSave = document.querySelector('.btn-save');

const filters = document.querySelector('.filters');
const editorBlock = document.querySelector('.editor');
let currentImg = editorBlock.insertAdjacentHTML('beforeend', '<div id="editor-image"/></div>');

const fullScreenBtn = document.querySelector('.fullscreen');

let ind = 0;

currentImg = document.querySelector('#editor-image');

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

const viewImage = (url) => { 
    const img = new Image();
    img.src = url;
    img.onload = () => { 
        currentImg.style.backgroundImage = `url(${url})`;
    }
}

const getImagePrev= () => {    
    let today = new Date();
    let hour = today.getHours();
    let imgSrc;
    let number;
    let index;

    --ind;    
    
    if (ind < 0) {
        index = 20;
    } else if (ind === 0) {
        index = 20
    } else {
        index = ind % 20;  
    }
    
    if (ind <= 0) ind = 20; 
          
    if (index <= 9) {
        number = '0' + (index);
    } else {
        number = (index);
    }        

    if (hour < 6) {
        imgSrc = `./assets/images/night/${number}`;
    } else if (hour < 12) {
        imgSrc = `./assets/images/morning/${number}`;
    } else if (hour < 18) {
        imgSrc = `./assets/images/day/${number}`;
    } else {
        imgSrc = `./assets/images/evening/${number}.jpg`;       
    }    
    
    viewImage(imgSrc);
    
    btnNext.disabled = true;
    setTimeout(function() {
        btnNext.disabled = false
    }, 500);
}

const getImageNext = () => {    
    let today = new Date();
    let hour = today.getHours();
    let imgSrc;
    let number;
    let index; 

    ++ind;
    
    if (ind > 20) ind = 1;      
  
    if (ind === 20) {
        index = 20;
    } else {
        index = ind % 20;
    }
        
    if (index <= 9) {
        number = '0' + index ;
    } else {
        number = index;
    }        

    if (hour < 6) {
        imgSrc = `./assets/images/night/${number}`;
    } else if (hour < 12) {
        imgSrc = `./assets/images/morning/${number}`;
    } else if (hour < 18) {
        imgSrc = `./assets/images/day/${number}`;
    } else {
        imgSrc = `./assets/images/evening/${number}.jpg`;       
    }
        
    viewImage(imgSrc);    

    btnNext.disabled = true;
    setTimeout(function() {
        btnNext.disabled = false
    }, 500);
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

btnPrev.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnPrev.classList.add('btn-active');

    getImagePrev();
});

btnNext.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnNext.classList.add('btn-active');

    getImageNext();
});

btnLoad.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnLoad.classList.add('btn-active');

});
btnSave.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnSave.classList.add('btn-active');
});

