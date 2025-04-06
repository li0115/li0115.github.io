document.addEventListener("DOMContentLoaded", function () {
    var loginButton = document.getElementById("login_button");
    var passwordInput = document.getElementById("password");
    var accountInput = document.getElementById("account");

    // 預設按鈕為禁用
    loginButton.disabled = true;

    // 檢查輸入並更新按鈕狀態
    function updateButtonState() {
        if (passwordInput.value.length >= 6 && accountInput.value.trim().length > 0) {
            loginButton.disabled = false; // 啟用按鈕
        } else {
            loginButton.disabled = true;  // 禁用按鈕
        }
    }

    // 監聽輸入變化（即時更新按鈕狀態）
    passwordInput.addEventListener("input", updateButtonState);
    accountInput.addEventListener("input", updateButtonState);

    // 點擊登入按鈕時
    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止表單提交並刷新頁面

        var account = accountInput.value;
        var password = passwordInput.value;

        console.log("帳號:", account);
        console.log("密碼:", password);

        setTimeout(function () {
            accountInput.value = "";
            passwordInput.value = "";
            loginButton.disabled = true; // 清空後按鈕變回禁用狀態
        }, 1000);

    });
});
