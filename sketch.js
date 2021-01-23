var trex,trex_image, ground,ground_image,invisible_ground,cloud_image,gameState, count,ObstaclesGroup,CloudsGroup,gameover,restart, trex_collided
var PLAY=1;
var END=0;




function preload(){
ground_image=loadImage("ground2.png");
trex_image=loadAnimation("trex1.png","trex3.png","trex4.png");
Cloud_image=loadImage("cloud.png");
Obstacle1_Image=loadImage("obstacle1.png");
Obstacle2_Image=loadImage("obstacle2.png");
Obstacle3_Image=loadImage("obstacle3.png");
Obstacle4_Image=loadImage("obstacle4.png");
Obstacle5_Image=loadImage("obstacle5.png");
Obstacle6_Image=loadImage("obstacle6.png");
Gameover_Image=loadImage("gameOver.png");
Restart_Image=loadImage("restart.png");
trex_collided=loadImage("trex_collided.png");
 
  
   
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,50,50);
  ground=createSprite(200,180,400,20);
  ground.addImage(ground_image);
  trex.addAnimation("Alex",trex_image);
  trex.addAnimation("ball",trex_collided)
  trex.scale=0.5;
  invisible_ground=createSprite(200,190,400,10)
  invisible_ground.visible=false;
 count=0;
  gameState=PLAY;
   ObstaclesGroup = createGroup();
 CloudsGroup = createGroup();

//place gameOver and restart icon on the screen
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(Gameover_Image);
gameOver.scale = 0.5;
restart.addImage(Restart_Image);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(255);
   text("Score: "+ count, 250, 100);
  console.log(gameState);
  
 if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count+ Math.round(frameRate()/60)
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 151){
      trex.velocityY = -12 ;
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
  spawnClouds();
  spawnObstacles();
   if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
 }
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    trex.changeAnimation("ball",trex_collided)
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
  //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
   }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisible_ground);
  drawSprites();
}
function reset(){
 gameState=PLAY;
 ObstaclesGroup.destroyEach();
 CloudsGroup.destroyEach();
 gameOver.visible=false;
 restart.visible=false;
 trex.changeAnimation("Alex",trex_image)
 count = 0;
  
}



function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(Cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (4);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(Obstacle1_Image);
      break;
      case 2: obstacle.addImage(Obstacle2_Image);
      break;
      case 3: obstacle.addImage(Obstacle3_Image);
      break;
      case 4: obstacle.addImage(Obstacle4_Image);
        break;
      case 5: obstacle.addImage(Obstacle5_Image);
      break;
      case 6: obstacle.addImage(Obstacle6_Image);
      break; 
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
    }
  } 