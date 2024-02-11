const info = document.querySelector(".info");
const gameContainer = document.querySelector(".tic-tac-toe");

function playAudio(url) {
  new Audio(url).play();
}

let playout = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

let players = [
    {
        name: "O",
        score: 0,
        scoreContainer: document.querySelector("#o-score"),
        styleMarkup: "o-markup",
    },
    {
        name: "X",
        score: 0,
        scoreContainer: document.querySelector("#x-score"),
        styleMarkup: "x-markup",
    }
]

let turn = 0, currentPlayer = turn%2, disableGame = false, comeout;

const comeOut = (array = [["","",""],["","",""],["","",""]], thePlayer) => {
    if(array[0][0] == thePlayer && array[0][1] == thePlayer && array[0][2] == thePlayer) return true;
    if(array[1][0] == thePlayer && array[1][1] == thePlayer && array[1][2] == thePlayer) return true;
    if(array[2][0] == thePlayer && array[2][1] == thePlayer && array[2][2] == thePlayer) return true;
    if(array[0][0] == thePlayer && array[1][0] == thePlayer && array[2][0] == thePlayer) return true;
    if(array[0][1] == thePlayer && array[1][1] == thePlayer && array[2][1] == thePlayer) return true;
    if(array[0][2] == thePlayer && array[1][2] == thePlayer && array[2][2] == thePlayer) return true;
    if(array[0][0] == thePlayer && array[1][1] == thePlayer && array[2][2] == thePlayer) return true;
    if(array[2][0] == thePlayer && array[1][1] == thePlayer && array[0][2] == thePlayer) return true;
    return false;
}

const playResponse = (comeout) =>{
    if(comeout == false && turn <= 9){
        info.innerHTML = `Now's the <span class="${players[turn%2].styleMarkup}">${players[turn%2].name}</span>'s turn...`
    }else if(comeout == true){
        info.innerHTML = `<span class="${players[currentPlayer].styleMarkup}">${players[currentPlayer].name}</span>'s has won!`
        players[currentPlayer].score++;
        players[currentPlayer].scoreContainer.innerHTML = players[currentPlayer].score;
    }
    else info.innerHTML = `Nobody wins!`
    currentPlayer = turn%2;
    return
}

info.innerHTML = `It's the <span class="${players[turn%2].styleMarkup}">${players[turn%2].name}</span>'s turn...`

const setGame = () => {;
    if(comeout) return;
    players[0].scoreContainer.innerHTML = players[0].score;
    players[1].scoreContainer.innerHTML = players[1].score;
    gameContainer.innerHTML = "";
    playout.forEach((row) => {
        for(let i = 0; i < 3; i++){
            const position = document.createElement("span");
            position.classList.add("position");
            position.innerText = row[i]; 
            
            position.addEventListener("click", (event) => {
                if(row[i] != null || comeout == true) return;
                playAudio("/click-box.mp3");
                row[i] = players[currentPlayer].name;
                turn++;
                position.innerText = row[i]; 
                comeout = comeOut(playout, players[currentPlayer].name);
                playResponse(comeout);
                setGame();
            })

            gameContainer.append(position);
        }
    })
}
playAudio("/run-sound.wav");
setGame();

const restart = document.querySelector(".restart-button");

restart.addEventListener("click", () => {
    playout = [[null, null, null],[null, null, null],[null, null, null],];
    
    playAudio("/run-sound.wav");
    players[0].score = 0;
    players[0].scoreContainer.innerText = players[0].score;
    players[1].score = 0;
    players[1].scoreContainer.innerText = players[1].score;
    
    turn = 0;
    currentPlayer = turn%2;
    disableGame = false;
    comeout = null;
    
    info.innerHTML = `It's the <span class="${players[turn%2].styleMarkup}">${players[turn%2].name}</span>'s turn...`
    setGame();
})

const reset = document.querySelector(".reset-button");

reset.addEventListener("click", () => {
    playout = [[null, null, null],[null, null, null],[null, null, null],];
    playAudio("/reset.wav")
    turn = 0;
    currentPlayer = turn%2;
    disableGame = false;
    comeout = null;

    info.innerHTML = `It's the <span class="${players[turn%2].styleMarkup}">${players[turn%2].name}</span>'s turn...`
    setGame();
})