var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var invisibleBlock, invisibleBlockGroup;
var ghost, ghostImg;
var gameState="play";
var spooky;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spooky=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost",ghostImg);
  
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
spooky.loop();
}

function draw(){
  background = 0;
  if(gameState==="play"){
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY= -10;
    }
    
    ghost.velocityY=ghost.velocityY+0.8;
    
    if(tower.y>400){
    tower.y=300;
  }
  
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState="end";
  }
  
  drawSprites();
}
if(gameState==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(30); 
  text("Game Over", 230,250)
}
}
function spawnDoors(){
  if(frameCount % 240===0){
     door=createSprite(200,-50);
    door.addImage("door",doorImg);
    
    climber=createSprite(200,10);
    climber.addImage("climber",climberImg);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    climber.x= door.x; 
    climber.velocityY= 1;
    invisibleBlock.velocityY= 1;



    

    door.lifetime=800;
    climber.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug=false;
    invisibleBlockGroup.add(invisibleBlock  );
    invisibleBlock.x=door.x;  
    
    ghost.depth=door.depth;
    ghost.depth+=1;
  }
    
    
    
    
    
    
    
}


