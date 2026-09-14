const startBtn = document.querySelector("#start-game-btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fps = 4;
const interval = 1000/fps;

let cellSize = 30;
let isStartBtnClicked = false;
let lastTime = 0;
let directionY = 0;
let directionOnFrame = "right";
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
    speed: cellSize,
    color: "#2ECC71",
    body: [{
        x: columns / 2 * cellSize,
        y: rows / 2 * cellSize,
    }]
};

let directionX = snake.speed;

const apple = {
    width: cellSize,
    height: cellSize,
    x: 0,
    y: 0,
    color: "",
    eaten: function(){
        appleCuantity--;
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
        const futureHead = {
            x: snake.body[0].x + directionX,
            y: snake.body[0].y + directionY
        };
        snake.body.unshift(futureHead);
        if (snake.body[0].x === apple.x && snake.body[0].y === apple.y){
            apple.eaten();
        } else {
            snake.body.pop();
        }
        if (directionX > 0) directionOnFrame = "right";
        if (directionX < 0) directionOnFrame = "left";
        if (directionY > 0) directionOnFrame = "down";
        if (directionY < 0) directionOnFrame = "up";
        ctx.fillStyle = snake.color;
        for (let i = 0; i < snake.body.length; i++){
            ctx.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height);
        }
        if (appleCuantity <= 0){
            addApple();
        }
        ctx.fillStyle = appleColors[colorIndex];
        ctx.fillRect(apple.x, apple.y, apple.width,apple.height);
        console.log(snake.body);
    }
}

function addApple(){
    apple.x = (Math.floor(Math.floor(Math.random() * canvas.width) / cellSize)) * cellSize;
    apple.y = (Math.floor(Math.floor(Math.random() * canvas.height) / cellSize)) * cellSize;
    colorIndex = Math.floor(Math.random() * appleColors.length);
    appleCuantity++;
}

window.addEventListener("keydown", function(e){
    const key = e.key.toLowerCase();
    switch(key){
        case "w":
        case "ц":
            if (directionOnFrame === "left" || directionOnFrame === "right"){
                directionY = -snake.speed;
                directionX = 0;
            }
            break;
        case "s":
        case "ы":
            if (directionOnFrame === "left" || directionOnFrame === "right"){
                directionY = snake.speed;
                directionX = 0;
            }
            break;
        case "a":
        case "ф":
            if (directionOnFrame === "up" || directionOnFrame === "down"){
                directionX = -snake.speed;
                directionY = 0;
            }
            break;
        case "d":
        case "в":
            if (directionOnFrame === "up" || directionOnFrame === "down"){
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