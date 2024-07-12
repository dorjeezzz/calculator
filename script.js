function add(x, y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function multiply(x,y){
    return x*y;
}

function divide(x,y){
    return x/y;
}
let num1;
let num2;
let operator;

function operate(num1, operator, num2){
    if (operator == '+'){
        add(num1, num2);
    }
    else if (operator == '-'){
        subtract(num1,num2);
    }
    else if (operator == '*'){
        multiply(num1,num2);
    }
    else divide(num1,num2);
}

const sel = "grey";
const col = "black";

const buttons = document.querySelectorAll(".button");
//everytime click button put value on display then store it somewhere so you can use operation func on it, count number of buttons pressed
//needs to == 3 in order to call operation function, if alr number on view count -= 2;
const display = document.querySelector("#display");
let count = 0;
let operation = false;
buttons.forEach((button)=>{
    let val = button.textContent;
    button.addEventListener("mousedown", (e) =>{
        button.classList.add("clicked");
        let curr = Number(val);
        console.log(curr);
        //address overflowing
        if (Number.isInteger(curr) && display.textContent == 0){
            display.textContent = val;
        }
        else if (Number.isInteger(curr)) {
            display.textContent += val;
            count++;
        }
    });
    button.addEventListener("mouseup", ()=>{
        button.classList.remove("clicked");
    });
});

const del = document.querySelector("#delete");
const clear = document.querySelector("#clear");

clear.addEventListener("mousedown", (e) =>{
    clear.style.backgroundColor = "black";
    display.textContent = 0;
});

clear.addEventListener("mouseup", (e)=>{
    clear.style.backgroundColor = '#191d1d';
});

del.addEventListener("mousedown", ()=>{
    del.style.backgroundColor = "purple";
    if (display.textContent.length > 1){
        display.textContent = display.textContent.substr(0, display.textContent.length-1);
    }
    else if (display.textContent.length == 1){
        display.textContent = 0;
    }
});

del.addEventListener("mouseup", ()=>{
    del.style.backgroundColor = '#191D1D';
});