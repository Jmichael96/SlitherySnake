let canvas;
let ctx;

let head;
let apple;
let food;
let ball;
console.log('this is connected app.js')
let dots;
let apple_x;
let apple_y;
let food_y;
let food_x

let appleCount = 0;
let topScore = 0;

let leftDirection = false;
let rightDirection = true;
let upDirection = false;
let downDirection = false;
let inGame = false;

// size of the apple and dot of the snakeeee
const DOT_SIZE = 10;
// defines the maximum number of possible dots on the canvas
const ALL_DOTS = 900;
// used to calculate a random position for the apple
const MAX_RAND = 60;
const MAX_RAND2 = 50;
// determines the speed of the game
const DELAY = 90;
// store size of the canvas
const C_HEIGHT = 600;
const C_WIDTH = 700;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

// store the values of arrow keys
let x = new Array(ALL_DOTS);
let y = new Array(ALL_DOTS);

// gets reference to the canvas object and its context 
// inside are functions being called to preform those tasks
function init() {
    // initate in game value
    inGame = true;
    canvas = document.getElementById('snakeCanvas');
    ctx = canvas.getContext('2d');
    // reinitialize score count
    appleCount = 0;
    loadImages();
    createSnake();
    locateApple();
    locateFood();
    setTimeout('gameCycle()', DELAY);
};
// loads all three images for the game
function loadImages() {
    head = new Image();
    head.src = '/assets/images/head2.png';

    ball = new Image();
    ball.src = '/assets/images/blue.png'

    apple = new Image();
    apple.src = '/assets/images/food2.png';

    food = new Image();
    food.src = '/assets/images/food.png';
};
// create the sneaky snake object and at start has five joints
function createSnake() {
    dots = 5;
    for (let z = 0; z < dots; z++) {
        x[z] = 50;
        y[z] = 50;
    };
};
// checks to see if head collides with the apple and increase the number of joints
function checkApple() {
    if ((x[0] === apple_x) && (y[0] === apple_y)) {
        dots++;
        locateApple();
        appleCount++
        console.log(appleCount)
    };
};
function checkFood() {
    if ((x[0] === food_x) && (y[0] === food_y)) {
        dots++;
        locateFood();
        appleCount++;
        console.log(appleCount);
    };
};

function doDrawing() {
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {
        ctx.drawImage(apple, apple_x, apple_y);
        ctx.drawImage(food, food_x, food_y);

        for (let z = 0; z < dots; z++) {
            if (z === 0) {
                ctx.drawImage(head, x[z], y[z]);
            }
            else {
                ctx.drawImage(ball, x[z], y[z]);
            };
        };
    } else {
        gameOver();
    };
};

function gameOver() {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game Over :(', C_WIDTH / 2, C_HEIGHT / 2);
};

function move() {
    // for loop moves joints of the snake up the chain
    for (let i = dots; i > 0; i--) {
        x[i] = x[(i - 1)];
        y[i] = y[(i - 1)];
    };
    // this line moves the head to the left
    if (leftDirection) {
        x[0] -= DOT_SIZE;
    }
    // this line moves the head to the right
    if (rightDirection) {
        x[0] += DOT_SIZE;
    }
    // this line moves the head up
    if (upDirection) {
        y[0] -= DOT_SIZE;
    }
    // this line moves the head down
    if (downDirection) {
        y[0] += DOT_SIZE;
    };
};
// determines of snake has hit itself or a border
function checkColliision() {
    // if the snake hits any of its joints the game is over
    for (let z = dots; z > 0; z--) {
        if ((z > 4) && (x[0] === x[z]) && (y[0] === y[z])) {
            inGame = false;
        };
    }
    // if the snake hits the bottom of the canvas the game is finished
    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }

    if (y[0] < 0) {
        inGame = false;
    }
    // if the snake hits the side of the canvas the game is finished
    if (x[0] >= C_WIDTH) {
        inGame = false;
    }

    if (x[0] < 0) {
        inGame = false;
    }
};
// randomly selects x and y coordinates for the apple object
function locateApple() {
    let r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
};
// randomly selects coordinates for food object number two
function locateFood() {
    let f = Math.floor(Math.random() * MAX_RAND);
    food_x = f * DOT_SIZE;

    f = Math.floor(Math.random() * MAX_RAND);
    food_y = f * DOT_SIZE;
};
// forms game cycle. provided game isnt finished it preforms
// detection of collision, do movement and drawing. set timeout calls 
// recursively 
function gameCycle() {
    if (inGame) {
        checkApple();
        checkFood();
        checkColliision();
        move();
        doDrawing();
        updateDisplay();
        setTimeout('gameCycle()', DELAY);
    }
    else if (!inGame) {
        $("#myModal").modal({
            show: true,
        });

        newGame();
    };
};
function newSneakySnake() {
    dots = 5;

    for (let z = 0; z < dots; z++) {
        y[z] = 200;
        x[z] = 300;
    };
};
function newGameStart() {
    inGame = true;
    canvas = document.getElementById('snakeCanvas');
    ctx = canvas.getContext('2d');
    // reinitialize score count
    appleCount = 0;
    loadImages();
    newSneakySnake();
    locateApple();
    locateFood();
    setTimeout('gameCycle()', DELAY);
}
function newGame() {
    $('#newGame').html(`<button id="newGameBtn" data-dismiss="modal" class="btn" type="submit" >Play Again!</button>`)

    $('#newGameBtn').on('click', function () {
        newGameStart();
    });
}
// displaying scores
function updateDisplay() {
    document.getElementById('appleCount').innerText = 'Score Count: ' + appleCount;

    if (appleCount > topScore) {
        topScore = appleCount;
        document.getElementById('highScore').innerText = 'High Score: ' + topScore;
        document.getElementById('modalScore').innerText = topScore;
    };
};

onkeydown = (e) => {
    let key = e.keyCode;

    if ((key === LEFT_KEY) && (!rightDirection)) {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key === RIGHT_KEY) && (!leftDirection)) {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key === UP_KEY) && (!downDirection)) {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key === DOWN_KEY) && (!upDirection)) {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
}
// player score and name submission! :D
$(function () {
    $('#playerForm').on('submit', (event) => {
        event.preventDefault();
        console.log('form submitted');
        let name = $('#name').val();

        if (!name) {
            console.log('please fill out this form')
            document.getElementById('message').innerText = 'Please fill out your name'
        }
        else if (name.length < 2 || name.length > 11) {
            console.log('must have more than 1 charcter and less than 11');
            document.getElementById('message').innerText = 'Your name must be between 1-10 characters'
        }
        else if (name) {
            let gameData = {
                name: $('#name').val(),
                score: topScore
            }
            $.ajax('/player', {
                method: 'POST',
                url: '/player',
                data: gameData
            })
                .then((data) => {
                    console.log('name submitted');
                    console.log(data);
                    document.getElementById('message').innerText = 'Name Submitted!'
                    resetForm();
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    });
    function resetForm() {
        $('#name').val('');
    };
});




