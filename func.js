var value = document.querySelector("column-btn");
var clear = document.getElementById("clear");
var input = document.getElementById("txt-input");
var calculated = false;

// document.querySelectorAll("button").forEach(button => {
//     button.addEventListener("click", display);
// })

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
    try {
        const result = eval(val);
        input.value = result;
        calculated = true;
    } catch (error) {
        input.value = "Invalid Input"
    }
}

clear.addEventListener("click", clearScreen);
function clearScreen() {
    input.value = "";
    calculated = false;
}