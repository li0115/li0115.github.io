"use strict";
let html=`
    <header>
        <h1 style="position:relative">Magic Game (Javascript Version)</h1>
        <p>不要讓我知道.....但是告訴我在下列哪張卡片中？我可以找出來喔！</p>
        <p><input type="button" value="答案" id="btn"></p>
    </header>
    <main>`;
    for(let i=0;i<=5;i++){
        html+=`<table>
        <tr><td colspan="8" class="title">第${i+1}張卡片<input type="checkbox" id="box_${i+1}"></td></tr>`;
        let numbers_to_fill=[]
        for (let x=1;x<=64;x++){                        //計算2進制
            if ((x & 2**i)!=0){
                numbers_to_fill.push(x);
            }
        }
        for (let j=0;j<4;j++){
            html+='<tr>';
            for(let k=0;k<8;k++){
                html+=`<td>${numbers_to_fill[(8*j)+k]}</td>`;
            }
            html+='</tr>';
        }
        html+='</table>';
        if (i==2){html+='<br>'}
    }
    html+='</main>'

document.write(html);
const buttonElement = document.getElementById("btn");
var ans="";

buttonElement.addEventListener("click", function (event) {
    for (let i=6;i>=1;i--){
        var x=document.getElementById(`box_${i}`);
        if (x.checked) {
            ans+="1";
        } else {
            ans+="0";
        }
    }
    if (parseInt(ans, 2)!=0)document.getElementById("ans_box").innerHTML="it's "+parseInt(ans, 2)+ " Ha Ha am I right?";
    else document.getElementById("ans_box").innerHTML="請選擇數字並勾選卡片 (#`＾ˊ)";
    document.getElementById("ans_box").style.display="flex";
    ans="";
    }
    )
