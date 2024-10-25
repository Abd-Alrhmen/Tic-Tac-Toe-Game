const board = document.querySelector(".board");
const refresh = document.querySelector("header .reload");
let currentPlayer = "x";
let cells = Array.from({length : 9});



const handelClick = (e) =>{
    const cellIndex = e.target.dataset.index;
    //Check If Cell Is Empty Or No
    if(cells[cellIndex]) return;
    updateCell(cellIndex, currentPlayer);
    const winner = checkWinner();
    setTimeout(() => {
        if(winner || !cells.includes(undefined)){
            alert(winner ? `Player ${winner} Wins!`: " Its a Draw!");
            resetGame();
        }; 
    }, 100);
};

const updateCell = (index, value) =>{
    cells[index] = value;
    const cell = document.querySelector(`[data-index = "${index}"]`)
    cell.textContent = value;
    cell.classList.add(value ==="x" ? "text-[#32c3c0]" : "text-[#f2b237]");
    
    //Switch Player
    currentPlayer = currentPlayer === "x" ? "o" : "x";
}


//المشكله ان الخلفيه الكبيره مش بتظهر وبيظهر المربع بعد النقر
const checkWinner = () => {
    const winingCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    
    for(const combo of winingCombos){
        const [a,b,c] = combo;

        if(cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            return cells[a];
        }
    }
    return null;
}

const resetGame =()=> {
    cells=Array.from({length:9})
    board.querySelectorAll(".cell").forEach((cell) => {
        cell.textContent="";
        cell.classList.remove("player-x","player-o");
    });
};
refresh.addEventListener("click",()=>{
    resetGame()
})
document.addEventListener("keydown",(e) => {
    if(e.key === "Escape") resetGame();
});

cells.forEach((cell, index) => {
    cell = document.createElement("div");
    cell.classList.add("cell",'bg-[#1f3540]','shadow-[0px_4px_10px_rgba(0,0,0,.3)]','rounded-md','gred','border','border-solid','border-[#1f3540]','flex','justify-center','items-center','text-6xl','cursor-pointer','transition','duration-300','hover:bg-[#a9bfca]','bg-opacity-20');
    cell.dataset.index = index;
    cell.addEventListener("click", handelClick)
    board.appendChild(cell);
});


