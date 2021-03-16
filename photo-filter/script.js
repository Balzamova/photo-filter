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
const fileInput = document.querySelector('input[type="file"]');
const fullScreenBtn = document.querySelector('.fullscreen');

let ind = 0;

let currentImg = editorBlock.insertAdjacentHTML('beforeend', '<div id="editor-image"></div>');
currentImg = document.querySelector('#editor-image');

let canvas = editorBlock.insertAdjacentHTML('beforeend', '<canvas></canvas>');
canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

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

const getImageNext = (n) => { 
    let today = new Date();
    let hour = today.getHours();
    let imgSrc;

    if (hour < 6) {
        imgSrc = `./assets/images/night/${n}.jpg`;
    } else if (hour < 12) {
        imgSrc = `./assets/images/morning/${n}.jpg`;
    } else if (hour < 18) {
        imgSrc = `./assets/images/day/${n}.jpg`;
    } else {
        imgSrc = `./assets/images/evening/${n}.jpg`;       
    }
        
    viewImage(imgSrc);     
}

const getIndexPrev= () => {    
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

    getImageNext(number);  
}

const getIndexNext = () => {    
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

    getImageNext(number);      
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

const getCurrentUrl = () => {
    let styles = getComputedStyle(currentImg);
    let curStyleBackgroundUrl = styles.backgroundImage;

    let urlFromImg = curStyleBackgroundUrl.match(/\/assets\/\w+\/\w+\/\d\d\.\w\w\w/im);

    let url = `.${urlFromImg}`;
    drawImage(url)
}

function drawImage(url) {
    console.log(url);

    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        const filters = [];
        const sizes = ['px', '%', '%', '%', 'deg'];
        for (i = 0; i < inputs.length; i++) {
            filters.push(`${inputs[i].name}(${outputs[i].value}${sizes[i]})`);
        }

        const stringOfFilters = filters.join(', ');
        let str = '';
        for (i = 0; i < stringOfFilters.length; i++) {
            if (stringOfFilters[i] !== ',') { str += stringOfFilters[i] }
        }

        ctx.filter = str.replace('hue', 'hue-rotate');
        ctx.drawImage(img, 0, 0);
    };
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

    for (let i = 0; i < outputs.length; i++) {
        if (i === 3) {
            outputs[i].value = 100;
            inputs[i].value = 100;

        } else {
            outputs[i].value = 0;
            inputs[i].value = 0;
        }
    }

    resetStylesForImage();
});

btnPrev.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnPrev.classList.add('btn-active');

    if (document.querySelector('#loaded__img')) {
        document.querySelector('#loaded__img').remove();
    }

    btnPrev.disabled = true;
    setTimeout(function() {
        btnPrev.disabled = false
    }, 1000);

    getIndexPrev();
});

btnNext.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnNext.classList.add('btn-active');

    if (document.querySelector('#loaded__img')) {
        document.querySelector('#loaded__img').remove();
    }

    btnNext.disabled = true;
    setTimeout(function() {
        btnNext.disabled = false
    }, 1000);

    getIndexNext();
});

btnLoad.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnLoad.classList.add('btn-active');
});

fileInput.addEventListener('change', function(e) {    
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.id = 'loaded__img';

      currentImg.innerHTML = "";
      currentImg.append(img);
    }
    reader.readAsDataURL(file);

    currentImg.style.backgroundImage = 'none';
});

btnSave.addEventListener('click', () => {
    removeClassActiveForBnts();
    btnSave.classList.add('btn-active');

    getCurrentUrl();

    setTimeout(() => {
        var link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    }, 500);
});
