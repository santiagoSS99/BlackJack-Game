(() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'S', 'H'],
        special_cards = ['J', 'Q', 'K', 'A'];

    let playersPoints = []

    const btnNew = document.querySelector('#btnNew'),
        btnGet = document.querySelector('#btnGet'),
        btnStop = document.querySelector('#btnStop'),
        small = document.querySelectorAll("small");

    const divCardsPlayers = document.querySelectorAll('.divCards');

    const startGame = (numPlayers = 2) => {
        deck = createDeck();
        playersPoints = []
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0)
        }

        small.forEach(el => el.innerText = 0)
        divCardsPlayers.forEach(el => el.innerHTML = '');

        btnGet.disabled = false;
        btnStop.disabled = false;
    }

    // This funtion create a new deck
    const createDeck = () => {
        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let special of special_cards) {
                deck.push(special + type);
            }
        }
        return _.shuffle(deck);
    }



    const requestCard = () => {

        if (deck.length === 0) {
            throw 'There are not cards in the deck'
        }
        // unoptimazed code

        // - const card = deck.pop();
        // - return card;

        // Optimized
        return deck.pop()
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

    const accumPoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        small[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('cards');
        divCardsPlayers[turn].append(imgCard)
    }

    const determinateWinner = () => {
        const [minPoints, pcPoints] = playersPoints
        setTimeout(() => {
            if (pcPoints === playersPoints) {
                alert('tie')
            } else if (minPoints > 21) {
                alert('pc won!')
            } else if (pcPoints > 21) {
                alert('player 1 won')
            } else {
                alert('pc won')
            }
        }, 100)
    }

    const cumputerTurn = (minPoints) => {
        let pcPoints = 0;
        do {

            const card = requestCard();
            pcPoints = accumPoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);

            if (minPoints > 21) {
                break;
            }

        } while ((pcPoints < minPoints) && (minPoints <= 21));
        determinateWinner();

    }

    btnGet.addEventListener('click', function () {
        const card = requestCard();
        const playerPoints = accumPoints(card, 0);
        createCard(card, 0)

        if (playerPoints > 21) {
            console.error('Sorry, Game Over');
            btnGet.disabled = true;
            btnStop.disabled = true;

            cumputerTurn(playerPoints)
        } else if (playerPoints === 21) {
            console.warn('Booyah');
            btnGet.disabled = true;
            btnStop.disabled = true;

            cumputerTurn(playerPoints);
        }
    })

    btnStop.addEventListener('click', function () {
        btnGet.disabled = true;
        btnStop.disabled = true;
        cumputerTurn(playersPoints[0]);
    });

    btnNew.addEventListener('click', () => {
        startGame();
    });
})();