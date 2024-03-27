
createBoard(50,50);

let container = document.querySelector(".container");
let mouseDown = false;

container.addEventListener('mousedown', () => {
    mouseDown = true;
});
container.addEventListener('mouseup', () => {
    mouseDown = false;
});

container.addEventListener("mouseover", (event) => {
    if(event.target !== container && mouseDown == true){
        event.target.style.backgroundColor = "blue";
    }
});
let widthInput = querySelector("#width");
let heightInput = querySelector("#height");


let resize = querySelector("#resize");
resize.addEventListener("click", ()=>{
    
});







function createBoard(width, height){
    let board = new Array(height).fill(0).map(()=> new Array(width).fill(0));
    let row = [height];
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

function resizeBoard(width, height){
    for (let i = 0; i < height; i++){
        row[i].remove();
    }
    createBoard(width, height);
}