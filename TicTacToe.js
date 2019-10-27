let XsTurn = true;
let won = false;

//This function first checks that the game is not won
//Then makes sure the button has not already been filled
//If those conditions are true, the function will
//Set the buttons text to X or O based on the XsTurn bool
//Check for a winner using the checkWinner function
//Change the XsTurn bool
//Accordingly, change the turn element to reflect the current turn
function setXorO(id){
    if(!won &&
        document.getElementById(id).innerHTML != "X" &&
        document.getElementById(id).innerHTML != "O"
        ){
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
    for(i=1; i < 10; i++){
    	arr[i] = document.getElementById("sq" + i).innerHTML;
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
}

//Player is either "X" or "O" based on the current turn
//The three indices are checked to see if they're all the same
//Which results in a win state
function checkIndices(player, arr, index1, index2, index3){
    if(arr[index1] === player && arr[index2] === player && arr[index3] === player){
        won = true;
        console.log(player + " wins!");
    }
}

//This function resets the game so the user can play again
function resetGame(){
    //the bool values are reset
    XsTurn = true;
    won = false;

    //the buttons are emptied
    for(i = 1; i < 10; i++){
        document.getElementById("sq" + i).innerHTML = "";
    }

    //resets the turn status indicator
    document.getElementById("status").innerHTML = "It is <span id='turn'>X</span>'s turn.";
}