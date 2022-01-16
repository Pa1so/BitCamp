/* Constants for bricks */
var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;

/* Constants for ball and paddle */
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;

var BALL_RADIUS = 15;

//my variables
var paddle;
var ball;
var dx;
var dy;
var lives = 3;
var countBricks = 0;
var ballIsMoving = false;

function start(){
    createbricks();
    addMovingBall();
    addPaddle();
    mouseMoveMethod(movePaddle);
    println(lives + " - ❤");
}

function createbricks(){
    for(var rows = 0; rows < NUM_ROWS; rows++){
        for(var columns = 0; columns < NUM_BRICKS_PER_ROW; columns++){
            var rec = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
            rec.setPosition(BRICK_SPACING + (BRICK_WIDTH + BRICK_SPACING)*columns,
                            BRICK_TOP_OFFSET +(BRICK_HEIGHT + BRICK_SPACING)*rows);
            if(rows % 8 == 0 || rows % 8 == 1){
                rec.setColor(Color.red);
            }else if(rows % 8 == 2 || rows % 8 == 3){
                rec.setColor(Color.orange);
            }else if(rows % 8 == 4 || rows % 8 == 5){
                rec.setColor(Color.green);
            }else{
                rec.setColor(Color.blue);
            }
            add(rec);
        }
    }
}

function addMovingBall(){
    dx = 4;
    dy = 2*dx;
    ball = new Circle(BALL_RADIUS);
    ball.setPosition(getWidth()/2, getHeight()/2);
    add(ball);
    setTimer(moveBall, 20);
}

function moveBall(){
    checkWall();
    ball.move(dx, dy);
    bricksCollision();
    paddleCollision();
}

function paddleCollision(){
    var elemPT = getElementAt(ball.getX(), ball.getY() + BALL_RADIUS);
    if(elemPT == paddle){
        dy = -dy;
    }
    var elemPL = getElementAt(ball.getX() - BALL_RADIUS, ball.getY());
    if(elemPL == paddle){
        dx = -dx;
    }
    var elemPR = getElementAt(ball.getX() + BALL_RADIUS, ball.getY());
    if(elemPR == paddle){
        dx = -dx;
    }
}

function bricksCollision(){
    var elemT = getElementAt(ball.getX(), ball.getY() - BALL_RADIUS);
    if(elemT != null && elemT != paddle){
        remove(elemT);
        countBricks++;
        dy = -dy;
    }
    var elemL= getElementAt(ball.getX() - BALL_RADIUS, ball.getY());
    if(elemL != null && elemL != paddle){
        remove(elemL);
        countBricks++;
        dx = -dx;
    }
    var elemB = getElementAt(ball.getX(), ball.getY() + BALL_RADIUS);
    if(elemB != null && elemB != paddle){
        remove(elemB);
        countBricks++;
        dy = -dy;
    }
    var elemR = getElementAt(ball.getX() + BALL_RADIUS, ball.getY());
    if(elemR != null && elemR != paddle){
        remove(elemR);
        countBricks++;
        dx = -dx;
    }
    if(countBricks == 80){
        stopTimer(moveBall);
        remove(ball);
        youWin();
    }
}

function youWin(){
    var winT = new Text("You Win", "30pt Arial");
    winT.setPosition(getWidth()/2 - winT.getWidth()/2,
                    getHeight()/2 - winT.getHeight()/2);
    add(winT);
}

function checkWall(){
    if(ball.getX() + BALL_RADIUS > getWidth()){
        dx = -dx;
    }
    if(ball.getX() - BALL_RADIUS < 0){
        dx = -dx;
    }
    if(ball.getY() + BALL_RADIUS > getHeight()){
        stopTimer(moveBall);
        if(lives >= 1){
            lives--;
            println(lives + " - ❤");
        }
        if(lives > 0){
            ball.setPosition(getWidth()/2, getHeight()/2);
            mouseClickMethod(nextRound);
        }
        if(lives == 0){
            remove(ball);
            gameOver();
        }
    }
    if(ball.getY() - BALL_RADIUS < 0){
        dy = -dy;
    }
}

function nextRound(){
    stopTimer(moveBall);
    setTimer(moveBall, 20);
}

function gameOver(){
    var overT = new Text("Game Over", "30pt Arial");
    overT.setPosition(getWidth()/2 - overT.getWidth()/2,
                    getHeight()/2 - overT.getHeight()/2);
    add(overT);
}

function addPaddle(){
    paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
    paddle.setPosition(getWidth()/2 - paddle.getWidth()/2,
                    getHeight() - PADDLE_OFFSET - paddle.getHeight());
    add(paddle);
}

function movePaddle(e){
    var x = e.getX() - paddle.getWidth()/2;
    var y = getHeight() - PADDLE_OFFSET - paddle.getHeight();
    if(e.getX() - paddle.getWidth()/2 < 0){
        x = 0
        paddle.setPosition(x, y);
    }else if(e.getX() + paddle.getWidth()/2 > getWidth()){
        x = getWidth() - paddle.getWidth();
        paddle.setPosition(x, y);
    }else{
        paddle.setPosition(x, y);
    }
}