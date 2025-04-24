let board;
let boardheight = 640;
let boardwidth = 430;
let context;

let birdheight = 34;
let birdwidth = 24;
let birdX = boardwidth/8;
let birdY = boardheight/2;

let bird = {
    x: birdX,
    y: birdY,
    height: birdheight,
    width: birdwidth,

}

let birdimage;


let pipearray  = [];
let pipearray1 = [];


let pipeheight = 300;
let pipewidth = 64;

let pipeX = boardwidth;
let pipeY = 0;


let pipeimage_top;
let pipeimage_bottom;



let velocityx = -2;
let velocityy  = 0;


let gameover;

let score = 0;


window.onload  = function(){
    board = document.getElementById('board');
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext('2d');



    birdimage = new Image();
    birdimage.src = "assets/flappybird.png";
    


    pipeimage_top = new Image();
    pipeimage_top.src = 'assets/toppipe.png';

    pipeimage_bottom = new Image();
    pipeimage_bottom.src  = "assets/bottompipe.png";



    requestAnimationFrame(update);
    setInterval(playpipes, 1500);
    setInterval(playpipes1, 1500);

    document.addEventListener('keydown', movement);


}

function update(){
    requestAnimationFrame(update);
    if(gameover){
        return;

    }
    context.clearRect(0, 0, board.width, board.height);
    velocityy +=0.16;
    
    bird.y +=velocityy;

    context.drawImage(birdimage, bird.x, bird.y, bird.height, bird.width);
    for(let i = 0;i<pipearray.length;i++){
        let pipe = pipearray[i];
        pipe.x +=velocityx;
        context.drawImage(pipeimage_top, pipe.x, pipe.y, pipe.width, pipe.height);

        if(detectcollision(bird, pipe)){
            gameover = true;
            
        }

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score = score + 1;
            pipe.passed = true;
            
            
        }
        

    }
    for(let i = 0;i<pipearray1.length;i++){
        let pipe = pipearray1[i];
        pipe.x +=velocityx;
        context.drawImage(pipeimage_bottom, pipe.x, pipe.y, pipe.width, pipe.height);
        
        if(detectcollision(bird, pipe)){
            gameover = true;


        }
        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score = score + 1;
            pipe.passed = true;


        }
    }


    context.fillStyle = 'white';
    context.font = '45px sans-serif';
    context.fillText(score, 5, 45);


}


function playpipes(){
    let toppipe  = {
        width: pipewidth,
        height: pipeheight,
        x: pipeX,
        y: pipeY,
        passed: false,


    }

    pipearray.push(toppipe);

}


function playpipes1(){
    let bottompipe  = {
        width: pipewidth,
        height: pipeheight,
        x: pipeX,
        y: pipeY + 480,
        passed: false,


    }

    pipearray1.push(bottompipe);

}

function movement(e){
    if(e.code=='Space'){
        velocityy = -5;

    }
}

function detectcollision(a, b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

}

