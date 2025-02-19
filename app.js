let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // true for Player O, false for Player X
let isGameActive = true; // Track game state

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    isGameActive = true; // Re-enable gameplay
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach(box => {
        box.innerText = ""; // Clear the box text
        box.classList.remove("red", "green"); // Remove color classes
    });
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
    });
};
const showWinner= (winner) =>{
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            isGameActive = false; // Stop further moves
            msg.innerText = `Winner: ${pos1}`;
            msgContainer.classList.remove("hide");
            disableBoxes();
            return;
        }
    }

    // Check for a draw
    let isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        isGameActive = false;
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && isGameActive) {
            if (turnO) {
                box.innerText = "O";
                box.classList.add("red");
            } else {
                box.innerText = "X";
                box.classList.add("green");
            }
            box.disabled = true;
            checkWinner();
            turnO = !turnO; // Switch turns
        }
    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
