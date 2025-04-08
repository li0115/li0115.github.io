function submitGridSize() {
    const gridSize = document.getElementById('gridSizeInput').value;
    if (gridSize > 3) {
        document.getElementById('customPrompt').style.display = 'none';
        // window.gridSize = gridSize;

        // // 動態加載踩地雷.js
        // const script = document.createElement('script');
        // script.src = '踩地雷.js';
        // script.onload = () => {
        //     console.log('踩地雷.js 已成功加載並執行');
        // }
        // script.onerror = () => {
        //     console.error('無法加載踩地雷.js');
        // }
        // document.head.appendChild(script);

    } else {
        alert('請輸入一個大於3的數字！');
    }
}