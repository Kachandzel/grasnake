const socket = io();

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let dx = 0;
let dy = 0;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++gameLoop.frame % 10 !== 0) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
        snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        snake = [{ x: 10, y: 10 }];
        dx = dy = 0;
    }

    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        apple = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } else {
        snake.pop();
    }

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    snake.forEach(s => ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2));

    ctx.fillStyle = '#f00';
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);
}

gameLoop.frame = 0;
requestAnimationFrame(gameLoop);

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft': if (dx === 0) dx = -1, dy = 0; break;
        case 'ArrowRight': if (dx === 0) dx = 1, dy = 0; break;
        case 'ArrowUp': if (dy === 0) dx = 0, dy = -1; break;
        case 'ArrowDown': if (dy === 0) dx = 0, dy = 1; break;
    }
});
