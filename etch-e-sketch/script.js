const slider = document.querySelector('#slider');
const clearBtn = document.querySelector('#clear-all');
const sliderValuePara = document.querySelector('#slider-value');
const sketchBoard = document.querySelector('.sketchBoard');
const fgPicker = document.querySelector('#fg-picker');
const bgPicker = document.querySelector('#bg-picker');
const buttonContainer = document.querySelector('.settings');
var drawMode = 'click';
var shadowMode = '';
var isShadowActive = false;
var intialShade = '';
var colorMode = 'manual';
var gridLines = 'grid-show';
var backgroundColor = 'var(--light-lilac)';
var foregroundColor = 'var(--midnight-blue)';
var gridSize = 16;
var isEraserActive = false;
var isMouseDown = false;
var isColorPickerActive = false;
var brushColor = `var(--midnight-blue)`;


slider.addEventListener('input', () => onSliderEvent());
clearBtn.addEventListener('click', () => clearGrid());
fgPicker.addEventListener('change', e => changeFgColor(e));
bgPicker.addEventListener('change', e => changeBgColor(e));
document.addEventListener("DOMContentLoaded",onJsLoaded());


buttonContainer.addEventListener('click', event => {
    const clickedButton = event.target;
    if (clickedButton.classList.contains('btn')) {
        const buttonGroup = clickedButton.closest('.mode');
        const specialIds = ['color-picker-fg', 'color-picker-bg', 'eraser', 'clear-all', 'lighten', 'darken'];
        const isSpecialButton = specialIds.includes(clickedButton.id);
        buttonGroup.querySelectorAll('.btn').forEach(button => {
            if (isSpecialButton) {
                const isCurrentlySelected = clickedButton.classList.contains('selected');
                buttonGroup.querySelectorAll('.btn').forEach(button => {
                    if (button.id !== clickedButton.id) {
                        button.classList.remove('selected');
                    }
                });
                clickedButton.classList.toggle('selected', !isCurrentlySelected);

            } else {
                button.classList.remove('selected');
            }
        });
        if (clickedButton.id === 'clear-all') {
            clearGrid();
        } else {
            clickedButton.classList.toggle('selected');
        }
    }
    const clickedButtonId = clickedButton.id;
    if (clickedButtonId === 'click' || clickedButtonId === 'hover') {
        drawMode = clickedButtonId;
        DrawMode();
    } else if (clickedButtonId === "lighten" || clickedButtonId === 'darken') {
        shadowMode = clickedButtonId;
        isShadowActive = clickedButton.classList.contains('selected');
    } else if (clickedButtonId === "random" || clickedButtonId === 'manual') {
        colorMode = clickedButtonId;
    } else if (clickedButtonId === 'grid-show' || clickedButtonId === 'grid-hide') {
        gridLines = clickedButtonId;
        toggleGridLines();
    } else if (clickedButtonId === 'eraser') {
        isEraserActive = clickedButton.classList.contains('selected');
        brushColor = isEraserActive ? backgroundColor : foregroundColor;
    } else if (clickedButtonId === 'clear-all') {
        clearGrid();
    } else if (clickedButtonId === 'color-picker-fg' || clickedButtonId === 'color-picker-bg') {
        isColorPickerActive = clickedButton.classList.contains('selected');
        enterColorPickerMode();
    }
});

function DrawMode() {
    const pixels=sketchBoard.querySelectorAll('div');
    pixels.forEach(pixel=>{
        pixel.addEventListener('mouseenter',(e)=>draw(e));
    });
}

function toggleGridLines() {
    if (gridLines === 'grid-show') {
        sketchBoard.classList.add('grid-line');
    } else {
        sketchBoard.classList.remove('grid-line');
    }
}

function draw(event) {
    console.log('d');
    const clickedPixel = event.target;
    if ((drawMode === 'hover' && !isMouseDown && !isColorPickerActive) || (drawMode === 'click' && isMouseDown && !isColorPickerActive)) {
        if (colorMode === 'manual' && !isShadowActive) {
            clickedPixel.style.backgroundColor = brushColor;
        } else if (colorMode === 'random' && !isShadowActive) {
            clickedPixel.style.backgroundColor = isEraserActive ? brushColor : getRandomCatpuccinMochaColor();
        } else if (isShadowActive) {
            intialShade = getComputedStyle(clickedPixel).backgroundColor;
            clickedPixel.style.backgroundColor = getShadow(shadowMode);
        }
    }
}


const mochaColorRange = [
    ['#f5e0dc', '#f2cdcd', '#f5c2e7'],
    ['#cba6f7', '#f38ba8', '#eba0ac'],
    ['#fab387', '#f9e2af', '#a6e3a1'],
    ['#94e2d5', '#89dceb', '#74c7ec'],
    ['#89b4fa', '#b4befe', '#cdd6f4'],
    ['#bac2de', '#a6adc8', '#9399b2'],
    ['#7f849c', '#6c7086', '#585b70'],
    ['#45475a', '#313244', '#1e1e2e'],
    ['#181825', '#11111b']
];

