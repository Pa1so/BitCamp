/* This is a penguin game where you control the penguin
   and your point is to catch hearts untill you catch
   them all. Try not to hit walls or rectangles,
   as it means you loose the game.*/

   var PENGUIN_WIDTH = 60;
   var PENGUIN_HEIGHT = 30;
   var PENGUIN_COLOR = Color.black;
   var PENGUIN_HEAD_RADIUS = PENGUIN_HEIGHT/2;
   var PENGUIN_EYE_RADIUS = 4;
   var PENGUIN_TONGUE_WIDTH = 8;
   var PENGUIN_TONGUE_HEIGHT = 3;
   var MOVE_SPEED = 3;
   var MAXHEART = 23;
   
   // Constants to represent the directions
   var EAST = 0;
   var SOUTH = 1;
   var WEST = 2;
   var NORTH = 3;
   
   var text1 = readLine("This is a penguin game where you control the penguin " +
   "with arrow keyboards and your point is to catch hearts untill you catch " +
   "them all (23). Try not to hit walls or rectangles, " +
   "as it means you loose the game. (Click OK to start and then click on the game to activate penguin)");
   
   var penguinHead;
   var penguinLeftEye;
   var penguinRightEye;
   var penguinTongue;
   var heart;
   var scoreboardLine;
   var scoreboard;
   var countHeart = 0;
   var dy = 2;
   var rectangle1;
   var rectangle2;
   var rectangle3;
   
   var direction = EAST;
   
   function start(){
       addBackgroundColor();
       addPenguinHead();
       addPenguinEyes();
       addPenguinTongue();
       addHeart();
       addScoreboardLine();
       addScoreboard();
       setTimer(movePenguin, 0.05);
       keyDownMethod(keyDown);
       
       obstacleRectangle1();
       obstacleRectangle2();
       obstacleRectangle3();
       setTimer(moveObstacleRectangle, 20);
   }
   
   function addBackgroundColor(){
       var backgroundColor = new Rectangle(getWidth(), getHeight());
       backgroundColor.setPosition(0, 0);
       backgroundColor.setColor("#3EB489");
       add(backgroundColor);
   }
   
   function obstacleRectangle1(){
       rectangle1 = new Rectangle(30, 30);
       rectangle1.setPosition(Randomizer.nextInt(0, getWidth() - rectangle1.getWidth()), -30);
       rectangle1.setColor("#964B00");
       add(rectangle1);
   }
   
   function obstacleRectangle2(){
       rectangle2 = new Rectangle(30, 30);
       rectangle2.setPosition(Randomizer.nextInt(0, getWidth() - rectangle2.getWidth()), -30);
       rectangle2.setColor("#964B00");
       add(rectangle2);
   }
   
   function obstacleRectangle3(){
       rectangle3 = new Rectangle(30, 30);
       rectangle3.setPosition(Randomizer.nextInt(0, getWidth() - rectangle3.getWidth()), -30);
       rectangle3.setColor("#964B00");
       add(rectangle3);
   }
   
   function moveObstacleRectangle(){
       rectangle1.move(0, dy);
       rectangle2.move(0, dy*0.5);
       rectangle3.move(0, dy*1.5);
       checkLine();
   }
   
   function checkLine(){
       if(rectangle1.getY() + rectangle1.getHeight() > scoreboardLine.getY()){
           remove(rectangle1);
           add(rectangle1);
           rectangle1.setPosition(Randomizer.nextInt(0, getWidth() - rectangle1.getWidth()), -30);
           rectangle1.move(0, dy);
       }
       if(rectangle2.getY() + rectangle1.getHeight() > scoreboardLine.getY()){
           remove(rectangle2);
           add(rectangle2);
           rectangle2.setPosition(Randomizer.nextInt(0, getWidth() - rectangle2.getWidth()), -30);
           rectangle2.move(0, dy);
       }
       if(rectangle3.getY() + rectangle1.getHeight() > scoreboardLine.getY()){
           remove(rectangle3);
           add(rectangle3);
           rectangle3.setPosition(Randomizer.nextInt(0, getWidth() - rectangle3.getWidth()), -30);
           rectangle3.move(0, dy);
       }
   }
   
   function addPenguinHead(){
       penguinHead = new Circle(PENGUIN_HEAD_RADIUS);
       penguinHead.setPosition(PENGUIN_HEAD_RADIUS, getHeight()/2);
       penguinHead.setColor(PENGUIN_COLOR);
       add(penguinHead);
   }
   
   function addPenguinEyes(){
       penguinLeftEye = new Circle(PENGUIN_EYE_RADIUS);
       penguinLeftEye.setPosition(penguinHead.getX() + PENGUIN_EYE_RADIUS,
                               penguinHead.getY() - PENGUIN_EYE_RADIUS*2);
       penguinLeftEye.setColor(Color.white);
       add(penguinLeftEye);
       
       penguinRightEye = new Circle(PENGUIN_EYE_RADIUS);
       penguinRightEye.setPosition(penguinHead.getX() + PENGUIN_EYE_RADIUS,
                               penguinHead.getY() + PENGUIN_EYE_RADIUS*2);
       penguinRightEye.setColor(Color.white);
       add(penguinRightEye);
   }
   
   function addPenguinTongue(){
       penguinTongue = new Rectangle(PENGUIN_TONGUE_WIDTH, PENGUIN_TONGUE_HEIGHT);
       penguinTongue.setPosition(penguinHead.getX() + PENGUIN_HEAD_RADIUS - 4,
                               penguinHead.getY() - penguinTongue.getHeight()/2);
       penguinTongue.setColor(Color.red);
       add(penguinTongue);
   }
   
   function addHeart(){
       heart = new Text("❤️", "22pt ARIAL");
       heart.setPosition(Randomizer.nextInt(heart.getWidth()/2, getWidth() - heart.getWidth()),
   Randomizer.nextInt(getHeight()/3, getHeight() - heart.getWidth()));
       add(heart);
   }
   
   function addScoreboardLine(){
       scoreboardLine = new Line(0, getHeight() - 20,
                               getWidth(), getHeight() - 20);
       add(scoreboardLine);
   }
   
   function addScoreboard(){
       remove(scoreboard);
       scoreboard = new Text("Scoreboard: " + countHeart, "10pt arial");
       scoreboard.setPosition(getWidth()/2 - scoreboard.getWidth()/2, getHeight() - 5);
       add(scoreboard);
   }
   
   function gameIsOver(){
       var gameOver = new Text("You Lost", "30pt arial");
       gameOver.setPosition(getWidth()/2 - gameOver.getWidth()/2, getHeight()/2);
       add(gameOver);
   }
   
   function youWon(){
       var win = new Text("You Won", "30pt arial");
       win.setPosition(getWidth()/2 - win.getWidth()/2, getHeight()/2);
       add(win);
   }
   
   function movePenguin(){
       if(direction == EAST){
           if(penguinHead.getX() + penguinHead.getRadius() > getWidth()){
               stopTimer(movePenguin);
               stopTimer(moveObstacleRectangle);
               gameIsOver();
               remove(penguinHead);
               remove(penguinLeftEye);
               remove(penguinRightEye);
               remove(penguinTongue);
               remove(heart);
               remove(rectangle1);
               remove(rectangle2);
               remove(rectangle3);
           }else{
               penguinHead.move(MOVE_SPEED, 0);
               penguinLeftEye.setPosition(penguinHead.getX() + PENGUIN_EYE_RADIUS,
                                       penguinHead.getY() - PENGUIN_EYE_RADIUS*2);
               penguinLeftEye.move(MOVE_SPEED, 0);
               penguinRightEye.setPosition(penguinHead.getX() + PENGUIN_EYE_RADIUS,
                                       penguinHead.getY() + PENGUIN_EYE_RADIUS*2);
               penguinRightEye.move(MOVE_SPEED, 0);
               penguinTongue.setRotation(360);
               penguinTongue.setPosition(penguinHead.getX() + PENGUIN_HEAD_RADIUS - 4,
                                       penguinHead.getY() - penguinTongue.getHeight()/2);
               penguinTongue.move(MOVE_SPEED, 0);
               var elemHeart = getElementAt(penguinTongue.getX() + PENGUIN_TONGUE_WIDTH,
                                           penguinTongue.getY());
               if(elemHeart == heart){
                   countHeart++;
                   addScoreboard();
                   remove(elemHeart);
                   addHeart();
                   scoreboard;
                   if(countHeart == MAXHEART){
                       stopTimer(movePenguin);
                       stopTimer(moveObstacleRectangle);
                       youWon();
                       remove(penguinHead);
                       remove(penguinLeftEye);
                       remove(penguinRightEye);
                       remove(penguinTongue);
                       remove(heart);
                       remove(rectangle1);
                       remove(rectangle2);
                       remove(rectangle3);
                   }
               }
               if(elemHeart == rectangle1){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle2){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle3){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
           }
       }else if(direction == NORTH){
           if(penguinHead.getY() - penguinHead.getRadius() < 0){
               stopTimer(movePenguin);
               stopTimer(moveObstacleRectangle);
               gameIsOver();
               remove(penguinHead);
               remove(penguinLeftEye);
               remove(penguinRightEye);
               remove(penguinTongue);
               remove(heart);
               remove(rectangle1);
               remove(rectangle2);
               remove(rectangle3);
           }else{
               penguinHead.move(0, -MOVE_SPEED);
               penguinLeftEye.setPosition(penguinHead.getX() - PENGUIN_EYE_RADIUS*2,
                                       penguinHead.getY() - PENGUIN_EYE_RADIUS);
               penguinLeftEye.move(0, -MOVE_SPEED);
               penguinRightEye.setPosition(penguinHead.getX() + PENGUIN_EYE_RADIUS*2,
                                       penguinHead.getY() - PENGUIN_EYE_RADIUS);
               penguinRightEye.move(0, -MOVE_SPEED);
               penguinTongue.setRotation(90);
               penguinTongue.setPosition(penguinHead.getX() - penguinTongue.getWidth()/1.5,
                                       penguinHead.getY() - PENGUIN_HEAD_RADIUS - 4);
               penguinTongue.move(MOVE_SPEED, 0);
               var elemHeart = getElementAt(penguinTongue.getX(),
                                           penguinTongue.getY() + PENGUIN_TONGUE_WIDTH);
               if(elemHeart == heart){
                   countHeart++;
                   addScoreboard();
                   remove(elemHeart);
                   addHeart();
                   scoreboard;
                   if(countHeart == MAXHEART){
                       stopTimer(movePenguin);
                       stopTimer(moveObstacleRectangle);
                       youWon();
                       remove(penguinHead);
                       remove(penguinLeftEye);
                       remove(penguinRightEye);
                       remove(penguinTongue);
                       remove(heart);
                       remove(rectangle1);
                       remove(rectangle2);
                       remove(rectangle3);
                   }
               }
               if(elemHeart == rectangle1){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle2){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle3){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
           }
       }else if(direction == WEST){
           if(penguinHead.getX() - penguinHead.getRadius() < 0){
               stopTimer(movePenguin);
               stopTimer(moveObstacleRectangle);
               gameIsOver();
               remove(penguinHead);
               remove(penguinLeftEye);
               remove(penguinRightEye);
               remove(penguinTongue);
               remove(heart);
               remove(rectangle1);
               remove(rectangle2);
               remove(rectangle3);
           }else{
               penguinHead.move(-MOVE_SPEED, 0);
               penguinLeftEye.setPosition(penguinHead.getX() - PENGUIN_EYE_RADIUS,
                                       penguinHead.getY() + PENGUIN_EYE_RADIUS*2);
               penguinLeftEye.move(-MOVE_SPEED, 0);
               penguinRightEye.setPosition(penguinHead.getX() - PENGUIN_EYE_RADIUS,
                                       penguinHead.getY() - PENGUIN_EYE_RADIUS*2);
               penguinRightEye.move(-MOVE_SPEED, 0);
               penguinTongue.setRotation(180);
               penguinTongue.setPosition(penguinHead.getX() - PENGUIN_HEAD_RADIUS - penguinTongue.getWidth(),
                                       penguinHead.getY() - penguinTongue.getHeight()/2);
               penguinTongue.move(MOVE_SPEED, 0);
               var elemHeart = getElementAt(penguinTongue.getX() - PENGUIN_TONGUE_WIDTH,
                                           penguinTongue.getY());
               if(elemHeart == heart){
                   countHeart++;
                   addScoreboard();
                   remove(elemHeart);
                   addHeart();
                   scoreboard;
                   if(countHeart == MAXHEART){
                       stopTimer(movePenguin);
                       stopTimer(moveObstacleRectangle);
                       youWon();
                       remove(penguinHead);
                       remove(penguinLeftEye);
                       remove(penguinRightEye);
                       remove(penguinTongue);
                       remove(heart);
                       remove(rectangle1);
                       remove(rectangle2);
                       remove(rectangle3);
                   }
               }
               if(elemHeart == rectangle1){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle2){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle3){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
           }
       }else{
           if(penguinHead.getY() + penguinHead.getRadius() > scoreboardLine.getY()){
               stopTimer(movePenguin);
               stopTimer(moveObstacleRectangle);
               gameIsOver();
               remove(penguinHead);
               remove(penguinLeftEye);
               remove(penguinRightEye);
               remove(penguinTongue);
               remove(heart);
               remove(rectangle1);
               remove(rectangle2);
               remove(rectangle3);
           }else{
               penguinHead.move(0, MOVE_SPEED);
               penguinLeftEye.setPosition(penguinHead.getX() + PENGUIN_EYE_RADIUS*2,
                                       penguinHead.getY() + PENGUIN_EYE_RADIUS);
               penguinLeftEye.move(0, MOVE_SPEED);
               penguinRightEye.setPosition(penguinHead.getX() - PENGUIN_EYE_RADIUS*2,
                                       penguinHead.getY() + PENGUIN_EYE_RADIUS);
               penguinRightEye.move(0, MOVE_SPEED);
               penguinTongue.setRotation(270);
               penguinTongue.setPosition(penguinHead.getX() - penguinTongue.getWidth()/1.5,
                                       penguinHead.getY() + PENGUIN_HEAD_RADIUS + 2);
               penguinTongue.move(MOVE_SPEED, 0);
               var elemHeart = getElementAt(penguinTongue.getX(),
                                           penguinTongue.getY() + PENGUIN_TONGUE_WIDTH);
               if(elemHeart == heart){
                   countHeart++;
                   addScoreboard();
                   remove(elemHeart);
                   addHeart();
                   scoreboard;
                   if(countHeart == MAXHEART){
                       stopTimer(movePenguin);
                       stopTimer(moveObstacleRectangle);
                       youWon();
                       remove(penguinHead);
                       remove(penguinLeftEye);
                       remove(penguinRightEye);
                       remove(penguinTongue);
                       remove(heart);
                       remove(rectangle1);
                       remove(rectangle2);
                       remove(rectangle3);
                   }
               }
               if(elemHeart == rectangle1){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle2){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
               if(elemHeart == rectangle3){
                   stopTimer(movePenguin);
                   stopTimer(moveObstacleRectangle);
                   gameIsOver();
                   remove(penguinHead);
                   remove(penguinLeftEye);
                   remove(penguinRightEye);
                   remove(penguinTongue);
                   remove(heart);
                   remove(rectangle1);
                   remove(rectangle2);
                   remove(rectangle3);
               }
           }
           
       }
   }
   
   function keyDown(e){
       if(countHeart == MAXHEART){
           stopTimer(movePenguin);
       }else{
           if(e.keyCode == Keyboard.UP && direction != SOUTH){
               stopTimer(movePenguin);
               direction = NORTH;
               penguinHead.setRotation(90);
               setTimer(movePenguin, 0.05);
           }else if(e.keyCode == Keyboard.LEFT && direction != EAST){
               stopTimer(movePenguin);
               direction = WEST;
               penguinHead.setRotation(180);
               setTimer(movePenguin, 0.05);
           }else if(e.keyCode == Keyboard.DOWN && direction != NORTH){
               stopTimer(movePenguin);
               direction = SOUTH;
               penguinHead.setRotation(270);
               setTimer(movePenguin, 0.05);
           }else if(e.keyCode == Keyboard.RIGHT && direction != WEST){
               stopTimer(movePenguin);
               direction = EAST;
               penguinHead.setRotation(360);
               setTimer(movePenguin, 0.05);
           }
       }
   }