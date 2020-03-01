// hardcoded starting player balance
let playerBalance = 100;

// array of cards containing src for each one
// let deck = ["2_of_clubs.png", "2_of_diamonds.png", "2_of_hearts.png", "2_of_spades.png", "3_of_clubs.png", "3_of_diamonds.png", "3_of_hearts.png", "3_of_spades.png", "4_of_clubs.png", "4_of_diamonds.png", "4_of_hearts.png", "4_of_spades.png", "5_of_clubs.png", "5_of_diamonds.png", "5_of_hearts.png", "5_of_spades.png", "6_of_clubs.png", "6_of_diamonds.png", "6_of_hearts.png", "6_of_spades.png", "7_of_clubs.png", "7_of_diamonds.png", "7_of_hearts.png", "7_of_spades.png", "8_of_clubs.png", "8_of_diamonds.png", "8_of_hearts.png", "8_of_spades.png", "9_of_clubs.png", "9_of_diamonds.png", "9_of_hearts.png", "9_of_spades.png", "10_of_clubs.png", "10_of_diamonds.png", "10_of_hearts.png", "10_of_spades.png", "ace_of_clubs.png", "ace_of_diamonds.png", "ace_of_hearts.png", "ace_of_spades2.png" ]
let deck = [["2_of_clubs.png", 2], ["2_of_diamonds.png", 2], ["2_of_hearts.png", 2], ["2_of_spades.png", 2], ["3_of_clubs.png", 3], ["3_of_diamonds.png", 3], ["3_of_hearts.png", 3], ["3_of_spades.png", 3], ["4_of_clubs.png", 4], ["4_of_diamonds.png", 4], ["4_of_hearts.png", 4], ["4_of_spades.png", 4], ["5_of_clubs.png", 5], ["5_of_diamonds.png", 5], ["5_of_hearts.png", 5], ["5_of_spades.png", 5], ["6_of_clubs.png", 6], ["6_of_diamonds.png", 6], ["6_of_hearts.png", 6], ["6_of_spades.png", 6], ["7_of_clubs.png", 7], ["7_of_diamonds.png", 7], ["7_of_hearts.png", 7], ["7_of_spades.png", 7], ["8_of_clubs.png", 8], ["8_of_diamonds.png", 8], ["8_of_hearts.png", 8], ["8_of_spades.png", 8], ["9_of_clubs.png", 9], ["9_of_diamonds.png", 9], ["9_of_hearts.png", 9], ["9_of_spades.png", 9] ["10_of_clubs.png", 10], ["10_of_diamonds.png", 10], ["10_of_hearts.png", 10], ["10_of_spades.png", 10], ["ace_of_clubs.png", 1], ["ace_of_diamonds.png", 1], ["ace_of_hearts.png", 1], ["ace_of_spades2.png", 1]]

// let balanceDiv = document.getElementById("player-balance");
// balanceDiv.innerHTML = "Player has " + playerBalance + " chips";

// function playAudio()
// {
//     // Create audio instance and play it on button click
//     let audio = new Audio("sounds/cardFan2.wav");
//     audio.play();

//     let playerCardsDiv = document.getElementById("player-cards");
//     // generate random number to get random card out of deck
//     let card = deck[Math.floor(Math.random() * deck.length)];
//     let card2 = deck[Math.floor(Math.random() * deck.length)];
//     playerCardsDiv.innerHTML = "";
//     playerCardsDiv.innerHTML += `<img width="100px" height="150px" src='images/cards/${card}' >`
//     playerCardsDiv.innerHTML += `<img width="100px" height="150px" src='images/cards/${card2}' >`

//     let houseCardDiv = document.getElementById("house-cards");
//     let houseCard = deck[Math.floor(Math.random() * deck.length)];
//     houseCardDiv.innerHTML = "";
//     houseCardDiv.innerHTML = `<img width="100px" height="150px" src='images/cards/${houseCard}' >`
// }

function clearDivs()
{
    let houseCardDiv = document.getElementById("house-cards");
    houseCardDiv.innerHTML = "";

    let playerCardsDiv = document.getElementById("player-cards");
    playerCardsDiv.innerHTML = "";

    let balanceDiv = document.getElementById("player-balance");
    balanceDiv.innerHTML = "";

}

function hit()
{
    //     // Create audio instance and play it on button click
    let audio = new Audio("sounds/chipsStack3.wav");
    audio.play();

    let playerCards = dealCard(1);
    let playerCardsDiv = document.getElementById("player-cards");
    playerCardsDiv.innerHTML += `<img class="playerCard" width="100px" height="150px" alt="${playerCards[0][1]}" src='images/cards/${playerCards[0][0]}' >`
}

function dealCard(amount)
{
    let cards = [];

    for (let i = 0; i < amount; i++)
    {
        let card = deck[Math.floor(Math.random() * deck.length)];
        cards.push(card)
    }

    return cards;
}

function playHand()
{
    // Create audio instance and play it on button click
    let audio = new Audio("sounds/cardFan2.wav");
    audio.play();

    // Clear playercarddiv before adding new cards
    clearDivs();

    // Deal the player 2 starting cards
    let playerCards = dealCard(2);
    console.log(playerCards);
    let playerCardsDiv = document.getElementById("player-cards");
    for (let i = 0; i < 2; i++)
    {
        playerCardsDiv.innerHTML += `<img class="playerCard" width="100px" height="150px" alt="${playerCards[i][1]}" src='images/cards/${playerCards[i][0]}' >`
    }
    
}

function stand()
{
    let score = 0;
    let playerCardsDiv = document.getElementById("player-cards");
    let children = playerCardsDiv.querySelectorAll(".playerCard");
    for (let i = 0; i < children.length; i++ )
    {
        // let childSrc = children[i].src.slice(35, -4);
        // console.log(childSrc);

        let value = parseInt(children[i].alt);
        score += value;
        console.log(score);
    }

    let balanceDiv = document.getElementById("player-balance");
    balanceDiv.innerHTML = `Player has a ${score}`;

}