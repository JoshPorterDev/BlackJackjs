// Define global variables
let shuffledDeck;
let playerBalance = 200;
let playerBet = 0;

// Shuffle algorithm, takes an array as an argument
function shuffleDeck(arr)
{
    for (let i = arr.length - 1; i > 0; i--)
    {
        // Generates a random number and uses that as an index to switch with the index of i
        const j = Math.floor(Math.random() * i)
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Return the shuffled array for use 
    return arr;
}

function update()
{
    // Updates the max value on the range input, allowing the player to bet as much as their current balance
    let max = document.getElementById("betSelect").max = playerBalance;
    console.log(max)

    // Write Players updated balance to screen
    let balance = document.getElementById("balance");
    balance.innerHTML = `Player has a balance of: ${playerBalance}`
}

// Empty the contents of all divs, is called when a new hand is started
function clearDivs()
{
    let winnerHeader = document.getElementById("winner");
    winnerHeader.innerHTML = "...";

    let houseCardDiv = document.getElementById("house-cards");
    houseCardDiv.innerHTML = "";

    let playerCardsDiv = document.getElementById("player-cards");
    playerCardsDiv.innerHTML = "";

    let balanceDiv = document.getElementById("player-balance");
    balanceDiv.innerHTML = "";
}

function showWinner(winner)
{
    let winnerHeader = document.getElementById("winner");
    winnerHeader.innerHTML = "";

    // A check to see if the player of house won if so, write that to screen
    if (winner === "player" || winner === "house")
    {
        winnerHeader.innerHTML = `${winner} wins!`
    }
    // If neither house or player won, the player must have pushed
    else if (winner == "tie") 
    {
        winnerHeader.innerHTML = `Player pushes`
    }

    // Update values on screen
    update()
}

function checkScore()
{
    let playerScore = 0;
    let houseScore = 0;

    let playerCardsDiv = document.getElementById("player-cards");
    let playerCards = playerCardsDiv.children;

    // Grab alt value of each image inside div, adding that to the player score
    for (let i = 0; i < playerCards.length; i++)
    {
        playerScore += parseInt(playerCards[i].alt);
    }


    let houseCardDiv = document.getElementById("house-cards");

    // Nth child allows us to get the second child image inside of that div
    let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");

    // Remove the hiddenCard class revelaing the image
    hiddenCard.classList.remove("hiddenCard")

    let houseCards = houseCardDiv.children;

    for (let i = 0; i < houseCards.length; i++)
    {
        houseScore += parseInt(houseCards[i].alt);
    }

    // If house busts and player stays at or below 21, player wins
    if (houseScore > 21 && playerScore <= 21)
    {
        console.log("House busted, player wins");

        // Increase the players balance by their bet
        playerBalance += playerBet;
        showWinner("player")
    }

    // If both player score and house score remain below 21
    else if (playerScore <= 21 && houseScore <= 21)
    {
        // Player scoring higher means they win
        if (playerScore > houseScore)
        {
            console.log("player wins");
            playerBalance += playerBet;
            showWinner("player");
        }

        // Check for push
        else if (playerScore === houseScore)
        {
            console.log("player pushes");
            playerBalance = playerBalance;
            showWinner("tie");
        }

        // Otherwise house scored more and wins
        else
        {
            console.log("House scored more than the player");
            // Remove players bet from their balance
            playerBalance -= playerBet;
            showWinner("house");
        }
    }
}

function check()
{
    let playerScore = 0;
    let houseScore = 0;

    let playerCardsDiv = document.getElementById("player-cards");
    let playerCards = playerCardsDiv.children;

    for (let i = 0; i < playerCards.length; i++)
    {
        playerScore += parseInt(playerCards[i].alt);
        console.log(playerScore);
    }

    let houseCardDiv = document.getElementById("house-cards");
    let houseCards = houseCardDiv.children;

    for (let i = 0; i < houseCards.length; i++)
    {
        houseScore += parseInt(houseCards[i].alt);
        console.log(houseScore);
    }
    // Check for house blackjack
    if (houseScore == 21 && houseCards.length == 2)
    {
        // If player also has blackjack, they push
        if (playerScore == 21 && playerCards.length == 2)
        {
            console.log("Player pushes")
            playerBalance = playerBalance;
            showWinner('tie')
        } 
        // Otherwise they lose
        else 
        {
            console.log("House has a blackjack...")
            playerBalance -= playerBet;
            let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");
            // remove hidden class from houses second card, revealing it to the player
            hiddenCard.classList.remove("hiddenCard")
            showWinner('house')
        }
    }
    // Player score of > 21 means player busted
    else if (playerScore > 21)
    {
        console.log("You busted")
        let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");
        hiddenCard.classList.remove("hiddenCard")
        playerBalance -= playerBet;
        showWinner("house")
    }

    // Check for player blackjack
    else if (playerScore == 21 && playerCards.length == 2)
    {
        console.log("Player has a blackjack!");
        playerBalance += playerBet * 2;
        showWinner('player');
    }
}

function dealHand()
{
    // Setup player and house card arrays, each will hold 2 cards
    let playerCards = [];
    let houseCards = [];

    // Loop will run twice, giving player and house 2 random cards each
    for (let i =0; i <= 2; i++)
    {
        let playerCard = shuffledDeck.pop();
        playerCards.push(playerCard);

        let houseCard = shuffledDeck.pop();
        houseCards.push(houseCard);
    }

    // Draw to screen
    let playerCardsDiv = document.getElementById("player-cards");
    for (let i = 0; i < 2; i++)
    {
        playerCardsDiv.innerHTML += `<img class="playerCard" width="100px" height="150px" alt="${playerCards[i][1]}" src='images/cards/${playerCards[i][0]}' >`
    } 

    let houseCardDiv = document.getElementById("house-cards");
    for (let i = 0; i < 2; i++)
    {
        houseCardDiv.innerHTML += `<img class="playerCard" width="100px" height="150px" alt="${houseCards[i][1]}" src='images/cards/${houseCards[i][0]}' >`
    }

    // In blackjack, the dealers 2nd card is kept hidden until the player is done playing
    let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");
    // Add class to img giving it a display property set to none
    hiddenCard.classList.add("hiddenCard")

    check();

}

function hit()
{
    // Create audio instance and play it on button click
    let audio = new Audio("sounds/cardPlace4.wav");
    audio.play();

    // Grab card from end of array and draw it to screen
    let playerCard = shuffledDeck.pop();
    let playerCardsDiv = document.getElementById("player-cards");
    playerCardsDiv.innerHTML += `<img class="playerCard" width="100px" height="150px" alt="${playerCard[1]}" src='images/cards/${playerCard[0]}' >`;

    // Call check method after each hit, making sure that player didn't bust
    check();
}

function stand()
{
    // After the player stands, the house reveals his hidden card and draws any remaining cards
    let houseScore = 0;
    let houseCardDiv = document.getElementById("house-cards");
    let houseCards = houseCardDiv.children;

    // Grabs all children images inside house cards div 
    for (let i = 0; i < houseCards.length; i++)
    {
        // Turns each images alt value into an int and adds it to the house score
        houseScore += parseInt(houseCards[i].alt);
        console.log(houseScore);
    }

    // House will continue to draw cards until score is atleast 16
    while (houseScore < 16)
    {
        let houseCard = shuffledDeck.pop();
        houseCardDiv.innerHTML += `<img class="playerCard" width="100px" height="150px" alt="${houseCard[1]}" src='images/cards/${houseCard[0]}' >`;
        houseScore += houseCard[1];
    }

    // After all house and player cards have been drawn we check the score
    checkScore();
}

function checkEvent(obj)
{
    // Both hit and stand buttons call this method on click
    // A check to see which button was clicked
    if (obj.innerHTML == "Hit")
    {
        hit();
    }
    else
    {
        stand();
    }

}

function showBet(val)
{
    document.getElementById("bet").innerHTML = val;
}

function cashOut()
{
    // Add a class that hides the main div
    let main = document.getElementById("main");
    main.classList.add("hiddenContainer");

    // Remove class hiding div, revealing the div
    let cashOut = document.getElementById("cash-out");
    cashOut.classList.remove("cash-out");

    // Print players final balance
    let cashOutBalance = document.getElementById("cashOutBalance");
    cashOutBalance.innerHTML = `$${playerBalance}.00`

}

function playAgain()
{
    // Remove hiddenContainer class from main, revelaing the main div again
    let main = document.getElementById("main");
    main.classList.remove("hiddenContainer");

    // Add cash-out class to div, setting its display to none
    let cashOut = document.getElementById("cash-out");
    cashOut.classList.add("cash-out");
}

function playHand()
{
    // New audio object, pass in wav file
    let audio = new Audio("sounds/cardPlace4.wav");
    // Call play method on that audio object
    audio.play();

    // Reset winner html after each new hand is started
    document.getElementById("winner").innerHTML = "";

    //let playButton = document.getElementById("playBtn").style.display = "none"
    let deck = [["2_of_clubs.png", 2], ["2_of_diamonds.png", 2], ["2_of_hearts.png", 2], ["2_of_spades.png", 2], ["3_of_clubs.png", 3], ["3_of_diamonds.png", 3], ["3_of_hearts.png", 3], ["3_of_spades.png", 3], ["4_of_clubs.png", 4], ["4_of_diamonds.png", 4], ["4_of_hearts.png", 4], ["4_of_spades.png", 4], ["5_of_clubs.png", 5], ["5_of_diamonds.png", 5], ["5_of_hearts.png", 5], ["5_of_spades.png", 5], ["6_of_clubs.png", 6], ["6_of_diamonds.png", 6], ["6_of_hearts.png", 6], ["6_of_spades.png", 6], ["7_of_clubs.png", 7], ["7_of_diamonds.png", 7], ["7_of_hearts.png", 7], ["7_of_spades.png", 7], ["8_of_clubs.png", 8], ["8_of_diamonds.png", 8], ["8_of_hearts.png", 8], ["8_of_spades.png", 8], ["9_of_clubs.png", 9], ["9_of_diamonds.png", 9], ["9_of_hearts.png", 9], ["9_of_spades.png", 9] ["10_of_clubs.png", 10], ["10_of_diamonds.png", 10], ["10_of_hearts.png", 10], ["10_of_spades.png", 10], ["ace_of_clubs.png", 11], ["ace_of_diamonds.png", 11], ["ace_of_hearts.png", 11], ["ace_of_spades2.png", 11], ["jack_of_clubs2.png", 10], ["jack_of_diamonds2.png", 10], ["jack_of_hearts2.png", 10], ["jack_of_spades2.png", 10], ["king_of_clubs2.png", 10], ["king_of_diamonds2.png", 10], ["king_of_hearts2.png", 10], ["king_of_spades2.png", 10], ["queen_of_clubs2.png", 10], ["queen_of_diamonds2.png", 10], ["queen_of_hearts2.png", 10], ["queen_of_spades2.png", 10]];
    shuffledDeck = shuffleDeck(deck);

    // Grab value from range input and save that to the players current bet
    let betValue = parseInt(document.getElementById("betSelect").value);
    playerBet = betValue;
    clearDivs();
    dealHand();
}


// Create event listeners for buttons, calling the corresponding method
let playButton = document.getElementById("playBtn").addEventListener("click", playHand);
let clearButton = document.getElementById("clearBtn").addEventListener("click", clearDivs);