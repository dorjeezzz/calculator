function add(x, y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function multiply(x,y){
    return x*y;
}

function isNum(value){
    return !isNaN(value) && !isNaN(parseFloat(value));
}

function divide(x,y){
    return x/y;
}

function operate(num1, operator, num2){
    if (operator == "+"){
        return add(num1, num2);
    }
    else if (operator == "-"){
        return subtract(num1,num2);
    }
    else if (operator == "*"){
        return multiply(num1,num2);
    }
    else if (operator == "/") return divide(num1,num2);
    else return null;
}

const sel = "grey";
const col = "black";

const buttons = document.querySelectorAll(".button");
//everytime click button put value on display then store it somewhere so you can use operation func on it, count number of buttons pressed
//needs to == 3 in order to call operation function, if alr number on view count -= 2;
const display = document.querySelector("#display");
let a = 0;
let b;
let ops;
let clicks = 0;
let twonums = false;
let it = 0;
buttons.forEach((button)=>{
    let val = button.textContent;
    button.addEventListener("mousedown", (e) =>{
        button.classList.add("clicked");
        let curr = Number(val);
        if (val == "clear"){
            console.log("I'm FUCKING PISSED");
            display.textContent = 0;
            a = 0;
            b = 0;
            ops = "";
            clicks = 0;
            it = 0;
        }
        //address overflowing
        if (clicks == 0){
            //if (display.textContent.length() <= 16)
            if (isNum(curr) && display.textContent == 0){
                display.textContent = val;
            }
            else if (isNum(curr)) {
                display.textContent += val;
            }
            else if (val == '*'){
                let n = Number(display.textContent);
                ops = '*';
                a = n;
                // console.log(`a = ${a}`);
                // console.log(ops);
                clicks++;
            }
            else if (val == '/'){
                let n = Number(display.textContent);
                ops = '/';
                a = n;
                //else pressed = false;
                clicks++;
            }
            else if (val == '+'){
                let n = Number(display.textContent);
                ops = '+';
                a = n;
                clicks++;
            }
            else if (val == '-'){
                let n = Number(display.textContent);
                ops = '-';
                a = n;
                clicks++;
            }
        }
        else if (clicks == 1){
            if (it == 0 && isNum(curr)){
                display.textContent = val;
                it++;
            }
            else if (it == 1 && isNum(curr)) display.textContent += val;
            else if (val == '*'){
                let n = Number(display.textContent);
                if (ops == "") ops = '*';
                else if (ops != "" && ops != '*'){
                    b = n;
                    display.textContent = operate(a,ops,b);
                    ops = '*';
                    a = Number(display.textContent);
                    b = 0;
                    it = 0;
                }
                else if (ops != "" && it > 0){
                    b = n;
                    //console.log(`operate ${a} ${ops} ${b}`);
                    display.textContent = operate(a,'*',b);
                    b = 0;
                    a = Number(display.textContent);
                    it = 0;
                }
            }
            else if (val == '+'){ //need to set that eqn only fires when it = 1
                let n = Number(display.textContent);
                if (ops == "") ops = '+';
                else if (ops != "" && ops != '+'){
                    b = n;
                    display.textContent = operate(a, ops, b);
                    ops = '+';
                    b = 0;
                    a = Number(display.textContent);
                    it = 0;
                }
                else if (ops!= "" && it > 0){
                    b = n;
                    //console.log(`operate ${a} ${ops} ${b}`);
                    display.textContent = operate(a,ops,b);
                    b = 0;
                    a = Number(display.textContent);
                    it = 0;
                }
            }
            else if (val == '-'){
                let n = Number(display.textContent);
                if (ops == "") ops = '-';
                else if (ops != "" && ops != '-'){
                    b = n;
                    display.textContent = operate(a,ops,b);
                    b = 0;
                    a = Number(display.textContent);
                    ops = '-';
                    it = 0;
                }
                else if (ops != "" && it > 0){
                    b = n;
                    display.textContent = operate(a,ops,b);
                    b = 0;
                    a = Number(display.textContent);
                    it = 0;
                }
            }
            else if (val == '='){
                let n = Number(display.textContent);
                if (ops != "" && it > 0){
                    b = n;
                    display.textContent = operate(a,ops,b);
                    console.log(`operate ${a} ${ops} ${b}`);
                    ops = "";
                    a = Number(display.textContent);
                    b = 0;
                }
                it = 0;
            }
        }
        //case for clicks == 2
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
    clicks = 0;
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