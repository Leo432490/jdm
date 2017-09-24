(function() {
    var utils = {};
    /**
     * 实现搜索栏透明显示的效果 
     * @return {[type]} [description]
     */
    utils.changeOpacity = function() {
        var banner = document.querySelector('.jd_banner');
        var height = banner.offsetHeight;
        var search = document.querySelector('.jd_search_box');
        console.log(top, banner, height, search);
        window.onscroll = function() {
            var top = document.body.scrollTop;
            if (top < height) {
                var opacity = top / height * 0.85;
                search.style.background = 'rgba(201, 21, 35, ' + opacity + ')'

            } else {
                search.style.background = 'rgba(201, 21, 35, 0.85)';
            }
        }
    }

    utils.lunbo = function() {
        /**
         *需求分析：
         *1.自动轮播（定时器 + 过渡 + 位移 ）
         *
         *2.滑动轮播 (touch 事件组完成移动端常见的滑动效果)
         *
         *3.点滚动 （判断当前索引的改变，改变当前样式）
         *
         *4.吸附 (过渡 和 位移)
         *
         *5. 切换 上一张 和 下一张 （过渡和位移）
         *
         * 
         */

        // 1.实现自动轮播功能
        var banner = document.querySelector('.jd_banner');
        var imgsBox = banner.querySelector('ul:first-child');
        var pointsBox = banner.querySelector('ul:last-child');
        var points = pointsBox.querySelectorAll('li');
        var width = banner.offsetWidth;
        var index = 1;
        console.log(width);
        // 添加过渡
        var addTransition = function() {
            imgsBox.style.transition = "all 0.2s";
            imgsBox.style.webkitTransition = "all 0.2s";
        }
        //  清除过渡
        var removeTransition = function() {
            imgsBox.style.transition = "none";
            imgsBox.style.webkitTransition = "none";
        }
        // 添加定位
        var setTranslatex = function(translatex) {
            imgsBox.style.transform = "translate(" + (translatex) + "px)";
            imgsBox.style.webkitTransform = "translate(" + (translatex) + "px)";
        }

        // 设置点的变换
        var setPoints = function(index) {
            for (var i = 0; i < points.length; i++) {
                points[i].classList.remove('now');
            }
            points[index].classList.add('now');
        }

        // 添加轮播动画
        var timer = setInterval(function() {
            index++;
            // 添加 过渡
            addTransition();
            // 添加定位
            setTranslatex(-index * width);


        }, 10000)
        // 监视图片盒子过渡动画结束，然后执行瞬间定位操作

        imgsBox.addEventListener('transitionend', function() {
            if (index >= 9) {
                index = 1;
                // 清除过渡
                removeTransition();
                // 添加 定位
                setTranslatex(-index * width);
                points[index - 1].className = 'now';
            } else if (index <= 0) {
                index = 8;
                // 清除过渡
                removeTransition();
                // 添加 定位
                setTranslatex(-index * width);
            }

            setPoints(index - 1);
        })

        var startX = 0; // 为了在移动手势事件中使用 
        var distance = 0; //为了在手指拿起来的时候使用
        var isMove = false; //目的是为了判断是否处于滑动的状态中
        imgsBox.addEventListener('touchstart', function(e) {
            clearInterval(timer);
            startX = e.touches[0].clientX;
        })
        imgsBox.addEventListener('touchmove', function(e) {
            var moveX = e.touches[0].clientX;
            distance = moveX - startX;
            var translatex = -index * width + distance;
            removeTransition();
            setTranslatex(translatex);
            isMove = true;
        })
        imgsBox.addEventListener('touchend', function(e) {
            if (isMove && Math.abs(distance) < width / 3) {
                addTransition();
                setTranslatex(-index * width);
            } else if (isMove && Math.abs(distance) > width / 3) {
                if (distance > 0) {
                    index--;
                } else {
                    index++;
                }
                addTransition();
                setTranslatex(-index * width);
            }
            startX = 0;
            distance = 0;
            isMove = false;

            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                // 添加 过渡
                addTransition();
                // 添加定位
                setTranslatex(-index * width);
            }, 1000)

        })
    }

    utils.downTime = function() {
        // 首先要获取元素
        var time = document.querySelector('.time');
        var spans = time.querySelectorAll('span');
        var setTime = 5;

        var timer = setInterval(function() {
            setTime--;

            var h = Math.floor(setTime/3600);
            var m = Math.floor(setTime%3600/60);
            var s = setTime % 60;

            spans[0].innerHTML = Math.floor(h / 10);
            spans[1].innerHTML = h%10;
            spans[3].innerHTML = Math.floor(m / 10);
            spans[4].innerHTML = m%10;
            spans[6].innerHTML = Math.floor(s / 10);
            spans[7].innerHTML = s%10;

            if(setTime = 0) {
                clearInterval(timer);
            }
        },1000)
    }


    utils.downTime();
    utils.lunbo();
    utils.changeOpacity();
})();