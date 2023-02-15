let settings = {
    sizeX: 25,
    sizeY: 25,
    interval: 1000
}
  
let cycle = 0;
let cycleNum = document.querySelector("#cycle-num");
cycleNum.innerHTML = cycle;

grid = document.querySelector(".grid");
grid.innerHTML = "";

let fieldOfCells = generateCells(1);


function getCellInfo(x, y) {
    if (x >= fieldOfCells.length) {
        return false
    }
    else if (y >= fieldOfCells[x].length) {
        return false
    }
    else if (fieldOfCells[x][y] == 1) {
        return true
    }
    else 
        return false
}

//Generate cells 
function generateCells(type) {
    let array = [];
    for (let i = 0; i < settings.sizeX; i++) {
        let row = [];
        for (let j = 0; j < settings.sizeY; j++) {
            if (type == 2) 
                row.push(1);
            else 
                row.push(type == 0? 0:Math.round(Math.random()));
        }
        array.push(row);
    }
    return array;
}


// Display cells
function renderCells(){
    grid.innerHTML = ""; 
    for (let i = 0; i < settings.sizeX; i++) {
        
        let row = "<div class=\"row\">";
        for (let j = 0; j < settings.sizeY; j++) {
            life = getCellInfo(i,j)? "life" : "";
            cell = "<div class=\"cell "+life+"\" id=\""+i+"x"+j+"\"></div>";
            row += cell;
        }
        grid.innerHTML += row;
    }
    cellInteract();
    cycleNum.innerHTML = cycle;
}

/*
[ -i, -j ][ -i, j ][ -i, +j ]
[  i, -j ][  i, j ][  i, +j ]
[ +i, -j ][ +i, j ][ +i, +j ]
*/

//Score cell
function checkScore(x,y) {
    let score = 0;
    if (x-1 >= 0) {
        if (y-1 >= 0)
            if (fieldOfCells[x-1][y-1] == 1) score++;
        if (fieldOfCells[x-1][ y ] == 1) score++;
        if (fieldOfCells[x-1][y+1] == 1) score++;
    }

    if (y-1 >= 0)
        if (fieldOfCells[x][y-1] == 1) score++;
    //if (fieldOfCells[x][y] == 1) score++;
        if (fieldOfCells[x][y+1] == 1) score++;
    
    if (x+1 < fieldOfCells.length) {
        if (y-1 >= 0)
            if (fieldOfCells[x+1][y-1] == 1) score++;
        if (fieldOfCells[x+1][ y ] == 1) score++;
        if (fieldOfCells[x+1][y+1] == 1) score++;
    }
    console.log(x+"x"+y," = ", score);
    if (score < 2 || score > 3) return 0;
    if (score >= 3) return 1;
    return fieldOfCells[x][y];
} 


function newCycle() {
    let newFieldOfCells = generateCells(0);
    
    for (let i = 0; i < fieldOfCells.length; i++) {
        
        for (let j = 0; j < fieldOfCells.length; j++) {
            const element = fieldOfCells[i][j];
            newFieldOfCells[i][j] = checkScore(i,j);
        }
        
    }
    fieldOfCells = newFieldOfCells;
    cycle++;
    renderCells();
    console.log("Gen:", cycle);
}

function stop() {
    clearInterval()
}
let someElem = "";
function cellInteract() {
    const cells = grid.querySelectorAll(".cell");

    cells.forEach(element => {
        element.addEventListener("click", (e)=>{
            someElem = e.target;
            console.log(e.target);
            switchCell(e.target);
        })
    });

}

function switchCell(cell) {
    let coords = cell.id.split("x");
    fieldOfCells[coords[0]][coords[1]] = 1
    if (cell.classList.contains("life")){
        cell.classList.remove("life");
    }
    else {
        cell.classList.add("life");
    }
}

newCycle();

// setInterval(() => {
//    newCycle(); 
// }, settings.interval);

//resetGrid();