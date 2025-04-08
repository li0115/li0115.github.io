"use strict";
let html=`
<header>
    <h1>樂透開獎</h1>
    <p>從1~49隨機隨機產生6個號碼</p>
</header>
<main>
<div><button id="start">Start to spin</button>
<button id="stop" disabled>Stop</button></div>
<div class=" balls">`;
for(let i = 0 ; i < 6 ; i++){
    html+=`<div id="ball${i+1}" class="ball">00</div>`;
}
html+=`</div></main>`;
document.write(html);

let aBall = document.getElementsByClassName("ball");    //6顆球的資料

let timers = []; 
document.getElementById("start").onclick = function(){

    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    for (let i = 0; i < 6; i++) {
        timers[i] = setInterval(function() {
            aBall[i].childNodes[0].nodeValue = Math.ceil(Math.random() * 49);
        }, 100);
    }

}
document.getElementById("stop").onclick = function(){
    document.getElementById("stop").disabled = true;
    for(let i = 0 ; i < 6 ; i++){
        setTimeout(function() {
        clearInterval(timers[i]);
        console.log(aBall[i].childNodes[0].nodeValue)
        if (i!=0){                              //若跟前面數字有重複，再重跑一次
            for (let j = 0 ; j<i;j++){
                if(aBall[j].childNodes[0].nodeValue==aBall[i].childNodes[0].nodeValue){
                    console.log(`因第${i+1}項跟第${j+1}項重複，故重新計算`)
                    timers[i]=setInterval(aBall[i].childNodes[0].nodeValue = Math.ceil(Math.random() * 49)
                    ,100)
                    i-=1;
                    break;
                }
            }
        }
        if (i==5){
            document.getElementById("start").disabled = false;
            timers=[];//放在迴圈內，timers ＝ []才會延遲，不然放在for迴圈外，時間還沒延遲，timers就先清空會導致數字不會停
            document.getElementById("explosion").style.display = "block";
            setTimeout(function(){    document.getElementById("explosion").style.display = "none";},1200)

        }
        }, i * 500 ); // 開始暫停數字
    }
    

}
