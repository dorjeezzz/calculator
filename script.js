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
    if (y != 0) return x/y;
    else return "Error: Division by Zero";
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
    else if (operator == "/") {
        if (num2 == 0) return "NaN";
        return divide(num1,num2);
    }
    return null;
}

console.log(operate(5,'/',0));

const buttons = document.querySelectorAll(".button");
//everytime click button put value on display then store it somewhere so you can use operation func on it, count number of buttons pressed
//needs to == 3 in order to call operation function, if alr number on view count -= 2;
const display = document.querySelector("#display");
let a = 0;
let b;
let ops;
let clicks = 0;
let it = 0;
let decimal = false;
let zerdiv = false;
buttons.forEach((button)=>{
    let val = button.textContent;
    button.addEventListener("mousedown", (e) =>{
        button.classList.add("clicked");
        let curr = Number(val);
        if (val == "clear"){
            display.textContent = 0;
            a = 0;
            b = 0;
            ops = "";
            clicks = 0;
            it = 0;
            decimal = false;
            console.clear();
        }
        if (val == "delete"){
            if (display.textContent == "NaN") display.textContent = 0;
            if (display.textContent.length > 1){
                display.textContent = display.textContent.substr(0, display.textContent.length-1);
            }
            else if (display.textContent.length == 1){
                display.textContent = 0;
            }
            a = Number(display.textContent);
            console.log(a)
            console.log(b);
        }
        if (clicks == 0){
            if (isNum(curr) && (display.textContent == 0 || display.textContent == "NaN")){
                display.textContent = val;
            }
            else if (isNum(curr) && display.textContent.length <= 17) {
                display.textContent += val;
            }
            else if (val == '.' && !decimal){
                display.textContent += '.';
                decimal = true;
            }
            else if (val == '*'){
                let n = Number(display.textContent);
                ops = '*';
                a = n;
                clicks++;
                decimal = false;
            }
            else if (val == '/'){
                let n = Number(display.textContent);
                ops = '/';
                a = n;
                clicks++;
                decimal = false;
            }
            else if (val == '+'){
                let n = Number(display.textContent);
                ops = '+';
                a = n;
                clicks++;
                decimal = false;
            }
            else if (val == '-'){
                let n = Number(display.textContent);
                ops = '-';
                a = n;
                clicks++;
                decimal = false;
            }
        }
        else if (clicks == 1){
            if (it == 0 && isNum(curr)){
                display.textContent = val;
                it++;
                decimal = false;
                zerdiv = false;
            }
            else if (it == 1 && isNum(curr) && display.textContent.length <= 17) display.textContent += val;
            else if (!decimal && val == '.' && !zerdiv){
                display.textContent += '.';
                decimal = true;
            }
            else if (val == '*' && !zerdiv){
                //console.log("times");
                let n = Number(display.textContent);
                console.log(ops);
                if (ops != '*') ops = '*';
                else if (ops != "" && ops != '*'){
                    // console.log("bug");
                    // console.log(a);
                    b = n;
                    display.textContent = operate(a,ops,b);
                    ops = '*';
                    a = Number(display.textContent);
                    b = 0;
                    it = 0;
                }
                else if (ops != "" && it > 0){
                    b = n;
                    display.textContent = operate(a,'*',b);
                    b = 0;
                    a = Number(display.textContent);
                    it = 0;
                }
            }
            else if (val == '+' && !zerdiv){ //need to set that eqn only fires when it = 1
                let n = Number(display.textContent);
                if (ops != '+') ops = '+';
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
                    display.textContent = operate(a,ops,b);
                    b = 0;
                    a = Number(display.textContent);
                    it = 0;
                }
            }
            else if (val == '-' && !zerdiv){
                console.log("minus");
                console.log(a);
                console.log(b);
                let n = Number(display.textContent);
                if (ops != '-') ops = '-';
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
            else if (val == '/' && !zerdiv){
                let n = Number(display.textContent);
                if (ops != '/') ops = '/';
                else if (ops != "" && ops != '/'){
                    b = n;
                    display.textContent = operate(a,ops,b);
                    b = 0;
                    a = Number(display.textContent);
                    ops = '/';
                    it = 0;
                }
                else if (ops != "" && it > 0){
                    b = n;
                    it = 0;
                    display.textContent = operate(a,ops,b);
                    b = 0;
                    a = Number(display.textContent);
                }
            }
            else if (val == '=' && !zerdiv){
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
        if (display.textContent == "NaN"){ 
            zerdiv = true;
            clicks--;
            it = 0; 
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
    clicks = 0;
});

del.addEventListener("mousedown", ()=>{
    del.style.backgroundColor = "black";
});

del.addEventListener("mouseup", ()=>{
    del.style.backgroundColor = '#191D1D';
});