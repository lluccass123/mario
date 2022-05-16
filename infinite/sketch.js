var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas
var desert, backgroundImage;
var player, playerImage, walkani, backwardsani;
var invisibleGround;
var block, blockImage, blocks, blocksImage;
var coyote, coyoteImage;
var turtle, turtleImage;
var scorpion, scorpionImage;
var restart, restartImage;

function preload(){
    //backgroundImage = loadImage("./assets/desert1.jpg");
    playerImage = loadImage("./assets/characterIdle.png");
    blockImage = loadImage("./assets/woodblock.jpg");
    blocksImage = loadImage("./assets/woodblocks.png");
    turtleImage = loadImage("./assets/turtle.png");
    coyoteImage = loadImage("./assets/coyote.png");
    scorpionImage = loadImage("./assets/scorpion.png");
    restartImage = loadImage("./assets/reset.png");
    backwardsani = loadAnimation("./assets/character backward walk2.png","./assets/character backward.png","./assets/character backward walk1.png","/assets/character backward.png");
    walkani = loadAnimation("./assets/characterWalk1.png","./assets/characterWalk2.png","./assets/characterWalk3.png","./assets/characterWalk2.png");
}

function setup(){
    canvas = createCanvas(1400,800)
    //desert = createSprite(200, 200, 1400, 800);
    //desert.addImage(backgroundImage);
    player = createSprite(250,520,10,10);
    player.addImage(playerImage);
    player.scale = 0.4;
    block = createSprite(600,520,10,10);
    block.addImage(blockImage);
    block.scale = 0.4;
    restart = createSprite(700,400);
    restart.addImage(restartImage);
    restart.scale = 0.15;
    restart.visible = false;
    
    invisibleGround = createSprite(250,605,4000,75);
    //invisibleGround.visible = false;
    player.addAnimation("walk",walkani);
    player.addAnimation("backwards",backwardsani);
    obstaclesGroup = new Group();
}

function draw(){
    background("orange");
    if(gameState === PLAY){

    if(keyDown("up") && player.y >= 139){
        player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8
    player.collide(invisibleGround);
    player.collide(block);

    if(keyDown("right")){
        player.velocityX = player.velocityX + 0.3;
        player.changeAnimation('walk');
    }

    if(keyDown("left")){
        player.velocityX = player.velocityX - 0.3;
        player.changeAnimation('backwards');
    }
    } else if(gameState === END){
        restart.visible = true;
    }

    if(player.collide(obstaclesGroup)){
        player.velocityX = 0;
        gameState = END;
    }
    if(mousePressedOver(restart)){
        reset();
    }
    spawnObstacles();
    reset();
    drawSprites();
}
function spawnObstacles(){
    if(frameCount % 80 === 0){
        var obstacle = createSprite(2000,535,10,10);
        var rand = Math.round(random(1,3));
        switch(rand){
            case 1:
                obstacle.addImage(turtleImage);
                break;
            case 2:
                obstacle.addImage(coyoteImage);
                obstacle.scale = 0.2
                break;
            case 3:
                obstacle.addImage(scorpionImage);
                break;
        }
        obstacle.velocityX = -5;

        obstacle.scale = 0.2;
        obstacle.lifetime = 400;
        obstaclesGroup.add(obstacle);
    }
}
function reset(){
    gameState = PLAY;
    reset.visible = false;
    obstaclesGroup.destroyEach();

}