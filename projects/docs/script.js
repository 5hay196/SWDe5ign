// Pong game variables
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 80;
const PADDLE_MARGIN = 10;
const BALL_RADIUS = 10;

// Player paddle (left), controlled by mouse
const player = {
    x: PADDLE_MARGIN,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: "#fff"
};

// AI paddle (right)
const ai = {
    x: WIDTH - PADDLE_WIDTH - PADDLE_MARGIN,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: "#fff",
    speed: 3
};

// Ball
const ball = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    radius: BALL_RADIUS,
    speed: 5,
    velocityX: 5 * (Math.random() > 0.5 ? 1 : -1),
    velocityY: 5 * (Math.random() > 0.5 ? 1 : -1),
    color: "#fff"
};

// Draw functions
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

// Draw center dashed line
function drawNet() {
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]); // reset dash
}

// Draw everything
function draw() {
    // Clear
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Net
    drawNet();

    // Player paddle
    drawRect(player.x, player.y, player.width, player.height, player.color);

    // AI paddle
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);

    // Ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Move paddles and ball
function update() {
    // Ball movement
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Top and bottom wall collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > HEIGHT) {
        ball.velocityY = -ball.velocityY;
    }

    // Player paddle collision
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.velocityX = -ball.velocityX;
        ball.x = player.x + player.width + ball.radius; // prevent sticking
        // Add a bit of "english"
        let collidePoint = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        ball.velocityY = ball.speed * collidePoint;
    }

    // AI paddle collision
    if (
        ball.x + ball.radius > ai.x &&
        ball.y > ai.y &&
        ball.y < ai.y + ai.height
    ) {
        ball.velocityX = -ball.velocityX;
        ball.x = ai.x - ball.radius; // prevent sticking
        // Add a bit of "english"
        let collidePoint = (ball.y - (ai.y + ai.height / 2)) / (ai.height / 2);
        ball.velocityY = ball.speed * collidePoint;
    }

    // Reset ball if it goes off left or right edge
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > WIDTH) {
        resetBall();
    }

    // AI paddle movement (simple AI: follows ball with speed limit)
    let aiCenter = ai.y + ai.height / 2;
    if (ball.y < aiCenter - 10) {
        ai.y -= ai.speed;
    } else if (ball.y > aiCenter + 10) {
        ai.y += ai.speed;
    }
    // Clamp AI paddle within canvas
    ai.y = Math.max(0, Math.min(HEIGHT - ai.height, ai.y));
}

// Mouse controls for player paddle
canvas.addEventListener('mousemove', function(evt) {
    let rect = canvas.getBoundingClientRect();
    let mouseY = evt.clientY - rect.top;
    player.y = mouseY - player.height / 2;
    // Clamp within canvas
    player.y = Math.max(0, Math.min(HEIGHT - player.height, player.y));
});

// Reset ball to center
function resetBall() {
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    // Random direction
    ball.velocityX = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.velocityY = ball.speed * (Math.random() > 0.5 ? 1 : -1);
}

// Game loop
function game() {
    update();
    draw();
    requestAnimationFrame(game);
}

// Start game
game();