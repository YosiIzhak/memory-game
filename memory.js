
const deckCards =["blue","blue",'green','green',
"pink","pink","yellow","yellow",
"purple","purple","red","red"]
const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
let moves = 0;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
// shuffle function from stackoverflow
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }
function startGame() {
	
	const shuffledDeck = shuffle(deckCards); 
    console.log(shuffledDeck)
	for (let i = 0; i < shuffledDeck.length; i++) {
		const liTag = document.createElement('LI');
		liTag.classList.add('card');
		const addCard = document.createElement("div");
        //addCard.style.backgroundColor = shuffledDeck[i];
        addCard.innerText = shuffledDeck[i];
        liTag.appendChild(addCard);
	//console.log(addCard.style.backgroundColor)
		deck.appendChild(liTag);
	}
}

startGame();

function removeCard() {
	while (deck.hasChildNodes()) {
		deck.removeChild(deck.firstChild);
	}
}
function timer() {
	time = setInterval(function() {
		seconds++;
			if (seconds === 60) {
				minutes++;
				seconds = 0;
			}
		timeCounter.innerHTML =  " Timer: " + minutes + " Mins " + seconds + " Secs" ;
	}, 1000);
}


function stopTime() {
	clearInterval(time);
}
function movesCounter() {
	movesCount.innerHTML ++;
	moves ++;
}

function compareTwo() {
	if (opened.length === 2) {
  		document.body.style.pointerEvents = "none";
  }
	if (opened.length === 2 && opened[0].innerText === opened[1].innerText) {
		match();
	} else if (opened.length === 2 && opened[0].innerText != opened[1].innerText) {
		noMatch();
	}
}

function match() {
	setTimeout(function() {
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		matched.push(...opened);
		document.body.style.pointerEvents = "auto";
		winGame();
		opened = [];
	}, 1000);
	movesCounter();
}


function noMatch() {
	setTimeout(function() {
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		document.body.style.pointerEvents = "auto";
		opened = [];
	}, 700);
	movesCounter();
}
function winGame() {
	if (matched.length === 12) {
		stopTime();
	}
}

deck.addEventListener("click", function(evt) {
	if (evt.target.nodeName === "LI") {
		console.log(evt.target.nodeName + " Was clicked");
		if (timeStart === false) {
			timeStart = true; 
			timer();
		}
		flipCard();
	}

	
	function flipCard() {
		evt.target.classList.add("flip");
		
        addToOpened();
	}
	 
	function addToOpened() {
		if (opened.length === 0 || opened.length === 1) {
			opened.push(evt.target.firstElementChild);
		}
		compareTwo();
	}
});



