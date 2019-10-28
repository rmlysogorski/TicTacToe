let XsTurn = true;
let won = false;
let Xscore = 0;
let Oscore = 0;

//This function checks if the game is not won
//and if there is nothing in that square
//If these conditions are true
//It draws a gray X or O depending on the turn
function mouseoverXorO(id){
    if(!won && document.getElementById(id).innerHTML === ""){
            document.getElementById(id).style.color = "gray";
            document.getElementById(id).innerHTML = XsTurn ? "X" : "O";
        }
}

//This function checks if the square's text color is gray
//If it is it resets the color to black and empties the square
function mouseoutXorO(id){
    if(document.getElementById(id).style.color === "gray"){
            document.getElementById(id).style.color = "royalblue";
            document.getElementById(id).innerHTML = "";
        }
}

//This function first checks that the game is not won
//Then makes sure the button has not already been filled
//If those conditions are true, the function will
//Set the buttons text to X or O based on the XsTurn bool
//Check for a winner using the checkWinner function
//Change the XsTurn bool
//Accordingly, change the turn element to reflect the current turn
function setXorO(id){
    if(!won && document.getElementById(id).style.color === "gray"){
        document.getElementById(id).style.color = XsTurn ? "royalblue" : "crimson";
        document.getElementById(id).innerHTML = XsTurn ? "X" : "O";
        checkWinner();
        if(!won){
            XsTurn = !XsTurn;
            document.getElementById("turn").innerHTML = XsTurn ? "X" : "O";
        }
        else{
            document.getElementById("status").innerHTML = XsTurn ? "X won!" : "O won!";
        }
    }
}

//This function checks for a winner by
//Creating an array filled with innerHTML strings from the buttons
//Then it uses the checkIndices function to
//See if the given three indices are Xs or Os
//If they are, the won bool is set to true 
//And the game ends
function checkWinner(){
    var arr = [];
    var player = XsTurn ? "X" : "O";
    var empty = false;

    for(i=1; i < 10; i++){
        arr[i] = document.getElementById("sq" + i).innerHTML;
        if(arr[i] === ""){
            empty = true;
        }
    }

    //Checks the three horizontal rows
    checkIndices(player, arr, 1, 2, 3);
    checkIndices(player, arr, 4, 5, 6);
    checkIndices(player, arr, 7, 8, 9);

    //Checks the three vertical rows
    checkIndices(player, arr, 1, 4, 7);
    checkIndices(player, arr, 2, 5, 8);
    checkIndices(player, arr, 3, 6, 9);

    //Checks the two Diagonal rows
    checkIndices(player, arr, 1, 5, 9);
    checkIndices(player, arr, 3, 5, 7);

    //Check for a tie
    if(!empty && !won){
        document.getElementById("status").innerHTML = "It's a tie!";
    }
}

//Player is either "X" or "O" based on the current turn
//The three indices are checked to see if they're all the same
//Which results in a win state
function checkIndices(player, arr, index1, index2, index3){
    if(arr[index1] === player && arr[index2] === player && arr[index3] === player){
        won = true;
        if(won === true){
            document.getElementById("sq" + index1).style.backgroundColor = "rgb(255, 255, 147)";
            document.getElementById("sq" + index2).style.backgroundColor = "rgb(255, 255, 147)";
            document.getElementById("sq" + index3).style.backgroundColor = "rgb(255, 255, 147)";
            setScore(player);
        }
    }
}

//This function resets the game so the user can play again
function resetGame(){
    //the bool values are reset
    XsTurn = true;
    won = false;

    //the buttons are emptied
    //and colors are initialized
    for(i = 1; i < 10; i++){
        document.getElementById("sq" + i).innerHTML = "";
        document.getElementById("sq" + i).style.color = "royalblue";
        document.getElementById("sq" + i).style.backgroundColor = "white";
    }

    //resets the turn status indicator
    document.getElementById("status").innerHTML = "It is <span id='turn'>X</span>'s turn.";

}

function setScore(player){
    document.getElementById(player).innerHTML = "";

    if(player === "X"){
        Xscore++;
        document.getElementById(player).innerHTML = "X: " + Xscore;
    }
    else{
        Oscore++;
        document.getElementById(player).innerHTML = "O: " + Oscore;
    }
}