const startBtn = document.querySelector("#start-game-btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fps = 4;
const interval = 1000/fps;

let cellSize = 30;
let isStartBtnClicked = false;
let lastTime = 0;
let directionX = 0;
let directionY = 0;
let appleCuantity = 0;
let colorIndex = 0;


const columns = canvas.width / cellSize;
const rows = canvas.height / cellSize;
const appleColors = ["#DB1528", "#8C101A", "#F25C69",
                     "#73B842", "#A3D65E", "#467A1F",
                     "#F0D556", "#F7E98F", "#C7D455"];
const snake = {
    width: cellSize,
    height: cellSize,
    x: columns / 2 * cellSize,
    y: rows / 2 * cellSize,
    speed: cellSize,
    color: "#2ECC71",
    body: []
};

const apple = {
    width: cellSize,
    height: cellSize,
    x: 0,
    y: 0,
    color: "",
    eaten: function(){
        appleCuantity--;
        snake.body.push({
            width: snake.width,
            height: snake.height,
            snake.x
        }
        );
    }
};

function createCells(){
    ctx.fillStyle = "#000000";
    for (let i = 0;i < rows;i++){
        let x = i * cellSize;
        if (i % 2 === 0){
            for (let a = 0;a < columns;a++){
                if (a % 2 === 1){
                    continue;
                }else{
                    ctx.fillRect(a * cellSize, x, cellSize, cellSize);
                }
            }
        } else{
            for (let a = 0;a < columns;a++){
                if (a % 2 === 0){
                    continue;
                }else{
                    ctx.fillRect(a * cellSize, x, cellSize, cellSize);
        }
    }
}
}
}
createCells()

function gameLoop(currentTime){
    requestAnimationFrame(gameLoop);
    const delta = currentTime - lastTime;
    if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        createCells();
        if (snake.x === apple.x && snake.y === apple.y){
            apple.eaten();
        }
        if (appleCuantity <= 0){
            addApple();
        }
        if (directionX === 0 && directionY === 0){
            snake.x += snake.speed
        }
        ctx.fillStyle = appleColors[colorIndex];
        ctx.fillRect(apple.x, apple.y, apple.width,apple.height);
        snake.x += directionX;
        snake.y += directionY;
        ctx.fillStyle = snake.color;
        ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
    }
}

function addApple(){
    apple.x = (Math.floor(Math.floor(Math.random() * canvas.width) / cellSize)) * cellSize;
    apple.y = (Math.floor(Math.floor(Math.random() * canvas.height) / cellSize)) * cellSize;
    colorIndex = Math.floor(Math.random() * appleColors.length);
    appleCuantity++;
}

window.addEventListener("keydown", function(e){
    switch(e.key){
        case "w":
            if (directionY === 0){
                directionY = -snake.speed;
                directionX = 0;
            }
            break;
        case "s":
            if (directionY === 0){
                directionY = snake.speed;
                directionX = 0;
            }
            break;
        case "a":
            if (directionX === 0){
                directionX = -snake.speed;
                directionY = 0;
            }
            break;
        case "d":
            if (directionX === 0){
                directionX = snake.speed;
                directionY = 0;
            }
            break;
    } 
});

startBtn.addEventListener("click", function(){
    if(isStartBtnClicked){
        
    }else{
        isStartBtnClicked = true;
        requestAnimationFrame(gameLoop);
    }
});