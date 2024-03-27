let board;
let row;
let coloredPixel = [];
let coloredPixelSize = 0;

widthInput = document.querySelector("#width");
heightInput = document.querySelector("#height");

createBoard(50, 50);

let container = document.querySelector(".container");
let mouseDown = false;

container.addEventListener("mousedown", (event) => {
    mouseDown = true;
    event.target.style.backgroundColor = "blue";
    coloredPixel[coloredPixelSize] = event.target;
    coloredPixelSize++;
});

container.addEventListener("mouseup", () => {
    mouseDown = false;
});

container.addEventListener("mouseover", (event) => {
    if(event.target !== container && mouseDown == true){
        event.target.style.backgroundColor = "blue";
        coloredPixel[coloredPixelSize] = event.target;
        coloredPixelSize++;
    }

});

let resize = document.querySelector("#resize");
resize.addEventListener("click", () => {
    let input = validateInput();
    if(input === true){
        resizeBoard(+widthInput.value, +heightInput.value, row);
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

// let heightTrue;
// heightInput.textContent.forEach((element) =>{
//     if(charCodeAt(element) >= 48 && charCodeAt(element) <= 57){
//         heightTrue = true;
//     }
//     else{
//         alert("Input only numbers");
//     }
// });
// widthInput.textContent.forEach((element) =>{
//     if(charCodeAt(element) >= 48 && charCodeAt(element) <= 57 && heightTrue){
//         resize(widthInput.textContent, heightInput.textContent);
//     }
//     else{
//         alert("Input only numbers");
//     }
// });





function createBoard(width, height){
    board = new Array(height).fill(0).map(()=> new Array(width).fill(0));
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
            if (j < (width - 1)){
                board[i][j].classList.add("border-right");
            }
            if (i < (height - 1)){
                board[i][j].classList.add("border-bottom");
            }
        }
            container.appendChild(row[i]);
    }
}

function resizeBoard(width, height, row){
    row.forEach(element => element.remove());
    createBoard(width, height);
    for (let i = 0; i < coloredPixelSize; i++){
        coloredPixel[i].style.backgroundColor = "blue";
    }
}

function clearBoard(){
    for (let i = 0; i < coloredPixelSize; i++){
        coloredPixel[i].style.backgroundColor = "transparent";
    }
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
