// hardcoded starting player balance
let playerBalance = 100;

// array of cards containing src for each one
let deck = ["2_of_clubs.png", "2_of_diamonds.png", "2_of_hearts.png", "2_of_spades.png", "3_of_clubs.png", "3_of_diamonds.png", "3_of_hearts.png", "3_of_spades.png", "4_of_clubs.png", "4_of_diamonds.png", "4_of_hearts.png", "4_of_spades.png", "5_of_clubs.png", "5_of_diamonds.png", "5_of_hearts.png", "5_of_spades.png", "6_of_clubs.png", "6_of_diamonds.png", "6_of_hearts.png", "6_of_spades.png", "7_of_clubs.png", "7_of_diamonds.png", "7_of_hearts.png", "7_of_spades.png", "8_of_clubs.png", "8_of_diamonds.png", "8_of_hearts.png", "8_of_spades.png", "9_of_clubs.png", "9_of_diamonds.png", "9_of_hearts.png", "9_of_spades.png", "10_of_clubs.png", "10_of_diamonds.png", "10_of_hearts.png", "10_of_spades.png", "ace_of_clubs.png", "ace_of_diamonds.png", "ace_of_hearts.png", "ace_of_spades2.png" ]

let balanceDiv = document.getElementById("player-balance");
balanceDiv.innerHTML = "Player has " + playerBalance + " chips";

function playAudio()
{
    // Create audio instance and play it on button click
    let audio = new Audio("sounds/cardFan2.wav");
    audio.play();

    let playerCardsDiv = document.getElementById("player-cards");
    // generate random number to get random card out of deck
    let card = deck[Math.floor(Math.random() * deck.length)];
    let card2 = deck[Math.floor(Math.random() * deck.length)];
    playerCardsDiv.innerHTML = "";
    playerCardsDiv.innerHTML += `<img width="100px" height="150px" src='images/cards/${card}' >`
    playerCardsDiv.innerHTML += `<img width="100px" height="150px" src='images/cards/${card2}' >`

    let houseCardDiv = document.getElementById("house-cards");
    let houseCard = deck[Math.floor(Math.random() * deck.length)];
    houseCardDiv.innerHTML = "";
    houseCardDiv.innerHTML = `<img width="100px" height="150px" src='images/cards/${houseCard}' >`
}

function clearDivs()
{
    let houseCardDiv = document.getElementById("house-cards");
    houseCardDiv.innerHTML = "";

    let playerCardsDiv = document.getElementById("player-cards");
    playerCardsDiv.innerHTML = "";

}

function stackChips()
{
    let audio = new Audio("sounds/chipsStack3.wav");
    audio.play();
}