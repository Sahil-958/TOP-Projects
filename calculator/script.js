const secondaryDisplay = document.querySelector('.keys');
const mainDisplay = document.querySelector('.calculations').querySelector('p');
const historyInfo = document.querySelector('.info');
var operand1 = '';
var operand2 = '';
var operator = '';
var displayBuffer = '';
var previousResult = '';

document.addEventListener('keyup', e => keyPressHandler(e));
document.addEventListener('keydown', e => {
    if (e.key === '/') e.preventDefault();
    if (e.key === 'Backspace') {
        deleteChar();
    }
    visualizeUiClick(e, true);
})


function visualizeUiClick(e, isActive) {
    const button = document.getElementById(`${e.key}`);
    if (button !== null) {
        isActive ?
            button.classList.add('active') :
            button.classList.remove('active');
    }
}


function keyPressHandler(e) {
    // console.log(`OP1.l:${operand1.length}|OP2.l:${operand2.length}|OPT.l:${operator.length}`);
    visualizeUiClick(e, false);
    if (e.key.match(/[0-9.]+/)) {
        takeOperand(e.key);
        updateDisplay();
    } else if (e.key.match(/[*+-/^]+/)) {
            sanityCheckAndRun();
            takeOperator(e.key);
            updateDisplay();        
    }

    if (e.key === "Enter") {
       sanityCheckAndRun();
    }else if(e.key==="Delete"){
        clearDisplay();
    }else if(e.key==="r"){
        calculateSquareRoot();
    }else if(e.key==="Escape"){
        clearHistory();
    }
    // console.log(e.key);
}

function appendToDisplay(arg) {
    displayBuffer += arg;
    mainDisplay.textContent = displayBuffer;
}

function clearDisplay() {
    // console.log("CLRDISP");
    operand1 = operand2 = operator = previousResult = '';
    updateDisplay();
}

function deleteChar() {
    if (displayBuffer.length > 0) {
        displayBuffer = displayBuffer.slice(0, -1);
        // console.log(`D dbuffer:${displayBuffer}`);
    }
    if ((operand1.length > 0) && (operator.length <= 0)) {
        operand1 = operand1.slice(0, -1);
        // console.log(`D OP1:${operand1}`);
    }
    if (operand2.length > 0) {
        operand2 = operand2.slice(0, -1);
        // console.log(`D OP2:${operand2}`);
    } else if (operator.length > 0) {
        operator = operator.slice(0, -1);
        // console.log(`D OPT:${operator}`);
    }
    updateDisplay();
}

function operation(isCalRoot=false, isCalPower=false) {
    let result = '';
    const para = document.createElement('p');
    try {
        // console.log(`Eval:${operand1}${operator}${operand2}`);
        if(isCalRoot){
            result=Math.sqrt(operand1);
        }else if(isCalPower){
            result=Math.pow(operand1,operand2);
        }else{
            result = eval(`${operand1}${operator}${operand2}`);
        }
        // console.log(`res:${result}`);
        if(typeof result==='number'){
            result = parseFloat(result.toFixed(3));
        }
        if(isNaN(result)) {
            result="Invalid";
        }
        if(isCalRoot){
            operand1='√' + operand1;
            updateDisplay();
        }
        para.textContent = `${displayBuffer} = ${result}`;
        historyInfo.appendChild(para);
        operand1= previousResult = result.toString();
        mainDisplay.textContent = result;
        operand2=operator = result = '';
    } catch (error) {
        // console.table(error);
        para.textContent="Something Bad Happend!";
        historyInfo.appendChild(para);
    }
}

function takeOperand(arg) {
    if(operator.length===0){
        if(operand1.includes('.') && (arg==='.')){return;}
        operand1 += arg;
    }else{
        if(operand2.includes('.') && (arg==='.')){return;}
        operand2 += arg;
    }
    // console.log(`opr1:${operand1}`);
    // console.log(`opr2:${operand2}`);
    updateDisplay();
}

function takeOperator(arg) {
    if (operator.length === 0 && operand1.length>0) {
        operator += arg;
    }
    // console.log(`opt:${operator}`);
    updateDisplay();
}

function updateDisplay() {
    // console.log(`OPP1.l:${operand1.length}|OPP2.l:${operand2.length}|OPT.l:${operator.length}`);
    // console.log(`OPP1.l:${operand1}|OPP2.l:${operand2.length}|OPT.l:${operator.length}`);
    // console.log("UPDISP");
    displayBuffer = `${operand1}${operator}${operand2}`;
    mainDisplay.textContent = displayBuffer;
}


function calculateSquareRoot(){
    if(operand1.length>0){
        operation(true,false);
    }
}

function handlePowerExpression(){
    if(operand1.length>0){
        operator='^';
        updateDisplay();
    }
}

function sanityCheckAndRun() {
    if ((operand1.length > 0) && (operand2.length > 0) && (operator.length > 0)) {
        // console.log('CALLING:OPERATION');
        operator.includes('^')?operation(false,true):operation();
        updateDisplay();
    } 
}

function clearHistory() {
    historyInfo.innerHTML='';
}