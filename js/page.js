const pages = document.querySelectorAll('.page');
let currentPage = 0; // 当前页面索引
let isScrolling = false; // 防止多次触发滚动

// 在桌面端使用 'wheel' 事件监听滚动
document.querySelector('.pages').addEventListener('wheel', handleWheel);

// 在手机端使用 'touchstart' 和 'touchmove' 监听触摸滚动
let touchStartY = 0;
let touchTimeout = null; // 用来处理滑动延迟

document.querySelector('.pages').addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY; // 记录触摸开始的位置
    console.log('Touch Start: ', touchStartY);
});

document.querySelector('.pages').addEventListener('touchmove', (e) => {
    e.preventDefault(); // 阻止默认滚动行为

    const touchEndY = e.touches[0].clientY; // 获取当前触摸位置
    const deltaY = touchStartY - touchEndY; // 计算滑动的距离
    console.log('Touch Move: ', deltaY);

    // 如果滑动距离超过一定值，并且没有正在滚动，则触发滚动
    if (Math.abs(deltaY) > 50 && !isScrolling) {
        if (touchTimeout) {
            clearTimeout(touchTimeout); // 如果之前有延迟，清除它
        }

        touchTimeout = setTimeout(() => {
            if (deltaY > 0 && currentPage < pages.length - 1) {
                currentPage++; // 向下滑动，切换到下一个页面
            } else if (deltaY < 0 && currentPage > 0) {
                currentPage--; // 向上滑动，切换到上一个页面
            }
            handleScroll(); // 更新页面
        }, 30); // 设置滑动延迟时间（300ms）
    }
});

// 处理鼠标滚轮事件
function handleWheel(e) {
    if (isScrolling) return;

    isScrolling = true;
    if (e.deltaY > 0 && currentPage < pages.length - 1) {
        currentPage++; // 向下滚动，切换到下一个页面
    } else if (e.deltaY < 0 && currentPage > 0) {
        currentPage--; // 向上滚动，切换到上一个页面
    }
    handleScroll(); // 更新页面
}

// 更新页面的位置
function handleScroll() {
    updatePages(); // 更新页面位置
    setTimeout(() => {
        isScrolling = false; // 延迟 600ms 后允许再次滚动
    }, 600); // 600ms 延迟
}

// 更新页面的位置
function updatePages() {
    if (!pages || pages.length === 0) {
        console.error('No pages found!');
        return;
    }
    pages.forEach((page, index) => {
        const offset = (index - currentPage) * 100; // 计算页面位置的偏移
        page.style.transform = `translateY(${offset}%)`; // 设置页面的垂直位置
        // 仅在后续更新时添加过渡效果
        if (page.style.transition !== 'transform 0.6s ease-out') {
            page.style.transition = 'none'; // 初始加载无动画
        }
    });
    console.log('Page Updated: ', currentPage);
}

// 初始加载时更新页面状态
updatePages();

// 在页面加载完成后，设置过渡效果
window.addEventListener('load', () => {
    if (!pages || pages.length === 0) {
        console.error('No pages found on load!');
    } else {
        pages.forEach(page => {
            page.style.transition = 'transform 0.6s ease-out'; // 添加平滑过渡效果
        });
        updatePages(); // 再次更新页面以确保显示正确
    }
});
