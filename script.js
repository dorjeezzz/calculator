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
buttons.forEach((button)=>{
    button.addEventListener("click", (e) =>{
        button.style.backgroundColor = sel;
        //button.style.backgroundColor = col;
    });
});