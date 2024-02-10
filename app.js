let currentPlayer = "O", scores = [0, 0], playout =[
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const renderPositions = () => {
    const gameContainer = document.querySelector(".tic-tac-toe");
    gameContainer.innerHTML = "";
    playout.forEach((row) => {
        for(let i = 0; i < 3; i++){
            const position = document.createElement("span");
            position.classList.add("position");
            position.innerText = row[i]; 

            position.addEventListener("click", (event) => {
                switch (currentPlayer){
                    case 'O': 
                        row[i] = "O"; 
                        currentPlayer = "X";
                        break;
                    case 'X': 
                        row[i] = "X"; 
                        currentPlayer = "O";
                        break;
                }
                renderPositions();
            })

            gameContainer.append(position);
        }
    })
    console.log(playout);
}

renderPositions();