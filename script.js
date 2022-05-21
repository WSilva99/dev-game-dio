const background = document.getElementById('background');
const player = document.getElementById('player');

let isJumping = false, isGameOver = false, playerPosition = 0;

function spawObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    let obstaclePosition = innerWidth;
    let randomTime = Math.random() * (1500 - 600) + 600;

    if(isGameOver)
        return;

    background.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + "px";

    let leftTimer = setInterval(() => {
        if(obstaclePosition < -60) { // Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(obstacle);
        } else if(obstaclePosition > 0 && obstaclePosition < 55 && playerPosition < 60) { // Colisão
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 id="game-over">Fim de jogo</h1>';
        } else {
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + "px";
        }
    }, 25);

    setTimeout(spawObstacle, randomTime);
}

function playerJump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(playerPosition >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(playerPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    player.classList.toggle('jump');
                } else {
                    playerPosition -= 15;
                    player.style.bottom = playerPosition + 'px';
                }
            }, 20);
        } else {
            playerPosition += 25;
            player.style.bottom = playerPosition + 'px';
        }
    }, 20);
    player.classList.toggle('jump');
}

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            playerJump();
        }
    }
}

spawObstacle();
document.addEventListener('keyup', handleKeyUp);
