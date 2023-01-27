let gridSize = 16;

let isRGB = false;
let isGrayScale = false;

let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true)
document.body.onmouseup = () => (isMouseDown = false)

const grids = document.getElementById('grids');
const sizeBtn = document.getElementById('sizeBtn');
const rgbBtn = document.getElementById('rgbBtn');
const grayScaleBtn = document.getElementById('grayScaleBtn');

sizeBtn.addEventListener('click', changeGridSize);
rgbBtn.addEventListener('click', activateRGBMode);
grayScaleBtn.addEventListener('click', activateGrayScaleMode);

function displayGrid() {
    grids.style.gridTemplateColumns = 'repeat(' + gridSize + ', 2fr)';
    grids.style.gridTemplateRows = 'repeat(' + gridSize + ', 2fr)';
    
    for (i = 1; i < (gridSize * gridSize) + 1; i++)
    {
        const div = document.createElement('div');
        div.setAttribute('id', 'gridBox');
        div.addEventListener('mousedown', changeColors);
        div.addEventListener('mouseover', changeColorsHover);
        grids.appendChild(div);
    }
}

function removeGrid() {
    while(grids.lastElementChild) {
        grids.removeChild(grids.lastElementChild);
    }
}

function changeColors(e) {
    if (isRGB) {
        e.target.style.backgroundColor = rgbMode();
    }
    else if (isGrayScale) {
        e.target.style.backgroundColor = grayScaleMode(getComputedStyle(e.target).getPropertyValue('background-color'));
    }
    else {
        e.target.style.backgroundColor = 'black';
    }
}

function changeColorsHover(e) {
    if (isMouseDown)
    {
        if (isRGB) {
            e.target.style.backgroundColor = rgbMode();
        }
        else if (isGrayScale) {
            e.target.style.backgroundColor = grayScaleMode(getComputedStyle(e.target).getPropertyValue('background-color'));
        }
        else {
            e.target.style.backgroundColor = 'black';
        }
    }
}

function changeGridSize() {
    gridSize = prompt('How big?');
    if(gridSize > 64){
        console.log('Too big of a number');
    }
    else if(gridSize < 1){
        console.log('Too small of a number');
    }
    else if(isNaN(gridSize)) {
        console.log('Please enter a number');
    }
    else {
        removeGrid();
        displayGrid();
    }
}

function activateRGBMode() {
    if (!isRGB)
        isRGB = true;
    else
        isRGB = false;
}

function rgbMode() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let newRGB = 'rgb(' + r + ',' + g + ',' + b + ')';
    return newRGB;
}

function activateGrayScaleMode() {
    if (!isGrayScale)
        isGrayScale = true;
    else
        isGrayScale = false;
}

function grayScaleMode(color) {
    let colorArr = color.slice(
        color.indexOf("(") + 1, 
        color.indexOf(")")
    ).split(", ");
    
    let r = Math.min(Math.max(+colorArr[0] + 26, 0), 255);
    let g = Math.min(Math.max(+colorArr[1] + 26, 0), 255);
    let b = Math.min(Math.max(+colorArr[2] + 26, 0), 255);

    let newRGB = 'rgb(' + r + ',' + g + ',' + b + ')';
    return newRGB;
}

displayGrid();