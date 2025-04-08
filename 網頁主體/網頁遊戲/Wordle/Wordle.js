"use strict";
let html='<div id="letter_area">'
for(let i = 0 ; i < 30 ; i++){                          //上方字母列
    html+=`<div id="letter${i}" class="letter"></div>`
}
html+='</div>';

html+='<div id="key_area">';
for(let i of "QWERTYUIOP-ASDFGHJKL=ZXCVBNM"){
    switch(i){
        case '-':
             i ='&#x2190' ;html+=`<button id="Backspace" class="key">${i}</dbutton><br>&nbsp&nbsp`;break;
        case '=':
            i ='&#x21a9';html+=`<button id="Enter" class="key">${i}</button><br>&nbsp&nbsp&nbsp&nbsp`;break;
        default: html+=`<button id="Key${i}" class="key">${i}</button>`;//下方鍵盤
    }
}
html+='</div>';
document.getElementById("content").innerHTML=html;


let answer=Dictionary[Math.ceil(Math.random()*Dictionary.length)]
console.log(answer);
let cursor=0;                                               //準備輸入的位置
let letters = document.getElementsByClassName("letter");  
let buttons = document.getElementsByClassName("key");
window.addEventListener('keyup',function(e){                //鍵盤輸入
    if (e.code=="Backspace" && cursor%5>0){                               //若是Backspace，則退回一位
        if(letters[parseInt(cursor/5)*5+4].innerHTML == ''){
            cursor--;
            letters[cursor].innerHTML='';
        }
        else{
            letters[cursor].innerHTML='';
        }
        console.log(cursor);//
        
        
    }
    else if (e.code == "Enter" && cursor % 5 == 4 && letters[cursor].innerHTML != '') {
        
        let guess = '';
        let remaining = {};                                 // 記錄答案中每個字母的剩餘次數
        console.log(cursor);//
        
                                                            // 初始化 remaining，記錄答案中每個字母的次數
        for (let char of answer) {
            remaining[char] = (remaining[char] || 0) + 1;
        }
    
                                                            // 第一輪：檢查綠色（位置正確）
        for (let i = cursor - 4; i <= cursor; i++) {
            const char = letters[i].innerHTML.toLowerCase();
            guess += char;
    
            if (answer[i % 5] === char) {                   // 如果字母和位置都正確
                letters[i].classList.add('background_green');
                document.getElementById("Key" + letters[i].innerHTML).classList.add('background_green');
                remaining[char]--;                          // 減少剩餘次數
            }
        }
    
                                                            // 第二輪：檢查黃色（字母正確但位置不正確）和灰色（不存在的字母）
        for (let i = cursor - 4; i <= cursor; i++) {
            const char = letters[i].innerHTML.toLowerCase();
    
                                                            // 跳過已經標記為綠色的字母
            if (letters[i].classList.contains('background_green')) {
                continue;
            }
    
            if (remaining[char] > 0) {                      // 如果字母存在但位置不正確
                letters[i].classList.add('background_yellow');
                document.getElementById("Key" + letters[i].innerHTML).classList.add('background_yellow');
                remaining[char]--;                          // 減少剩餘次數
            } else {                                        // 如果字母不在答案中
                letters[i].classList.add('background_grey');
                document.getElementById("Key" + letters[i].innerHTML).classList.add('background_grey');
            }
        }
    
        console.log(guess);
        if (guess === answer) {
            
            cursor = 30; // 停止輸入
            victory();//勝利動畫
        } else if (cursor == 29) {
            cursor = 30; // 停止輸入
            lose();
        } else if (guess != answer) {
            
            cursor++;
        }
        
    }
    else if(e.code != "Enter" ){
        
        for (let i of "QWERTYUIOPASDFGHJKLZXCVBNM"){        //偵測是否為英文字母
            if (e.code==`Key${i}`){
                
                
                letters[cursor].innerHTML=e.key.toUpperCase();
                if(cursor%5<4)cursor++;
            }
        }
        console.log(cursor);//    
        
        
    }
})

for (let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',function(e){         //滑鼠點擊
        
        if (e.target.id=="Backspace" && cursor%5>0){                       //若是Backspace，則退回一位
            if(letters[parseInt(cursor/5)*5+4].innerHTML == ''){
                cursor--;
                letters[cursor].innerHTML='';
            }
            else{
                letters[cursor].innerHTML='';
            }
            console.log(cursor);//
            
            
            
        }
        else if (e.target.id == "Enter" && cursor % 5 == 4 && letters[cursor].innerHTML != '') {
            
            let guess = '';
            let remaining = {};                                 // 記錄答案中每個字母的剩餘次數
            console.log(cursor);//
        
            
                                                                //remaining記錄答案中每個字母的次數
            for (let char of answer) {
                remaining[char] = (remaining[char] || 0) + 1;
            }
        
                                                                // 第一次檢查綠色（位置正確）
            for (let i = cursor - 4; i <= cursor; i++) {
                const char = letters[i].innerHTML.toLowerCase();
                guess += char;
        
                if (answer[i % 5] === char) {                   // 字母和位置都正確
                    letters[i].classList.add('background_green');
                    document.getElementById("Key" + letters[i].innerHTML).classList.add('background_green');
                    remaining[char]--; 
                }
            }
        
                                                                // 第二次檢查黃色（字母正確但位置不正確）和灰色（不存在的字母）
            for (let i = cursor - 4; i <= cursor; i++) {
                const char = letters[i].innerHTML.toLowerCase();
        
                                                                // 跳過已經標記為綠色的字母
                if (letters[i].classList.contains('background_green')) {
                    continue;
                }
        
                if (remaining[char] > 0) {                      // 如果字母存在但位置不正確
                    letters[i].classList.add('background_yellow');
                    document.getElementById("Key" + letters[i].innerHTML).classList.add('background_yellow');
                    remaining[char]--;                          // 減少剩餘次數
                } else {                                        // 如果字母不在答案中
                    letters[i].classList.add('background_grey');
                    document.getElementById("Key" + letters[i].innerHTML).classList.add('background_grey');
                }
            }
        
            console.log(guess);
            if (guess === answer) {
               
                cursor = 30; // 停止輸入
                victory();   //勝利動畫
            } else if (cursor == 29) {
                cursor = 30; // 停止輸入
                lose();
            } else if (guess != answer) {
            
                cursor++;
            }
            
        }
        
        else if (e.target.id!="Enter" ){
            
            letters[cursor].innerHTML=e.target.innerHTML;
            if(cursor%5<4)cursor++;
            console.log(cursor);//
            
            
        }
        
    })
}

//header

let header='<div id="header">';

for (let i of 'WordleGame'){
    if (i==='G'){header+='<div>&nbsp&nbsp&nbsp</div>'}
    header+=`<div class="header_title">${i}</div>`; 
}

document.getElementById("header_0").innerHTML=header;          //須先寫入header_title

let headers = document.getElementsByClassName("header_title"); //才能使用它來Get

for (let i = 0;i < headers.length ; i++){
    
    if (i%3===1){headers[i].classList.add('background_green')}
    if (i%3===2){headers[i].classList.add('background_grey')}
    if (i%3===0){headers[i].classList.add('background_yellow')}
}
