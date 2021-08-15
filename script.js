//cria elemento onde o jogo roda
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

//variável que representa a cobra
//cada coordenada é a posição de uma das partes dela
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//direção pra onde começará seguindo
let direction = "right";

//variável que representa a comida em uma coordenada aleatória
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//cria o fundo 
function drawBG() {
    context.fillStyle = "lightgreen";
    //parâmetros abaixo: X, Y, Largura, Altura
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//cria a cobra
function drawSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//cria a comida na tela
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//detecta tecla pressionada e chama uma função
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

//inicia o jogo, chamando as funções necessárias
function startGame() {

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    //detecta o fim do jogo, caso a cobra esbarre nas coordenadas determinadas
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert("Game Over!");
        }
    }

    drawBG();
    drawSnake();
    drawFood();

    //posição da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //controla a movimentação
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //para tirar o último elemento do array
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //controla como ela cresce
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //unshift adiciona como primeiro elemento no array da cobra
    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);