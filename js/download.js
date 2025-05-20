// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('dlOverlay');
    const closeBtn = document.getElementById('closeBtn');

    // 显示弹窗
    overlay.style.display = 'block';

    // 点击确定按钮关闭
    closeBtn.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    // 点击遮罩层也可关闭（可选）
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

$(document).ready(function () {
    $(".overlay").fadeIn(200);

    $(".OK").click(function () {
        $(".overlay").fadeOut(200);
    });
});