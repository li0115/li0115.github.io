let gridSize = parseInt(window.prompt("踩地雷遊戲，想玩幾*幾？(最小為4)"));
while (isNaN(gridSize) || gridSize <= 3) {
  gridSize = parseInt(window.prompt("請輸入有效的整數，想玩幾*幾？(最小為4)"));
}
let cellSize = 600 / gridSize; // 動態計算每個格子的大小

let numbers = Array.from({ length: gridSize }, () => Array(gridSize).fill(0)); // 地圖
let boomLocation = new Array(gridSize); // 炸彈位置
let boomNumberText = []; // 儲存每個格子上的數字
let scoreDisplay = 0; // 玩家當前分數
let clicked = Array.from({ length: gridSize }, () => Array(gridSize).fill(0)); // 記錄玩家已點擊的格子
let status = Array.from({ length: gridSize }, () => Array(gridSize).fill(0)); // 預留狀態數據
let lose = false; // 判斷玩家是否輸掉
let backgroundImg; // 遊戲背景圖片
let animationFrame = 0;

function setup() {
  createCanvas(600, 710); // 設置畫布大小
  let a = 0; 

  // 隨機生成 10 顆炸彈到地圖上
  while (a < floor(gridSize*gridSize/10)) {
    const x = int(random(0, gridSize));
    const y = int(random(0, gridSize));
    if (numbers[x][y] === 0) { // 不重複放置炸彈
      numbers[x][y] = 1;
      a++;
    }
  }

  // 將炸彈位置記錄為字符串
  boomLocation = numbers.map(row => row.join(''));
  boomLocation.forEach(line => console.log(line));
}

function preload() {
  backgroundImg = loadImage("https://i.imgur.com/29At4Qk.jpg"); // 加載背景圖片
  bombImage = loadImage("https://li0115.github.io/%E7%B6%B2%E9%A0%81%E4%B8%BB%E9%AB%94/%E7%B6%B2%E9%A0%81%E9%81%8A%E6%88%B2/%E8%B8%A9%E5%9C%B0%E9%9B%B7/bomb.png");

}

function draw() {
  background(0); 
  image(backgroundImg, 0, 0); 

  fill(255); 
  textAlign(LEFT);
  textSize(25);
  text(`Score: ${scoreDisplay}`, 10, 30);   // 在左上角顯示分數

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      fill("#FFFFFF");                      // 預設格子的顏色
      rect(cellSize * j, cellSize * i + 60, cellSize, cellSize);    // 繪製每個格子

      if (clicked[i][j] === 1) {
        fill("#018a00"); // 安全格的顏色
        rect(cellSize * j, cellSize * i + 60, cellSize, cellSize);
        if(getAdjacentMines(j, i)!=0){
          fill(255);
          textSize(cellSize/2.5);
          textAlign(CENTER, CENTER);
          text(getAdjacentMines(j, i), cellSize * j + cellSize / 2, cellSize * i + 60 + cellSize / 2); // 顯示周圍炸彈數量
        }
      } 
      else if (clicked[i][j] === 2) {
        lose = true; // 點到炸彈，遊戲結束
        fill("#e6000b"); // 炸彈格的顏色
        rect(cellSize * j, cellSize * i + 60, cellSize, cellSize);
        let imgSize = cellSize * 0.7;
        let offset = (cellSize - imgSize) / 2;
        image(bombImage, cellSize * j + offset, cellSize * i + 60 + offset, imgSize, imgSize);

      }
    }
  }

  // 顯示遊戲結果
  if (lose) {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (numbers[i][j]===1){
          fill("#e6000b"); // 炸彈格的顏色
          rect(cellSize * j, cellSize * i + 60, cellSize, cellSize);
          let imgSize = cellSize * 0.7;
          let offset = (cellSize - imgSize) / 2;
          image(bombImage, cellSize * j + offset, cellSize * i + 60 + offset, imgSize, imgSize);

        }
      }
    }
    displayGameOver();
  } else if (scoreDisplay === (gridSize * gridSize - floor(gridSize*gridSize/10))) { // 更新勝利條件
    displayWin();
  }
}

// 計算指定格子周圍的炸彈數量
function getAdjacentMines(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        x + j >= 0 &&
        x + j < gridSize &&
        y + i >= 0 &&
        y + i < gridSize &&
        numbers[y + i][x + j] === 1
      ) {
        count++;
      }
    }
  }
  return count;
}

function revealZeros(x, y) {
  for (let i = -1; i <= 1; i++) {   //九宮格
    for (let j = -1; j <= 1; j++) {
      const newX = x + j;
      const newY = y + i;
      if (
        newX >= 0 &&
        newX < gridSize &&
        newY >= 0 &&
        newY < gridSize &&
        clicked[newY][newX] === 0 
      ) {
        clicked[newY][newX] = 1; // 標記為已顯示
        scoreDisplay++;

        if (getAdjacentMines(newX, newY) === 0) {
          revealZeros(newX, newY); // 遞歸揭示
        }
      }
    }
  }
}

function mousePressed() {
  if (lose) return; // 忽略超出地圖範圍或遊戲結束後的點擊

  const x = floor(mouseX / cellSize); // 將滑鼠的 X 座標轉換為地圖的列索引
  const y = floor((mouseY - 60) / cellSize); // 將滑鼠的 Y 座標轉換為地圖的行索引

  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    if (numbers[y][x] === 0 && clicked[y][x] === 0) {
      clicked[y][x] = 1; // 點到安全格
      scoreDisplay++;
      if (getAdjacentMines(x, y) === 0) { // 若這格周圍的炸彈數==0
        revealZeros(x, y); // 則把相連的0都印出
      }
    } else if (numbers[y][x] === 1) {
      clicked[y][x] = 2; // 點到炸彈
    }
  }
}

// 顯示 "遊戲結束" 訊息，加入動畫效果
function displayGameOver() {
  animationFrame++;
  push(); // 儲存畫布狀態
  translate(width / 2, height / 2); // 將原點移至中心
  fill(0, 0, 0, map(sin(animationFrame * 0.1), -1, 1, 100, 255)); // 動態透明度
  textSize(128);
  textAlign(CENTER, CENTER);
  text("Lose", 0, 0); 
  pop(); // 恢復畫布狀態
}

// 顯示 "獲勝" 訊息，加入動畫效果
function displayWin() {
  animationFrame++;
  push(); // 儲存畫布狀態
  translate(width / 2, height / 2); // 將原點移至中心
  fill(map(sin(animationFrame * 0.1), -1, 1, 50, 255), 255, 0); // 動態顏色
  textSize(80 + sin(animationFrame * 0.1) * 10); // 動態文字大小
  textAlign(CENTER, CENTER);
  text("Congratulation", 0, 0);
  pop(); // 恢復畫布狀態
}
