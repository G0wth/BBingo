/* BINGO
- Criar uma cartela e inserir o nome do jogador
- Cada cartela deverá ser gerada com 24 números aleatórios entre 1 e 75, sem repetir nenhum número
- Cada coluna deverá ter 15 números sendo a coluna B de 1 a 15, a coluna I de 16 a 30, a coluna N de 31 a 45 e assim sucessivamente.
- Devem ser sorteados números de 1 a 75, sem repetição, mostrando cada um na tela
- Durante o sorteio dos números, cada cartela deverá ter o número sorteado marcado
- O nome dos jogadores vencedores deverá aparecer na tela
*/
/*
class cardNumber {
    constructor(number, is_match){
        this.number = number;
        this.match = is_match;
    }
}

let cardNumber = {number: 0, match: false}

const exampleNumber = {number: 0, is_match: false};
const exampleCard = {name:"Bananatico", cardNumbers: []};

function generateCardbyExample(){
    let newCard = exampleCard;



}
*/

let totalPlayers = [];
let gameProgress = false;

function generateRandomNumbers(amount, min, max){

    if(amount > (max - min)){
        console.log("Intervalo...");
        return;
    }

    var number = [];

    while(number.length < amount){
        var random = Math.floor(Math.random()*(max - min) + min);

        if(!number.includes(random)){
            number.push(random);
        }
    }

    return number;
}

function generateCard(){
    var playerName = prompt('Digite o nome do jogador.') || '';

    if (playerName.trim().length === 0) {
    alert('Escreva um nome com pelo menos 1 dígito');
    return;
    }

    if(gameProgress == true){
        alert("Não é possível criar uma cartela com o jogo em andamaento!");
        return;
    }

    var card = [generateRandomNumbers(5,1,15), generateRandomNumbers(5,16,30), generateRandomNumbers(5,31,45), generateRandomNumbers(5,46,60), generateRandomNumbers(5,61,75)];

    while(card.length < 24){
        var random_number = Math.floor(Math.random()*75 + 1);
        if(!card.includes(random_number)){
            card.push(random_number)
        }
    }

    let player = {
        name: playerName,
        card: card
    }

    totalPlayers.push(player);
    console.log(totalPlayers);

    console.log(card)
    return { playerName, card };
}

function drawCard(){

    const { playerName, card} = generateCard();

    const div_space_card = document.getElementById('space_card');

    const div_card = document.createElement('div');
    div_card.className = 'card';

    div_space_card.appendChild(div_card);

    const h4_player = document.createElement('h4');
    h4_player.innerText = playerName;

    div_card.appendChild(h4_player)

    const table_card = document.createElement('table');
    const thead_card = document.createElement('thead');
    const tbody_card = document.createElement('tbody');


    //tabela do bingo
    table_card.appendChild(thead_card);
    table_card.appendChild(tbody_card);
    div_card.appendChild(table_card)

    //th BINGO 
    const th_B = document.createElement('th');
    const th_I = document.createElement('th');
    const th_N = document.createElement('th');
    const th_G = document.createElement('th');
    const th_O = document.createElement('th');

    th_B.innerText = 'B'
    th_I.innerText = 'I'
    th_N.innerText = 'N'
    th_G.innerText = 'G'
    th_O.innerText = 'O'

    thead_card.appendChild(th_B);
    thead_card.appendChild(th_I);
    thead_card.appendChild(th_N);
    thead_card.appendChild(th_G);
    thead_card.appendChild(th_O);

    for(var n = 0; n < 5; n++){
        const card_tr = document.createElement('tr');
        for(var a = 0; a < 5; a++){
            const card_td = document.createElement('td');
            if(n == 2 && a == 2){
                card_td.innerText = 'X';
                card_tr.appendChild(card_td);
            }else{
                card_td.innerText = card[a][n]
                card_tr.appendChild(card_td);
            }
        }
        tbody_card.appendChild(card_tr);
    }

}

function startGame(){
    if(totalPlayers.length < 2){
        alert("Você precisa ter pelo menos dois jogadores para iniciar o jogo!");
        return;
    }

    gameProgress = true;

    const div_space_game = document.getElementById('space_game');

    const div_number = document.createElement('div');
    div_number.className = 'number';

    div_space_game.appendChild(div_number);
}

function resetGame(){
    location.reload();
}


