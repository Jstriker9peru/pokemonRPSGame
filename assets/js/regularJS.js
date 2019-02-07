


// State
let gameState = {
  userPokemon: '',
  rivalPokemon: '',
  pokemonDB: [
    {
      name: 'charmander',
      type: 'fire',
      hp: 39,
      attack: 52,
      defense: 43,
      level: 1,
      img: 'http://media.giphy.com/media/RkyBge2M46ULK/giphy.gif'
    },
    {
      name: 'bulbasaur',
      type: 'grass',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img: 'https://thumbs.gfycat.com/HopefulGreatIndianjackal-max-1mb.gif'
    },
    {
      name: 'squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img: 'https://thumbs.gfycat.com/CandidHollowEuropeanfiresalamander-size_restricted.gif'
    },
  ],
  elements: {
    pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack'),
    winnerScreenEl: document.getElementById('winner-screen'),
  },
  init: function() {
    console.log(gameState.elements.attackBtnsEl);
    let i = 0;
    // Initial Loop
    while (i < gameState.elements.pokemonsEl.length) {
      // Add function to all characters on screen select
      gameState.elements.pokemonsEl[i].onclick = function() {
        // current selected pokemon name
        let pokemonName = this.dataset.pokemon;
        // elements for images on battle screen
        let player1Img = document.querySelector('.player1').getElementsByTagName('img');

        let player2Img = document.querySelector('.player2').getElementsByTagName('img');

        // we save the current pokemon
        gameState.userPokemon = pokemonName;

        // cpu picks a pokemon
        gameState.cpuPick();
        // change screen to battle screen
        gameState.elements.battleScreenEl.classList.toggle('active');

        // select data from current user pokemon
        gameState.currentPokemon = gameState.pokemonDB.filter(el => el.name == gameState.userPokemon);

        player1Img[0].src = gameState.currentPokemon[0].img;

        // select data from current cpu pokemon
        gameState.currentRivalPokemon = gameState.pokemonDB.filter(el => el.name == gameState.rivalPokemon);

        player2Img[0].src = gameState.currentRivalPokemon[0].img;

        // current user and cpu pokemon initial health
        gameState.currentPokemon[0].health = gameState.calculateInitHealth(gameState.currentPokemon[0]);

        gameState.currentPokemon[0].originalHealth = gameState.calculateInitHealth(gameState.currentPokemon[0]);

        gameState.currentRivalPokemon[0].health = gameState.calculateInitHealth(gameState.currentRivalPokemon[0]);

        gameState.currentRivalPokemon[0].originalHealth = gameState.calculateInitHealth(gameState.currentRivalPokemon[0]);

      }
      i++
    }

    let a = 0;
    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function() {
        
        let attackName = this.dataset.attack;
        gameState.currentUserAttack = attackName;

        gameState.play(attackName, gameState.cpuAttack());
      }
      a++
    }
  },
  play: function(userAttack, cpuAttack) {
    let currentPokemon = gameState.currentPokemon[0];
    
    let currentRivalPokemon = gameState.currentRivalPokemon[0];

    currentPokemon.owner = 'user';

    currentRivalPokemon.owner = 'cpu';

    console.log(userAttack);
    console.log(cpuAttack);

    let userPick = document.querySelector("." + userAttack);
    let cpuPick = document.querySelector('.' + cpuAttack);
    let userClone = userPick.cloneNode(true);
    let cpuClone = cpuPick.cloneNode(true);

    console.log(document.querySelector('.choices').hasChildNodes() == true);

    if (document.querySelector('.choices').hasChildNodes() == true) {
      let child = document.querySelector('.choices');
      document.querySelector('.choices').removeChild(child.childNodes[0]);
      document.querySelector('.choices').removeChild(child.childNodes[0]);
    }


    let transitionSelections = function() {
      document.querySelector('.choices').appendChild(userClone);
      document.querySelector('.choices').appendChild(cpuClone);
      let items = document.querySelectorAll('.choices .attack');
      setTimeout(function() {
        items[0].classList.toggle('moveUp1');
        items[1].classList.toggle('moveUp2');
      }, 1);
    }

    // Lets the winner attack
    switch(userAttack) {
      case 'rock':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
              transitionSelections();
              setTimeout(function() {
                // cpu attacks
                  gameState.attackMove(
                    currentRivalPokemon.attack, currentRivalPokemon.level, 
                    .8, 2,
                    currentPokemon, currentRivalPokemon);
              }, 1000);

          }
  
  
  
        } else if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {      
            transitionSelections();    
            setTimeout(function() {
              // user
              gameState.attackMove(
                currentPokemon.attack, currentPokemon.level, 
                .8, 1,
                currentRivalPokemon, currentPokemon);
              if (currentRivalPokemon.health >= 1) {
  
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack, currentRivalPokemon.level, 
                  .8, 1,
                  currentPokemon, currentRivalPokemon);
              }  
            }, 1000);
          }
          
  
        } else {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function() {
              // user attacks
              gameState.attackMove(
                currentPokemon.attack, currentPokemon.level, 
                .8, 2,
                currentRivalPokemon, currentPokemon);
            }, 1000);          
  
          } 
        }
  
        break;
      case 'paper':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {      
            transitionSelections();
            setTimeout(function() {
              // user
              gameState.attackMove(
                currentPokemon.attack, currentPokemon.level, 
                .8, 1,
                currentRivalPokemon, currentPokemon);
    
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack, currentRivalPokemon.level, 
                  .8, 1,
                  currentPokemon, currentRivalPokemon);
              } 
            }, 1000);    
          }
          
  
        } else if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function() {
              // user attacks
              gameState.attackMove(
                currentPokemon.attack, currentPokemon.level, 
                .8, 2,
                currentRivalPokemon, currentPokemon);
            }, 1000);          
  
          }
            
  
        } else {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {          
            transitionSelections();
            setTimeout(function() {
              // cpu
              gameState.attackMove(
                currentRivalPokemon.attack, currentRivalPokemon.level, 
                .8, 2,
                currentPokemon, currentRivalPokemon);
            }, 1000);

          }
            
  
        }    
        console.log(userAttack);
        break;
      case 'scissors':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function() {
              // user
              gameState.attackMove(
                currentPokemon.attack, currentPokemon.level, 
                .8, 2,
                currentRivalPokemon, currentPokemon);
            }, 1000);          

          }
  
  
        } else if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function() {
              // cpu
              gameState.attackMove(
                currentRivalPokemon.attack, currentRivalPokemon.level, 
                .8, 2,
                currentPokemon, currentRivalPokemon);
            }, 1000);          

 
          }
            
  
        } else {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            transitionSelections();
            setTimeout(function() {
              // user
              gameState.attackMove(
                currentPokemon.attack, currentPokemon.level, 
                .8, 1,
                currentRivalPokemon, currentPokemon);
    
              if (currentRivalPokemon.health >= 1) {
                // cpu
                gameState.attackMove(
                  currentRivalPokemon.attack, currentRivalPokemon.level, 
                  .8, 1,
                  currentPokemon, currentRivalPokemon);
              }  
            }, 1000);          
          }
          
  
        }    
        
        break;    
    }
  },
  cpuAttack: function() {
    let attacks = ['rock', 'paper', 'scissors'];
  
    return attacks[gameState.randomNumber(0,3)];
  },
  calculateInitHealth: function(user) {
    
    return ((0.20 * Math.sqrt(user.level)) * user.defense) * user.hp;
  },
  attackMove: function(attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + ' before: ' + enemy.health);
  
    let attackAmount = ((attack * level ) * (stack + critical));
    enemy.health = enemy.health - attackAmount;

    let userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    let cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    console.log(userHP);
    console.log(cpuHP);
    console.log(enemy);

    if (enemy.owner == 'cpu') {
      let minusPercent = ((enemy.health * 100) / enemy.originalHealth);
      console.log('12345');

      cpuHP.style.width = ((minusPercent > 0) ? minusPercent : 0)  + '%';
      console.log(userHP.style.width);  
    } else {
        let minusPercent = ((enemy.health * 100) / enemy.originalHealth);
        console.log('54321');

        userHP.style.width = ((minusPercent > 0) ? minusPercent : 0) + '%';
        console.log(userHP.style.width);  
    }
    
      gameState.checkWinner(enemy, attacker);
      
    console.log(enemy.name + ' after: ' + enemy.health);
  },
  checkWinner: function(enemy, attacker) {
    console.log(enemy.health + ' ' + attacker.health)
    console.log(typeof(enemy.health));
    let loser;
    if (enemy.health <= 0) {
      loser = enemy.name;
    } else if (attacker.health <= 0) {
      loser = attacker.name;
    } else {
      loser = false;
    }

    console.log('the loser is ' + loser);
    
    if (loser !== false) {
      let userName = gameState.currentPokemon[0].name;
      let cpuName = gameState.currentRivalPokemon[0].name;
      console.log('the userName is ' + userName);
      console.log('the cpuName is ' + cpuName);


      if (loser == cpuName) {
        document.querySelector('.changePlayer').innerHTML = 'You win!';
        document.querySelector('.winnerImage').src = "https://www.tipeeestream.com/bundles/widget/images/animation/dragoran.gif";
        gameState.elements.winnerScreenEl.classList.remove('newBackground');
        gameState.elements.winnerScreenEl.classList.toggle('active1');

        setTimeout(function() {
          gameState.elements.winnerScreenEl.classList.toggle('active1');
        },3000);

      } else if (loser == userName) {
        document.querySelector('.changePlayer').innerHTML = 'CPU Wins!';
        document.querySelector('.winnerImage').src = "https://thumbs.gfycat.com/ScholarlyNegligibleAfricangroundhornbill-max-1mb.gif";
        gameState.elements.winnerScreenEl.classList.add('newBackground');

        
        gameState.elements.winnerScreenEl.classList.toggle('active1');

        setTimeout(function() {
          gameState.elements.winnerScreenEl.classList.toggle('active1');
        },3000);
      }
        
      gameState.healthReset(enemy, attacker);
    } 
  }, 
  randomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  healthReset: function(enemy, attacker) {
    let userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');
    let cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    enemy.health = enemy.originalHealth;
    attacker.health = attacker.originalHealth;

    setTimeout(function() {
      userHP.style.width = '100%';
      cpuHP.style.width = '100%';
      if (document.querySelector('.choices').hasChildNodes() == true) {
        let child = document.querySelector('.choices');
        document.querySelector('.choices').removeChild(child.childNodes[0]);
        document.querySelector('.choices').removeChild(child.childNodes[0]);
      }

    },1400);
  },
  cpuPick: function () {
    do {
      let cpu = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)];
      gameState.rivalPokemon = cpu.dataset.pokemon;
    }
    while (gameState.userPokemon == gameState.rivalPokemon);
  }
}

gameState.init();










































  
  