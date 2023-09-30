var value = document.querySelector("column-btn");
var clear = document.getElementById("clear");
var input = document.getElementById("txt-input");
var operatorBox = document.getElementById("operator-output");
var calculated = false;

// document.querySelectorAll("button").forEach(button => {
//     button.addEventListener("click", display);
// })

const buttons = document.querySelectorAll("button");
for (let button of buttons) {
    button.addEventListener("click", display)
}

var firstVal = 0;
var secondVal = 0;
var operator;
var setOperator = false;

function display(e) {
    input.value += e.target.innerHTML;
    if (calculated) {
        clearScreen();
    }
    if ('+-*/'.includes(e.target.innerHTML) && firstVal == 0 && calculated == false) {
        getValue(input.value.slice(0, -1, ""));
        getOperator(e.target.innerHTML);
        input.value = "";
    }
    if ('='.includes(e.target.innerHTML) && firstVal != 0 &&
        secondVal == 0 && calculated == false && input.value.length > 0) {
        getValue(input.value.slice(0, -1, ""));
        input.value = "";
        calculate(firstVal, secondVal, operator);
    } else {
        return;
    }
}

function getOperator(oper) {
    operator = oper;
    operatorBox.value = operator;
    setOperator = true;
}

function getValue(val) {
    if (firstVal == 0 && setOperator == false) {
        firstVal = val;
    }
    if (secondVal == 0 && setOperator == true) {
        secondVal = val;
    }
}

function calculate(firstVal, secondVal, operator) {
    if (operator == '+') {
        input.value = parseFloat(firstVal) + parseFloat(secondVal);
    } else if (operator == '-') {
        input.value = firstVal - secondVal;
    } else if (operator == '*') {
        input.value = firstVal * secondVal;
    } else if (operator == '/') {
        input.value = firstVal / secondVal;
    }
    calculated = true;
    return input.value;
}

clear.addEventListener("click", clearScreen);
function clearScreen() {
    input.value = "";
    operatorBox.value = "";
    firstVal = 0;
    secondVal = 0;
    setOperator = false;
    calculated = false;
}
