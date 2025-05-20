window.onload = function () {
    var isActivityOn = true; // 若需要显示横幅，请将此变量改为 true，反之则改为 false

    if (isActivityOn) {
        var banner = document.createElement('div');
        banner.className = 'banner';
        banner.innerHTML = '<span>EXQ Studio 网站正在试运行中！<a href="javascript:void(0);" onclick="showPopup()" class="popup-link">>点此查看守则<</a></span><span class="close-btn">×</span>';

        var closeBtn = banner.querySelector('.close-btn');

        // 将横幅添加到页面中，例如添加到 body 的末尾
        document.body.appendChild(banner);

        closeBtn.addEventListener('click', function () {
            banner.style.display = 'none'; // 隐藏横幅
        });
    }
};