//let deck = [["2_of_clubs.png", 2], ["2_of_diamonds.png", 2], ["2_of_hearts.png", 2], ["2_of_spades.png", 2], ["3_of_clubs.png", 3], ["3_of_diamonds.png", 3], ["3_of_hearts.png", 3], ["3_of_spades.png", 3], ["4_of_clubs.png", 4], ["4_of_diamonds.png", 4], ["4_of_hearts.png", 4], ["4_of_spades.png", 4], ["5_of_clubs.png", 5], ["5_of_diamonds.png", 5], ["5_of_hearts.png", 5], ["5_of_spades.png", 5], ["6_of_clubs.png", 6], ["6_of_diamonds.png", 6], ["6_of_hearts.png", 6], ["6_of_spades.png", 6], ["7_of_clubs.png", 7], ["7_of_diamonds.png", 7], ["7_of_hearts.png", 7], ["7_of_spades.png", 7], ["8_of_clubs.png", 8], ["8_of_diamonds.png", 8], ["8_of_hearts.png", 8], ["8_of_spades.png", 8], ["9_of_clubs.png", 9], ["9_of_diamonds.png", 9], ["9_of_hearts.png", 9], ["9_of_spades.png", 9] ["10_of_clubs.png", 10], ["10_of_diamonds.png", 10], ["10_of_hearts.png", 10], ["10_of_spades.png", 10], ["ace_of_clubs.png", 1], ["ace_of_diamonds.png", 1], ["ace_of_hearts.png", 1], ["ace_of_spades2.png", 1], ["jack_of_clubs2.png", 10], ["jack_of_diamonds2.png", 10], ["jack_of_hearts2.png", 10], ["jack_of_spades2.png", 10], ["king_of_clubs2.png", 10], ["king_of_diamonds2.png", 10], ["king_of_hearts2.png", 10], ["king_of_spades2.png", 10], ["queen_of_clubs2.png", 10], ["queen_of_diamonds2.png", 10], ["queen_of_hearts2.png", 10], ["queen_of_spades2.png", 10]];
let shuffledDeck;
let playerBalance = 200;
let playerBet = 0;

function shuffleDeck(arr)
{
    for (let i = arr.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * i)
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
}

function update()
{
    let max = document.getElementById("betSelect").max = playerBalance;
    console.log(max)

    let balance = document.getElementById("balance");
    balance.innerHTML = `Player has a balance of: ${playerBalance}`
}

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
    if (winner === "player" || winner === "house")
    {
        winnerHeader.innerHTML = `${winner} wins!`
    }
    else if (winner == "tie") 
    {
        winnerHeader.innerHTML = `Player pushes`
    }

    update()
}

