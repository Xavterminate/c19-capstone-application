var PLAY = 1;
var END = 0;
var CONNECTING = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,back,backImg;


var obstaclesGroup,obstacle, obstacle1,deleted,deletedImg;

var score;



function preload(){
  trex_running = loadAnimation("man1.png","man2.png");
  trex_collided = loadAnimation("man1.png");
  
  groundImage = loadImage("ground2.png");
  backImg = loadImage("techBack.png")

  
  obstacle1 = loadImage("recyclebin.png");
  deletedImg = loadImage("deleted.png")
  
 
  

}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  

  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //back=createSprite(200,100,400,200);
  //back.addImage("back",backImg);
  //back.x= ground.width  /2;
  deleted=createSprite(300,50,10,10);
  deleted.addImage("deleted",deletedImg);
  deleted.scale=0.4;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
  //back.depth=1;
  //trex.depth=back.depth+1;




  background(180);
  //displaying score
  
  
  
  if(gameState === PLAY){
    deleted.visible=false;
   trex.visible=true;
    ground.velocityX = -(6 +  score/100)
    //back.velocityX=  -(6+ score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //if (back.x < 0){
      //back.x = back.width/2;
    //}
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
        
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    
    
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        //back.velocityX=0;

        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
      deleted.visible=true;
      trex.visible=false;
     text("press r to restart",300,110);
     //change the trex animation
      trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(-1);    
     if(keyDown("r")) {
      reset();
    }

   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
 fill("red");
  if(score<20000){
    text("Score: "+ score, 500,50);
  }
  if(score>20000){
    background(0);
    text("CONNECTING.........",300,100);
    text("next level coming soon",300,150);
    
  }
  drawSprites();
}

function reset(){
score=0;

obstaclesGroup.destroyEach();
  trex.changeAnimation("running");
gameState=PLAY;


}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacle1);
   
    //generate random obstacles
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}



