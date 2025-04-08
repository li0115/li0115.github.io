"use strict";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let counter=0;
function victory(){
    const grad=ctx.createLinearGradient(30,0,650,0);
    grad.addColorStop(0, "red");
    grad.addColorStop(0.5, "blue");
    grad.addColorStop(0.75, "purple");
    grad.addColorStop(1, "orange");
    ctx.font="80px Arial";
    ctx.fillStyle = grad;
    ctx.fillText("Congratulations",30,100,230);
    counter+=5;
    ctx.clearRect(counter,0,800,200);
    if(counter<300){setTimeout(victory,50)}
}


function lose(){
    ctx.clearRect(0,0,300,150);
    const grad=ctx.createLinearGradient(30,0,650,0);
    grad.addColorStop(0, "white");
    grad.addColorStop(0.5, "red");
    grad.addColorStop(1, "white");
    ctx.font="60px Arial";
    ctx.fillStyle = grad;
    ctx.fillText("Don't give up try again",30,counter,230);
    counter+=2;
    if(counter<135){setTimeout(lose,50)}
}


