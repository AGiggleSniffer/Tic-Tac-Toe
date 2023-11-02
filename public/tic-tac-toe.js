// Main Events
let winner = false;
let turn = true;
window.addEventListener("DOMContentLoaded", event => {
    

    const playAreaArr = document.querySelectorAll(".area-wrapper");

    playAreaArr.forEach(areaWrapper => {
        let textCache;
        areaWrapper.addEventListener("click", event => {
            if (winner) return;
            if (turn & event.target.IdName !== "applied") {
                event.target.innerText = "X";
                event.target.IdName = "applied";
                textCache = "X";
                turn = false;
            }
            else if (event.target.IdName !== "applied") {
                event.target.innerText = "O";
                event.target.IdName = "applied";
                textCache = "O";
                turn = true;
            }
            updateResults();
        });
        areaWrapper.addEventListener("mouseover", event => {
            if (event.target.IdName !== "applied") {
                // Display next move
                let move;
                if (turn) move = "X";
                else move = "O";
                
                textCache = event.target.innerText;
                event.target.innerText = move;
            }
        });
        areaWrapper.addEventListener("mouseout", event => {
            // Remove the displayed move
            if (event.target.IdName !== "applied") {
                event.target.innerText = textCache;
            }
        });
    });

    // New Game & Give up
    const newGame = document.querySelector("#new-game");

    newGame.addEventListener("click", event => {
        if (event.target.className === "enabled") {
            document.querySelectorAll("div.label").forEach(ele => {
                ele.innerText = "";
                ele.IdName = "";
                winner = false;
            });
            document.querySelector("h1").innerText = "";
            event.target.className = "";
        }
    });

    const giveUp = document.querySelector("#give-up");

    giveUp.addEventListener("click", event => {
        displayWinner();
    });
});

// Helper Functions

const gridMatrix = [
    new Array(3).fill(null),
    new Array(3).fill(null),
    new Array(3).fill(null)
];

const updateResults = () => {
    const gridArr = document.querySelectorAll(".label");
    console.log(gridArr);
    gridArr.forEach((ele, i) => {
        if (ele.innerText && i < 3) gridMatrix[0][i] = ele.innerText;
        else if (ele.innerText && i < 6) gridMatrix[1][i - 3] = ele.innerText;
        else if (ele.innerText) gridMatrix[2][i - 6] = ele.innerText;
    });

    const result = checkForWin(gridMatrix);
    if (result) displayWinner();
};

const checkForWin = board => {
    let b = board;
  
    for (let i=0; i<b.length; i++) {
      if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
        return true;
      } else if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
        return true;
      }
    }
  
    if (b[1][1]) {
      if (b[0][0] === b[1][1] && b[1][1] === b[2][2] ||
          b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
        return true;
      }
    }
  
    return false;
};

const displayWinner = () => {
    const header = document.querySelector("h1");
    const button = document.querySelector("div#buttons button");
    button.className = "enabled";
    if (!winner) header.innerText = "Lost!";
    else if (turn) header.innerText = "Winner O!";
    else header.innerText = "Winner X!";
    winner = true;
};