var value = document.querySelector("column-btn");
var clear = document.getElementById("clear");
var input = document.getElementById("txt-input");
var calculated = false;


const buttons = document.querySelectorAll("button");
for (let button of buttons) {
    button.addEventListener("click", display)
}


function display(e) {
    input.value += e.target.innerHTML;
    if (calculated) {
        clearScreen();
    }

    if (input.value.charAt(0) == 0) {
        input.value = e.target.innerHTML;
    }
    if ('+-*/'.includes(input.value.charAt(0))) {
        input.value = "";
    }
    const lastChar = input.value[input.value.length - 2];
    if ('+-*/'.includes(lastChar) && '+-*/'.includes(e.target.innerHTML)) {
        input.value = input.value.slice(0, -2) + e.target.innerHTML;
    }
    if (e.target.innerHTML == '=') {
        input.value = input.value.slice(0, -1) + "";
        if ('+-*/'.includes(lastChar)) {
            input.value = "Invalid input";
            calculated = true;
            return;
        } else {
            calculate(input.value);
        }
    }
}


function calculate(val) {
    var value = val;
    var numbers = value.split(/\+|\-|\*|\//g);
    var operators = value.replace(/[0-9]/g, "").split("");
    var calcNum = 0;
    if (operators.includes('+') || operators.includes('-') ||
        operators.includes('*') || operators.includes('/')) {
        var division = operators.indexOf("/");
        while (division != -1) {
            calcNum = numbers[division] / numbers[division + 1];
            numbers.splice(division, 2, calcNum);
            operators.splice(division, 1);
            division = operators.indexOf("/");
        }
        var multiply = operators.indexOf("*");
        while (multiply != -1) {
            calcNum = numbers[multiply] * numbers[multiply + 1]
            numbers.splice(multiply, 2, calcNum);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("*");
        }

        var subtraction = operators.indexOf("-");
        while (subtraction != -1) {
            calcNum = numbers[subtraction] - numbers[subtraction + 1]
            numbers.splice(subtraction, 2, calcNum);
            operators.splice(subtraction, 1);
            subtraction = operators.indexOf("-");
        }

        var addition = operators.indexOf("+");
        while (addition != -1) {
            calcNum = parseFloat(numbers[addition]) + parseFloat(numbers[addition + 1])
            numbers.splice(addition, 2, calcNum);
            operators.splice(addition, 1);
            addition = operators.indexOf("+");
        }
        input.value = numbers[0];
        calculated = true;
    } else {
        input.value = numbers[0];
    }
}


clear.addEventListener("click", clearScreen);
function clearScreen() {
    input.value = "";
    calculated = false;
}