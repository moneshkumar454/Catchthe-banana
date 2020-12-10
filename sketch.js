var monkey , monkey_running
var ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(80,295,30,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(300,350,600,10);
  ground.x = ground.width/2;
  //ground.velocityX = -4;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
}


function draw() {
  background("white");
  text("Score:"+score,500,50)
  
  if(keyDown("space")&&monkey.y>250){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY +0.4;
  monkey.collide(ground);
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  spawnObstacles();
  spawnBanana();
  
  if(foodGroup.isTouching(monkey)){
    score = score +1;
    foodGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    score = score-2;
    obstacleGroup.destroyEach();
  }
  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(600,310,30,30);
    obstacle.velocityX = -6;
    obstacle.addImage("rocks",obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if(frameCount%115 ===0){
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage("food",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    //banana.debug = true;
    banana.lifetime = 180;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    foodGroup.add(banana);
  }
}




