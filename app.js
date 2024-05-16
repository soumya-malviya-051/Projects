let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn_msg = document.querySelector("#turn");
let count_x=document.querySelector("#count_x");
let count_o=document.querySelector("#count_o");
let count_ties=document.querySelector("#count_ties");
let clickSound = document.getElementById("clickSound");
let winSound = document.getElementById("winSound");
let tieSound = document.getElementById("tieSound");

clickSound.preload = "auto";

let x_wins=0;
let o_wins=0;
let ties=0;

let turn_O = true; // This is player 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn_O = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turn_msg.classList.remove("turn_hide");
    turn_msg.innerHTML="Player O's turn";
}


clickSound.addEventListener("canplaythrough", function() {
    // The audio file is loaded and ready to play
    console.log("Audio file loaded");
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        clickSound.currentTime = 0; 
        clickSound.play();
        if (turn_O) {
            box.innerHTML = "O",
            turn_msg.innerHTML="Player X's turn";
            turn_O = false;
            box.style.color="orange";
        } else {
            box.innerHTML = "X";
            turn_msg.innerHTML="Player O's turn";
            turn_O = true;
            box.style.color="skyblue";
        }
        box.disabled = true;

        let check=checkWinner();
        if(check==false){
            let check_tie=checkTies();
            if(check_tie){
                showTie();
            }
        }
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    turn_msg.classList.add("turn_hide");
    if(winner=="X"){
        x_wins=x_wins+1;
    } else if(winner=="O"){
        o_wins=o_wins+1;
    }
    winSound.play();
    count_x.innerHTML=x_wins;
    count_o.innerHTML=o_wins;
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                console.log("Winner is Player", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    };
    return false;
}

const checkTies=()=>{
    let flag=true;
    for (let box of boxes)
    {
        if(box.innerHTML==""){
            flag=false;
            break;
        }
    }
    if(flag==false){
        return false;
    } else{
        return true;
    }
}

showTie=()=>{
    msg.innerHTML="Game Tied!";
    msgContainer.classList.remove("hide");
    turn_msg.classList.add("turn_hide");
    ties=ties+1;
    count_ties.innerHTML=ties;
    tieSound.play();
    disableBoxes();
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

