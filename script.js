const cardArray = [
    {
        name: 'sun',
        img: 'images/sun.svg'
    },
    {
        name: 'sun',
        img: 'images/sun.svg'
    },
    {
        name: 'bee',
        img: 'images/bee.svg'
    },
    {
        name: 'bee',
        img: 'images/bee.svg'
    },
    {
        name: 'butterfly',
        img: 'images/butterfly.svg'
    },
    {
        name: 'butterfly',
        img: 'images/butterfly.svg'
    },
    {
        name: 'leaf',
        img: 'images/leaf.svg'
    },
    {
        name: 'leaf',
        img: 'images/leaf.svg'
    },
    {
        name: 'snail',
        img: 'images/snail.svg'
    },
    {
        name: 'snail',
        img: 'images/snail.svg'
    },
    {
        name: 'sunflower',
        img: 'images/sunflower.svg'
    },
    {
        name: 'sunflower',
        img: 'images/sunflower.svg'
    },
    {
        name: 'tree',
        img: 'images/tree.svg'
    },
    {
        name: 'tree',
        img: 'images/tree.svg'
    },
    {
        name: 'tulip',
        img: 'images/tulip.svg'
    },
    {
        name: 'tulip',
        img: 'images/tulip.svg'
    }
];

// SHUFFLING THE CARDS
cardArray.sort(() => 0.5 - Math.random());

// DEFINING VARIABLES AND GRABBING ELEMENTS
var body = document.querySelector('body');
var gameContainer = document.querySelector('.game-container');
var gameInfoContainer = document.querySelector('.game-info-container');
var cardsContainer = document.querySelector('.cards-container');
var restartBtn = document.getElementById('restart');

var overlays = document.querySelectorAll('.overlay-text');

var seconds = 50;
var secondsLeft = document.getElementById('time');
var countdown;

var moves = 0;
var counter = document.getElementById('moves');

var chosenCard = [];
var chosenCardId = [];
var cardsWon = [];


// ASSIGNING VALUES TO OVERLAYS

// GAME START OVERLAY
overlays[0].addEventListener('click', () => {
    overlays[0].classList.remove('visible');
    countdown = setInterval(timer, 1000);
})

// GAME OVER OVERLAY
overlays[1].addEventListener('click', () => {
    overlays[1].classList.remove('visible');
    window.location.reload();
})

// GAME WON OVERLAY
overlays[2].addEventListener('click', () => {
    overlays[2].classList.remove('visible');
    window.location.reload();

})

// COUNTDOWN FUNCTION
function timer() {

    if (seconds == 0) {
        document.getElementById('game-over-text').classList.add('visible');
        secondsLeft.innerText = '0';
        clearInterval(countdown);
    }

    seconds -= 1;
    secondsLeft.innerText = seconds;
}

// // CLEAR COUNTDOWN
// function clearCountdown () {
//     clearInterval(countdown);
//     seconds = 50;
//     secondsLeft.innerText = seconds;
// }

// CHECK NUMBER OF MOVES
function movesCounter() {

    moves++
    counter.innerText = moves;
}

// CLEAR MOVES
function clearMovesCounter() {
    moves = 0;
    counter.innerText = moves;
}

// CREATE CARDS AND ADD EVENT LISTENER
function createBoard() {

    for (var i = 0; i < cardArray.length; i++) {

        var card = document.createElement('img');
        card.classList.add('card', 'cardface');
        card.setAttribute('id', i);
        card.src = 'images/cardface.png';
        gameContainer.appendChild(card);

        card.addEventListener('click', flipCard);
    }
}

createBoard();

// ARRAY OF ALL CARDS
var cards = document.querySelectorAll('.card');

// CHECK FOR MATCHES BETWEEN TWO CARDS
function checkForMatch() {

    var cardOneName = chosenCard[0];
    var cardTwoName = chosenCard[1];
    var cardOneId = chosenCardId[0];
    var cardTwoId = chosenCardId[1];

    if (cardOneId == cardTwoId) {
        cards[cardOneId].src = 'images/cardface.png'
        cards[cardOneId].style.opacity = '0.6';
        alert('You have selected the same card twice!');
    }

    else if (cardOneName == cardTwoName) {
        cards[cardOneId].style.visibility = 'hidden';
        cards[cardOneId].removeEventListener('click', flipCard);
        cards[cardTwoId].style.visibility = 'hidden';
        cards[cardTwoId].removeEventListener('click', flipCard);
        cardsWon.push(chosenCard);
    }

    else {
        cards[cardOneId].src = 'images/cardface.png';
        cards[cardOneId].style.opacity = '0.6';
        cards[cardTwoId].src = 'images/cardface.png';
        cards[cardTwoId].style.opacity = '0.6';
    }

    chosenCard = [];
    chosenCardId = [];

    if (cardsWon.length == cardArray.length / 2) {
        clearInterval(countdown);
        document.getElementById('victory-text').classList.add('visible');
    }

}

// FLIP CARDS THAT ARE CLICKED
function flipCard() {

    if (chosenCard.length > 2) {

        for (var i = 0; i < cardArray.length; i++) {
            this.removeEventListener('click', flipCard);
        }
    }

    else if (chosenCard.length < 2) {

        var cardId = this.getAttribute('id');
        this.src = cardArray[cardId].img;
        chosenCard.push(cardArray[cardId].name);
        chosenCardId.push(cardId);
        this.style.opacity = 1;
        console.log(chosenCard);
        console.log(chosenCardId);

        if (chosenCard.length == 2) {
            movesCounter();
            setTimeout(checkForMatch, 1000);
        }
    }

}

restartBtn.addEventListener('click', () => {
    window.location.reload();
})