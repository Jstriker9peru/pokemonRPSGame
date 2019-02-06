webpackJsonp([0],{

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// State
var gameState = {
  userPokemon: '',
  rivalPokemon: '',
  pokemonDB: [{
    name: 'charmander',
    type: 'fire',
    hp: 39,
    attack: 52,
    defense: 43,
    level: 1,
    img: 'http://media.giphy.com/media/RkyBge2M46ULK/giphy.gif'
  }, {
    name: 'bulbasaur',
    type: 'grass',
    hp: 45,
    attack: 49,
    defense: 49,
    level: 1,
    img: 'https://thumbs.gfycat.com/HopefulGreatIndianjackal-max-1mb.gif'
  }, {
    name: 'squirtle',
    type: 'water',
    hp: 44,
    attack: 48,
    defense: 65,
    level: 1,
    img: 'https://thumbs.gfycat.com/CandidHollowEuropeanfiresalamander-size_restricted.gif'
  }],
  elements: {
    pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
  },
  init: function init() {
    console.log(gameState.elements.attackBtnsEl);
    var i = 0;
    // Initial Loop
    while (i < gameState.elements.pokemonsEl.length) {
      // Add function to all characters on screen select
      gameState.elements.pokemonsEl[i].onclick = function () {
        // current selected pokemon name
        var pokemonName = this.dataset.pokemon;
        // elements for images on battle screen
        var player1Img = document.querySelector('.player1').getElementsByTagName('img');

        var player2Img = document.querySelector('.player2').getElementsByTagName('img');

        // we save the current pokemon
        gameState.userPokemon = pokemonName;

        // cpu picks a pokemon
        gameState.cpuPick();
        // change screen to battle screen
        gameState.elements.battleScreenEl.classList.toggle('active');

        // select data from current user pokemon
        gameState.currentPokemon = gameState.pokemonDB.filter(function (el) {
          return el.name == gameState.userPokemon;
        });

        player1Img[0].src = gameState.currentPokemon[0].img;

        // select data from current cpu pokemon
        gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (el) {
          return el.name == gameState.rivalPokemon;
        });

        player2Img[0].src = gameState.currentRivalPokemon[0].img;

        // current user and cpu pokemon initial health
        gameState.currentPokemon[0].health = gameState.calculateInitHealth(gameState.currentPokemon[0]);

        gameState.currentPokemon[0].originalHealth = gameState.calculateInitHealth(gameState.currentPokemon[0]);

        gameState.currentRivalPokemon[0].health = gameState.calculateInitHealth(gameState.currentRivalPokemon[0]);

        gameState.currentRivalPokemon[0].originalHealth = gameState.calculateInitHealth(gameState.currentRivalPokemon[0]);
      };
      i++;
    }

    var a = 0;
    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function () {

        var attackName = this.dataset.attack;
        gameState.currentUserAttack = attackName;

        gameState.play(attackName, gameState.cpuAttack());
      };
      a++;
    }
  },
  play: function play(userAttack, cpuAttack) {
    var currentPokemon = gameState.currentPokemon[0];

    var currentRivalPokemon = gameState.currentRivalPokemon[0];

    currentPokemon.owner = 'user';

    currentRivalPokemon.owner = 'cpu';

    console.log(userAttack);
    console.log(cpuAttack);

    var userPick = document.querySelector("." + userAttack);
    var cpuPick = document.querySelector('.' + cpuAttack);
    var userClone = userPick.cloneNode(true);
    var cpuClone = cpuPick.cloneNode(true);

    console.log(document.querySelector('.choices').hasChildNodes() == true);

    if (document.querySelector('.choices').hasChildNodes() == true) {
      var child = document.querySelector('.choices');
      document.querySelector('.choices').removeChild(child.childNodes[0]);
      document.querySelector('.choices').removeChild(child.childNodes[0]);
    }

    // if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
    //   document.querySelector('.choices').appendChild(userClone);
    //   document.querySelector('.choices').appendChild(cpuClone);
    //   let items = document.querySelectorAll('.choices .attack');
    //   setTimeout(function() {
    //     items[0].classList.add('moveUp1');
    //     items[1].classList.toggle('moveUp2');
    //   }, 1);

    // }
    var transitionSelections = function transitionSelections() {
      document.querySelector('.choices').appendChild(userClone);
      document.querySelector('.choices').appendChild(cpuClone);
      var items = document.querySelectorAll('.choices .attack');
      setTimeout(function () {
        items[0].classList.add('moveUp1');
        items[1].classList.toggle('moveUp2');
      }, 1);
    };

    // Lets the winner attack
    switch (userAttack) {
      case 'rock':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // cpu attacks
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon);
            }, 1000);
          }
        } else if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // user
              gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon);
              if (currentRivalPokemon.health >= 1) {

                // cpu
                gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon);
              }
            }, 1000);
          }
        } else {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // user attacks
              gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon);
            }, 1000);
          }
        }

        break;
      case 'paper':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // user
              gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon);

              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon);
              }
            }, 1000);
          }
        } else if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // user attacks
              gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon);
            }, 1000);
          }
        } else {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon);
            }, 1000);
          }
        }
        console.log(userAttack);
        break;
      case 'scissors':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // user
              gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon);
            }, 1000);
          }
        } else if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon);
            }, 1000);
          }
        } else {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function () {
              // user
              gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon);

              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon);
              }
            }, 1000);
          }
        }

        break;
    }
  },
  cpuAttack: function cpuAttack() {
    var attacks = ['rock', 'paper', 'scissors'];

    return attacks[gameState.randomNumber(0, 3)];
  },
  calculateInitHealth: function calculateInitHealth(user) {

    return 0.20 * Math.sqrt(user.level) * user.defense * user.hp;
  },
  attackMove: function attackMove(attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + ' before: ' + enemy.health);

    var attackAmount = attack * level * (stack + critical);
    enemy.health = enemy.health - attackAmount;

    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    console.log(userHP);
    console.log(cpuHP);
    console.log(enemy);

    if (enemy.owner == 'cpu') {
      var minusPercent = enemy.health * 100 / enemy.originalHealth;
      console.log('12345');

      cpuHP.style.width = (minusPercent > 0 ? minusPercent : 0) + '%';
      console.log(userHP.style.width);
    } else {
      var _minusPercent = enemy.health * 100 / enemy.originalHealth;
      console.log('54321');

      userHP.style.width = (_minusPercent > 0 ? _minusPercent : 0) + '%';
      console.log(userHP.style.width);
    }

    gameState.checkWinner(enemy, attacker);

    console.log(enemy.name + ' after: ' + enemy.health);
  },
  checkWinner: function checkWinner(enemy, attacker) {
    if (enemy.health <= 0) {
      console.log('You win ' + attacker.name);
    }
  },
  randomNumber: function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  cpuPick: function cpuPick() {
    do {
      var cpu = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)];
      gameState.rivalPokemon = cpu.dataset.pokemon;
    } while (gameState.userPokemon == gameState.rivalPokemon);
  }
};

gameState.init();

/***/ })

},[234]);