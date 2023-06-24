/* BINGO
- Criar uma cartela e inserir o nome do jogador
- Cada cartela deverá ser gerada com 24 números aleatórios entre 1 e 75, sem repetir nenhum número
- Cada coluna deverá ter 15 números sendo a coluna B de 1 a 15, a coluna I de 16 a 30, a coluna N de 31 a 45 e assim sucessivamente.
- Devem ser sorteados números de 1 a 75, sem repetição, mostrando cada um na tela
- Durante o sorteio dos números, cada cartela deverá ter o número sorteado marcado
- O nome dos jogadores vencedores deverá aparecer na tela
*/

var totalPlayers = [];
var sorted_numbers = [];
var gameProgress = false;

// função para detrtminar a geração de números aleatórios
function generateRandomNumbers(amount, min, max) {

  if (amount > (max - min)) {
    console.log("Intervalo...");
    return;
  }

  var number = [];

  while (number.length < amount) {
    var random = Math.floor(Math.random() * (max - min) + min);

    if (!number.includes(random)) {
      number.push(random);
    }
  }

  return number;
}


// função para adicionar os valores gerados em cada coluna da cartela do bingo
function generateCard() {
  var card = [
    generateRandomNumbers(5, 1, 15),
    generateRandomNumbers(5, 16, 30),
    generateRandomNumbers(5, 31, 45),
    generateRandomNumbers(5, 46, 60),
    generateRandomNumbers(5, 61, 75)
  ];

  console.log(card);
  return card;
}

// função para gerar a cartela do jogador
function insertPlayer() {
  const playerName = prompt('Digite o nome do jogador.');

  if (playerName.length < 1) {
    alert('Escreva um nome com pelo menos 1 caractere');
    return;
  }

  const isNameExists = totalPlayers.some(player => player.name === playerName);

  if (isNameExists) {
    alert('Esse nome já existe. Escolha um nome diferente.');
    return;
  }

  if (gameProgress == true) {
    alert("Não é possível criar uma cartela com o jogo em andamento!");
    return;
  }

  const card = generateCard();

  const player = {
    name: playerName,
    card: card
  }

  totalPlayers.push(player);
  console.log(totalPlayers);
  drawCard(player);
}

// função para construir as cartelas na tela
function drawCard(player) {
  const div_space_card = document.getElementById('space_card');

  const div_card = document.createElement('div');
  div_card.className = 'card';

  div_space_card.appendChild(div_card);

  const h4_player = document.createElement('h4');
  h4_player.innerText = player.name;

  div_card.appendChild(h4_player);

  const table_card = document.createElement('table');
  const thead_card = document.createElement('thead');
  const tbody_card = document.createElement('tbody');

  table_card.appendChild(thead_card);
  table_card.appendChild(tbody_card);
  div_card.appendChild(table_card);

  const th_B = document.createElement('th');
  const th_I = document.createElement('th');
  const th_N = document.createElement('th');
  const th_G = document.createElement('th');
  const th_O = document.createElement('th');

  th_B.innerText = 'B';
  th_I.innerText = 'I';
  th_N.innerText = 'N';
  th_G.innerText = 'G';
  th_O.innerText = 'O';

  thead_card.appendChild(th_B);
  thead_card.appendChild(th_I);
  thead_card.appendChild(th_N);
  thead_card.appendChild(th_G);
  thead_card.appendChild(th_O);

  for (let row = 0; row < 5; row++) {
    const card_tr = document.createElement('tr');
    for (let col = 0; col < 5; col++) {
      const card_td = document.createElement('td');
      const number = player.card[col][row];
      if (row === 2 && col === 2) {
        card_td.innerText = 'X';
      } else {
        card_td.innerText = number;
      }
      card_td.className = 'tddefault';
      card_tr.appendChild(card_td);
    }
    tbody_card.appendChild(card_tr);
  }

}

// função para iniciar o jogo
function startGame() {
  if (totalPlayers.length < 2) {
    alert("Você precisa ter pelo menos dois jogadores para iniciar o jogo!");
    return;
  }

  gameProgress = true;

  const div_space_game = document.getElementById('space_game');
  const drawnNumbers = [];
  const intervalId = setInterval(() => {
    if (drawnNumbers.length === 75) {
      clearInterval(intervalId);
      handleGameEnd(drawnNumbers);
      return;
    }

    let random;
    do {
      random = Math.floor(Math.random() * 75 + 1);
    } while (drawnNumbers.includes(random));

    drawnNumbers.push(random);
    const div_number = document.createElement('div');
    div_number.className = 'number';
    div_number.innerText = random;
    div_space_game.appendChild(div_number);

    // Verificar se alguma tabela está completa para cada jogador
    const winners = [];
    for (let i = 0; i < totalPlayers.length; i++) {
      const player = totalPlayers[i];
      const card = player.card;

      // Verificar se a tabela do jogador está completa
      if (isTableComplete(card, drawnNumbers)) {
        winners.push(player);
        const tdList = document.querySelectorAll('.card:nth-child(' + (i + 1) + ') .tddefault');
        for (const td of tdList) {
          const number = parseInt(td.innerText);
          if (drawnNumbers.includes(number)) {
            td.className = 'tdsorted';
          }
        }
      }

      // Verificar se algum número foi sorteado na tabela do jogador e marcar como sorteado
      const tdList = document.querySelectorAll('.card:nth-child(' + (i + 1) + ') .tddefault');
      for (const td of tdList) {
        const number = parseInt(td.innerText);
        if (drawnNumbers.includes(number)) {
          td.classList.add('tdsorted');
          td.classList.remove('tddefault');
        }
      }
    }

    if (winners.length > 0) {
      clearInterval(intervalId);
      handleGameEnd(drawnNumbers, winners);
    }
  }, 100);
}

// Função para tratar o final do jogo
function handleGameEnd(drawnNumbers, winners = []) {
  gameProgress = false;

  if (winners.length === 0) {
    alert("Todos os números foram sorteados! O jogo acabou.");
    return;
  }

  if (winners.length === 1) {
    const winner = winners[0];
    setTimeout(() => {
      alert(`Bingo! O jogador ${winner.name} ganhou!`);
    }, 100);
  } else {
    let winnersText = '';
    for (const winner of winners) {
      winnersText += winner.name + ', ';
      const tdList = document.querySelectorAll('.card');
      for (const td of tdList) {
        if (td.innerText === winner.name) {
          td.style.backgroundColor = 'yellow';
        }
      }
    }
    winnersText = winnersText.slice(0, -2);
    setTimeout(() => {
      alert(`Empate! Os jogadores ${winnersText} empataram!`);
    }, 100); 
  }

  clearInterval(intervalId);
}




// Função auxiliar para verificar se uma tabela está completa
function isTableComplete(card, drawnNumbers) {
  // Verificar linhas
  for (let i = 0; i < card.length; i++) {
    let lineComplete = true;

    // Verificar cada número na linha
    for (let j = 0; j < card[i].length; j++) {
      if (!drawnNumbers.includes(card[i][j])) {
        lineComplete = false;
        break;
      }
    }

    if (!lineComplete) {
      return false;
    }
  }

  return true;
}

// função para reiniciar o jogo
function resetGame() {
  location.reload();
}


