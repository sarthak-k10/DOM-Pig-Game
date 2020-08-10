/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;

init();


//select the roll dice button. Following is an example of an anonymous function - doesn't have a name
//every time the roll dice button is clicked, we enter the following
document.querySelector('.btn-roll').addEventListener('click', function() {
	//Do something here

	if (gamePlaying) {
		//1. Random Number
		var dice = Math.floor(Math.random() * 6) + 1; //dice takes a random number between 1 and 6

		//2. Display Result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//3. Update the round score only if the rolled number was not a 1
		if (dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore; //active player's roundScore gets updated
		} else {
			nextPlayer();
		}
	}
});


//Event listener for the hold button -> results in the next player's turn
document.querySelector('.btn-hold').addEventListener('click', function() {

	if(gamePlaying) {
		//Add CURRENT score to global score
		scores[activePlayer] += roundScore;

		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	

		//Check if player won the game
		if (scores[activePlayer] >= 20) {
			document.querySelector('#name-' + activePlayer).textContent = "Winner!";
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			gamePlaying = false;

		} else {
			//Next Player
			nextPlayer();
		}
	}

});

//Event listener for the new button 
document.querySelector('.btn-new').addEventListener('click', init);	//pass the init function and not call it

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;	//can be 0 or 1
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

	//faster than querySelector when selecting elements
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	//player names must also be changed
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
		//next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;	//when a player rolls a 1, the other player becomes the active player and the roundScore is set to 0.

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		//hide the dice when a 1 is rolled
		document.querySelector('.dice').style.display = 'none';

		//changing "active" status
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
}