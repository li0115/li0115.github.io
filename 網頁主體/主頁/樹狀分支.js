let navigation = document.querySelector(".navigation");
let close = document.querySelector(".close");
navigation.onclick = function () {
  navigation.classList.add("active");
  console.log("Active added:", navigation.classList);
  
};
close.onclick = function () {
  navigation.classList.remove("active");
  console.log("Active removed:", navigation.classList);
  
  // 阻止事件冒泡，避免父元素的點擊事件重新添加 'active' 類別
  event.stopPropagation();
};