// Function to get a random color inspired by the Tokyo night color range
function getRandomCatpuccinMochaColor() {
    const randomColorRangeIndex = Math.floor(Math.random() * mochaColorRange.length);
    const randomColorRange = mochaColorRange[randomColorRangeIndex];
    const randomColorIndex = Math.floor(Math.random() * randomColorRange.length);
    return randomColorRange[randomColorIndex];
}

function getShadow(mode) {
    const rgbValues = intialShade.match(/\d+/g);
    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    const color = new Color(r, g, b); // Replace with your color manipulation logic
    const darkerColor = mode === 'lighten' ? color.lighter(10) : color.darker(10); // Adjust the method name based on your implementation
    return darkerColor.toString();
}

class Color {
    constructor(r, g, b) { this.r = r; this.g = g; this.b = b; }
    darker(step) { return new Color(Math.max(0, this.r - step), Math.max(0, this.g - step), Math.max(0, this.b - step)); }
    lighter(step) { return new Color(Math.min(255, this.r + step), Math.min(255, this.g + step), Math.min(255, this.b + step)); }
    toString() { return `rgb(${this.r}, ${this.g}, ${this.b})`; }
}

function changeFgColor(e) {
    foregroundColor= brushColor = e.target.value;
}
function changeBgColor(e = null) {

    backgroundColor = e ? e.target.value : backgroundColor;
    const styleSheet = document.styleSheets[0]; // Get the first stylesheet
    const cssRules = styleSheet.cssRules || styleSheet.rules; // Cross-browser support

    for (let i = 0; i < cssRules.length; i++) {
        const rule = cssRules[i];
        if (rule.selectorText === '.sketchBoard div') {
            rule.style.backgroundColor = backgroundColor; // Change the background-color property
            break; // Exit the loop since the rule was found
        }
    }

}


function enterColorPickerMode() {
    if (isColorPickerActive) {
        sketchBoard.style.cursor = 'crosshair';
        sketchBoard.addEventListener('click', handleColorPickerClick, { once: true });
    } else {
        sketchBoard.style.cursor = 'auto';
        sketchBoard.removeEventListener('click', handleColorPickerClick, { once: true });
    }
}

function handleColorPickerClick(e) {
    const pickedColor = getComputedStyle(e.target).backgroundColor;

    const isFgPicker = document.querySelector('#color-picker-fg').classList.contains('selected');
    if (isFgPicker && isColorPickerActive) {
        brushColor = pickedColor;
        fgPicker.value = rgbToHex(pickedColor);
    } else {
        backgroundColor = pickedColor;
        bgPicker.value = rgbToHex(pickedColor);
        console.log(bgPicker.value);
        changeBgColor();
    }
    if (document.querySelector('#random').classList.contains('selected')) {
        colorMode = 'manual';
        document.querySelector('#random').classList.remove('selected');
        document.querySelector('#manual').classList.toggle('selected');

    }
    console.log('Picked color:', pickedColor);
    sketchBoard.style.cursor = 'auto';
    document.querySelector(`${isFgPicker ? '#color-picker-fg' : '#color-picker-bg'}`).classList.remove('selected');
    isColorPickerActive = false;
}


function rgbToHex(rgb) {
    // Parse the RGB/RGBA values from the string
    const values = rgb.match(/\d+/g).map(Number);

    // Convert RGB to HEX
    const hexValues = values.map(value => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex; // Ensure two-digit format
    });

    return '#' + hexValues.join('');
}

function onJsLoaded() {
    createGrid(gridSize);
    toggleGridLines();
    DrawMode();
    sketchBoard.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        draw(e);
    });
    document.addEventListener("dragstart", event => {
        event.preventDefault();
    });
    sketchBoard.addEventListener("contextmenu", event => {
        event.preventDefault();
    });
    window.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
}

function onSliderEvent() {
    gridSize = slider.value;
    sliderValuePara.textContent = `${gridSize}x${gridSize}`;
    createGrid();
}

function createGrid() {
    sketchBoard.innerHTML = "";
    let noOfDivs = gridSize * gridSize;
    while (noOfDivs !== 0) {
        noOfDivs--;
        let divn = document.createElement("div");
        divn.setAttribute('id', `${noOfDivs + 1}`);
        divn.style.width = `calc(100%/${gridSize})`;
        divn.style.height = `calc(100%/${gridSize})`;
        sketchBoard.appendChild(divn);
    }
    DrawMode();
}

function clearGrid() {
    createGrid();
    isEraserActive=false;
    brushColor=foregroundColor;
}


// Function to check if the device has touch input capabilities
function hasTouchInput() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

// Function to display the touch input warning overlay
function showTouchInputWarning() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.color = 'var(--light-lilac)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.textAlign='center';
    overlay.innerHTML = '<p style="padding: 20px; font-size:22px; font-weight: bold;">Touch input experience may not be optimal. Please use a pointer device.</p>';
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', () => {
        overlay.parentNode.removeChild(overlay);
    });
}

// Check if touch input is detected and show the warning if needed
if (hasTouchInput()) {
    showTouchInputWarning();
}
