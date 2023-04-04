let deck = [];
const types = ['C', 'D', 'S', 'H'];
const special_cards = ['J', 'Q', 'K', 'A']


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
    console.log(deck)
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

const value = cardValue(requestCard());
console.log({ value })