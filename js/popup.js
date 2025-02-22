function showPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("mask").style.display = "block";

    // 设置按钮初始状态为不可用
    const button = document.getElementById('closePopup');
    button.disabled = true;

    // 开始倒计时
    startCountdown(5, button);
}

function startCountdown(duration, button) {
    let timer = duration;

    // 更新倒计时显示
    const countdown = setInterval(() => {
        timer--;
        button.textContent = `${timer}秒后可关闭此提示`;

        if (timer <= 0) {
            clearInterval(countdown);
            button.disabled = false;
            button.textContent = "我已知晓"; // 倒计时结束后更新按钮文本
        }
    }, 1000);
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("mask").style.display = "none";

    // 记录用户已经看过弹窗
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem('seenPopup', true);
    } else {
        setCookie('seenPopup', true, 365); // 设置cookie有效期为一年
    }
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
    }
    return null;
}

// 检查用户是否已经看过弹窗
let seenPopup = false;
if (typeof (Storage) !== "undefined") {
    seenPopup = localStorage.getItem('seenPopup') === 'true';
} else {
    seenPopup = getCookie('seenPopup') === 'true';
}

// 如果用户之前没有看过弹窗，则显示弹窗
if (!seenPopup) {
    showPopup();
}