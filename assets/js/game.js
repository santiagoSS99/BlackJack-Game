let deck = [];
const types = ['C', 'D', 'S', 'H'];
const special_cards = ['J', 'Q', 'K', 'A']
let playerPoints = 0,
    pcPoints = 0

const btnNew = document.querySelector('#btnNew')
const btnGet = document.querySelector('#btnGet')
const btnStop = document.querySelector('#btnStop')
const small = document.querySelectorAll("small")

const playerCards = document.querySelector('#player-cards');
const computerCards = document.querySelector('#computer-cards');

// This funtion create a new deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (type of types) {
            deck.push(i + type)
        }
    }

    for (let type of types) {
        for (let special of special_cards) {
            deck.push(special + type)
        }
    }

    // console.log(deck)
    deck = _.shuffle(deck)
    // console.log(deck)
    return deck
}

createDeck();

const requestCard = () => {

    if (deck.length === 0) {
        throw 'There are not cards in the deck'
    }
    const card = deck.pop();
    console.log(deck);
    console.log(card);
    return card;
}

// requestCard();

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : value * 1;

    // CODIGO SIN OPTIMIZAR
    // if (isNaN(value)) {
    //     console.log('there is not a number');
    //     points = (value === 'A') ? 11 : 10;
    // } else {
    //     console.log(`it's a number`)
    //     points = value * 1
    // }
    // console.log({ value })
}

btnGet.addEventListener('click', function () {
    const card = requestCard();
    playerPoints = playerPoints + cardValue(card)
    small[0].innerText = playerPoints

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`
    playerCards.append(imgCard)
    imgCard.classList.add('cards')
    // <img src="assets/cartas/10C.png" class="carta">

    // console.log({ playerPoints })
    // console.log({ card })
})
