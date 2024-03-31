let board;
let row;

let widthInput;
let heightInput;

let width = 16;
let height = 16;

let pixelArray;
let pixelArrayTracker;
let dict = {};

createBoard(width, height);

let defaultColor = "rgb(0, 0, 255)";
let opaque;

let colorSelector = document.querySelector("#colorSelector");
let container = document.querySelector(".container");

let mouseDown = false;

container.addEventListener("mousedown", (event) => {
    defaultColor = `${convertHexToRGB(colorSelector.value)}`;
    mouseDown = true;
    if (opacityState && randomState){
        if(dict[event.target.id] === undefined || event.target.backgroundColor === "transparent" || pixelArray[dict[event.target.id]][3] === false){
            let random = getRandomColor(3)
            draw(event, getOpacityColor(event, random));
            pixelArray[dict[event.target.id]][2] = random;
        } 
        else{
            draw(event, getOpacityColor(event, pixelArray[dict[event.target.id]][2]));
        }
    }    else if(opacityState) draw(event, getOpacityColor(event, defaultColor));
    else if(randomState) draw(event, getRandomColor(3));
    else draw(event, defaultColor);
    
});

container.addEventListener("mouseup", () => {
    mouseDown = false;
});

container.addEventListener("mouseover", (event) => {
    defaultColor = `${convertHexToRGB(colorSelector.value)}`;
    if(event.target !== container && mouseDown == true){

        if (opacityState && randomState){
            if(dict[event.target.id] === undefined || event.target.backgroundColor === "transparent" || pixelArray[dict[event.target.id]][3] === false){
                let random = getRandomColor(3)
                draw(event, getOpacityColor(event, random));
                pixelArray[dict[event.target.id]][2] = random;
            } 
            else{
                draw(event, getOpacityColor(event, pixelArray[dict[event.target.id]][2]));
            }
        }
        else if(opacityState) draw(event, getOpacityColor(event, defaultColor));
        else if(randomState) draw(event, getRandomColor(3));
        else draw(event, defaultColor);
        
    }

});

let resize = document.querySelector("#resize");
resize.addEventListener("click", () => {
    let input = validateInput();
    if(input === true){
        width = +widthInput.value;
        height = +heightInput.value;
        resizeBoard(width, height, row);
    }
    else if(input === 1){
        alert("Please input values less than 100 and greater than 0");
    }
    else{
        alert("Please input only number values");
    }
});

let clear = document.querySelector("#clear");
clear.addEventListener("click", () =>{
    clearBoard();
});

const click = new Event("click");
let gridBorder = document.querySelector("#border")
let borderState = false;

gridBorder.addEventListener("click", () => {
    if (borderState){
        toggleBorder();
        borderState = false;
    }
    else{
        toggleBorder();
        borderState = true;
    }
});

gridBorder.dispatchEvent(click);
gridBorder.checked = true;

let random = document.querySelector("#random");
let randomState = false;

random.addEventListener("click", () =>{
    if(randomState) randomState = false;
    else randomState = true;
    pixelArray = new Array(width*height).fill(0).map(() => new Array(4).fill(0));
    pixelArrayTracker = 0;
    dict = {};
});

let opacity = document.querySelector("#opacity");
let opacityState = false;

opacity.addEventListener("click", () =>{
    if(opacityState) opacityState = false;
    else opacityState = true;
    pixelArray = new Array(width*height).fill(0).map(() => new Array(4).fill(0));
    pixelArrayTracker = 0;
    dict = {};
});

function createBoard(width, height){
    board = new Array(height).fill(0).map(()=> new Array(width).fill(0));
    pixelArray = new Array(width*height).fill(0).map(() => new Array(4).fill(0));
    pixelArrayTracker = 0;
    dict = {};
    row = [height];
    let container = document.querySelector(".container");

    for (let i = 0; i < height; i++){
        row[i] = document.createElement("div");
        row[i].classList.add("row");

    }
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            board[i][j] = document.createElement("div");
            board[i][j].setAttribute("id", `${i+1}-${j+1}`);
            board[i][j].classList.add("row-box");
            row[i].appendChild(board[i][j]);
        }
            container.appendChild(row[i]);
    }
}

function resizeBoard(width, height, row){
    row.forEach(element => element.remove());
    createBoard(width, height);
}

function clearBoard(){
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            board[i][j].style.backgroundColor = "transparent";
        }
    }
}

function draw(event, color){
    if((dict[event.target.id] === undefined) || pixelArrayTracker === 0){
        event.target.style.backgroundColor = color;
        dict[event.target.id] = pixelArrayTracker;
        pixelArray[pixelArrayTracker][0] = event.target;
        pixelArray[pixelArrayTracker][1]++;
        pixelArray[pixelArrayTracker][2] = opaque;
        if(!(opacityState === true && randomState === true)){
            pixelArray[dict[event.target.id]][3] = false;
        }
        else{
            pixelArray[dict[event.target.id]][3] = true;
        }   
        pixelArrayTracker++;
    }
    else if(dict[event.target.id] !== NaN){
        event.target.style.backgroundColor = color;
        pixelArray[pixelArrayTracker][2] = opaque;
        if(!(opacityState === true && randomState === true)){
            pixelArray[dict[event.target.id]][3] = false;
        } 
        else{
            pixelArray[dict[event.target.id]][3] = true;
        }   
        pixelArray[dict[event.target.id]][1]++;
    }  

}

function getOpacityColor(event, color){
    let opacity;
    opaque = color;
    if(dict[event.target.id] === undefined) opacity = 0.1;

    else{
        opacity = ((pixelArray[dict[event.target.id]][1] + 1)/10);
        if (opacity > 1) opacity = 1;
    }

    color = color.split("");

    for (let i = 0; i < color.length; i++){
        if(color[i] == ')') {
            color.splice(i, 0, `, ${opacity}`);
            i = color.length;
        }
    }
    color = color.join("");
    return color;

}

function getRandomColor(max){
    let randomColor = "rgb(";
    for (let i = 1; i < 4; i++){
        if (i !== max) randomColor += `${Math.floor((Math.random() * 256))}, `;
        else randomColor += `${Math.floor((Math.random() * 256))})`;   
    }
    opaque = randomColor;
    return randomColor;
}


function validateInput(){
    widthInput = document.querySelector("#width");
    heightInput = document.querySelector("#height");

    for (char of heightInput.value){
        if(char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57){
            return false;
        }
    }
    for (char of widthInput.value){
        if(char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57){
            return false;
        }
    }

    if(widthInput.value > 100 || heightInput.value > 100 || widthInput.value <= 0 || heightInput.value <= 0){
        return 1;
    }

    return true;
}

function toggleBorder(){
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            if (j < (width - 1)){
                board[i][j].classList.toggle("border-right");
            }
            if (i < (height - 1)){
                board[i][j].classList.toggle("border-bottom");
            }
        }
    }
}

function convertHexToRGB(color){
    const r = parseInt(color.slice(1,3), 16);
    const g = parseInt(color.slice(3,5), 16);
    const b = parseInt(color.slice(5,7), 16);

    return `rgb(${r}, ${g}, ${b})`;
}