function checkScore()
{
    let playerScore = 0;
    let houseScore = 0;

    let playerCardsDiv = document.getElementById("player-cards");
    let playerCards = playerCardsDiv.children;

    for (let i = 0; i < playerCards.length; i++)
    {
        playerScore += parseInt(playerCards[i].alt);
    }

    let houseCardDiv = document.getElementById("house-cards");
    let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");
    hiddenCard.classList.remove("hiddenCard")
    console.log(hiddenCard);
    let houseCards = houseCardDiv.children;

    for (let i = 0; i < houseCards.length; i++)
    {
        houseScore += parseInt(houseCards[i].alt);
    }

    if (houseScore > 21 && playerScore <= 21)
    {
        console.log("House busted, player wins")
        playerBalance += playerBet;
        showWinner("player")
    }
    else if (playerScore <= 21 && houseScore <= 21)
    {
        if (playerScore > houseScore)
        {
            console.log("player wins");
            playerBalance += playerBet;
            showWinner("player");
        }
        else if (playerScore === houseScore)
        {
            console.log("player pushes");
            playerBalance = playerBalance;
            showWinner("tie");
        }
        else
        {
            console.log("House scored more than the player");
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
    // Check for blackjack
    if (houseScore == 21 && houseCards.length == 2)
    {
        if (playerScore == 21 && playerCards.length == 2)
        {
            console.log("Player pushes")
            playerBalance = playerBalance;
            showWinner('tie')
        } else 
        {
            console.log("House has a blackjack...")
            playerBalance -= playerBet;
            let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");
            hiddenCard.classList.remove("hiddenCard")
            showWinner('house')
        }
    }
    else if (playerScore > 21)
    {
        console.log("You busted")
        let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");
        hiddenCard.classList.remove("hiddenCard")
        playerBalance -= playerBet;
        showWinner("house")
    }

    else if (playerScore == 21 && playerCards.length == 2)
    {
        console.log("Player has a blackjack!");
        playerBalance += playerBet * 2;
        showWinner('player');
    }

    let balanceDiv = document.getElementById("player-balance");
    //balanceDiv.innerHTML = `Player has a ${playerScore}`;
}

function dealHand()
{
    let playerCards = [];
    let houseCards = [];

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

    let hiddenCard = houseCardDiv.querySelector("img:nth-child(2)");
    hiddenCard.classList.add("hiddenCard")
    console.log(hiddenCard);

    check();

}

function hit()
{
    // Create audio instance and play it on button click
    let audio = new Audio("sounds/chipsStack3.wav");
    audio.play();

    let playerCard = shuffledDeck.pop();
    let playerCardsDiv = document.getElementById("player-cards");
    playerCardsDiv.innerHTML += `<img class="playerCard" width="100px" height="150px" alt="${playerCard[1]}" src='images/cards/${playerCard[0]}' >`;

    check();
}

function stand()
{
    let playerScore = 0;
    let playerCardsDiv = document.getElementById("player-cards");
    let children = playerCardsDiv.querySelectorAll(".playerCard");
    for (let i = 0; i < children.length; i++ )
    {
        // let childSrc = children[i].src.slice(35, -4);
        // console.log(childSrc);

        let value = parseInt(children[i].alt);
        playerScore += value;
        console.log(playerScore);
    }

    checkScore();
}

function checkEvent(obj)
{
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
    let main = document.getElementById("main");
    main.classList.add("hiddenContainer");

    let cashOut = document.getElementById("cash-out");
    cashOut.classList.remove("cash-out");

    let cashOutBalance = document.getElementById("cashOutBalance");
    cashOutBalance.innerHTML = `$${playerBalance}.00`

}

function playAgain()
{
    let main = document.getElementById("main");
    main.classList.remove("hiddenContainer");

    let cashOut = document.getElementById("cash-out");
    cashOut.classList.add("cash-out");
}

function playHand()
{
    document.getElementById("winner").innerHTML = ""
    //let playButton = document.getElementById("playBtn").style.display = "none"
    let deck = [["2_of_clubs.png", 2], ["2_of_diamonds.png", 2], ["2_of_hearts.png", 2], ["2_of_spades.png", 2], ["3_of_clubs.png", 3], ["3_of_diamonds.png", 3], ["3_of_hearts.png", 3], ["3_of_spades.png", 3], ["4_of_clubs.png", 4], ["4_of_diamonds.png", 4], ["4_of_hearts.png", 4], ["4_of_spades.png", 4], ["5_of_clubs.png", 5], ["5_of_diamonds.png", 5], ["5_of_hearts.png", 5], ["5_of_spades.png", 5], ["6_of_clubs.png", 6], ["6_of_diamonds.png", 6], ["6_of_hearts.png", 6], ["6_of_spades.png", 6], ["7_of_clubs.png", 7], ["7_of_diamonds.png", 7], ["7_of_hearts.png", 7], ["7_of_spades.png", 7], ["8_of_clubs.png", 8], ["8_of_diamonds.png", 8], ["8_of_hearts.png", 8], ["8_of_spades.png", 8], ["9_of_clubs.png", 9], ["9_of_diamonds.png", 9], ["9_of_hearts.png", 9], ["9_of_spades.png", 9] ["10_of_clubs.png", 10], ["10_of_diamonds.png", 10], ["10_of_hearts.png", 10], ["10_of_spades.png", 10], ["ace_of_clubs.png", 11], ["ace_of_diamonds.png", 11], ["ace_of_hearts.png", 11], ["ace_of_spades2.png", 11], ["jack_of_clubs2.png", 10], ["jack_of_diamonds2.png", 10], ["jack_of_hearts2.png", 10], ["jack_of_spades2.png", 10], ["king_of_clubs2.png", 10], ["king_of_diamonds2.png", 10], ["king_of_hearts2.png", 10], ["king_of_spades2.png", 10], ["queen_of_clubs2.png", 10], ["queen_of_diamonds2.png", 10], ["queen_of_hearts2.png", 10], ["queen_of_spades2.png", 10]];
    shuffledDeck = shuffleDeck(deck);

    let betValue = parseInt(document.getElementById("betSelect").value);
    playerBet = betValue;
    clearDivs();
    dealHand();
    // checkEvent();

}


// Create event listeners for buttons, calling the corresponding method
let playButton = document.getElementById("playBtn").addEventListener("click", playHand);
let clearButton = document.getElementById("clearBtn").addEventListener("click", clearDivs);