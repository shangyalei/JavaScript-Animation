/**
 * Created by think on 2017/7/12.
 */




(function () {
    var dom = {
        addClass: function (ele, strClass) {
            var reg = new RegExp("(?:^| )" + strClass + "(?: |$)");
            if (!reg.test(ele.className)) {
                ele.className += " " + strClass;
            }
        },
        removeClass: function (ele, strClass) {
            var reg = new RegExp("(?:^| )" + strClass + "(?: |$)", "g");
            ele.className = ele.className.replace(reg, "");
        },
        getCss: function (ele, attr) {
            var val = null, reg = null;
            if ("getComputedStyle" in window) {
                val = window.getComputedStyle(ele, null)[attr];
            } else {
                if (attr === 'opacity') {
                    val = ele.currentStyle['filter'];
                    reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                    val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                } else {
                    val = ele.currentStyle[attr];
                }
            }

            reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)$/i;
            return reg.test(val) ? parseFloat(val) : val;
        },

        setCss: function (ele, attr, value) {
            if (attr === 'float') {
                ele['style']['cssFloat'] = value;
                ele['style']['styleFloat'] = value;
            }
            if (attr === 'opacity') {
                ele['style']['opacity'] = value;
                ele['style']['filter'] = 'alpha(opacity=' + value + ")";
            }

            var reg = /(width|height|bottom|left|right|top|((margin|padding)(Left|Right|Top|Bottom)?))/;
            if (reg.test(attr)) {
                if (!isNaN(value)) {
                    value += "px";
                }
            }

            ele['style'][attr] = value;

        },
        setGroupCss: function (ele, complex) {
            if (complex.toString() !== "[object Object]") {
                return;
            }
            for (var key in complex) {
                if (complex.hasOwnProperty(key)) {
                    dom.setCss(ele, key, complex[key]);
                }
            }
        },

        css: function (ele) {
            var argTwo = arguments[1];
            if (typeof argTwo === 'string') {
                if (typeof arguments[2] !== 'undefined') {
                    dom.setCss(ele, argTwo, arguments[2]);
                    return;
                } else {
                    return dom.getCss(ele, argTwo);
                }
            }
            if (argTwo.toString() === '[object Object]') {
                dom.setGroupCss(ele, argTwo);
            }
        },
        siblings:function(ele){
            var ary=[];
            var prev=ele.previousSibling;
            var next=ele.nextSibling;
            while(prev){
                if(prev.nodeType===1){
                    ary.push(prev);
                }
                prev=prev.previousSibling;
            }
            while(next){
                if(next.nodeType===1){
                    ary.push(next);
                }
                next=next.nextSibling;
            }
            return ary.length?ary:null;

        }


    };



    var effect = {
        linear: function (t, b, c, d) {
            return t / d * c + b;
        }
    };

    /**
     * move方法实现多方向运动动画
     * @param ele  {object}  当前要操作运动的元素
     * @param target {object} 当前动画的目标位置，存储着每一个方向的目标位置
     * @param duration  {Number} 当前动画运动的总时间
     * @param callback  {Function}  档动画运动结束后要做的事情
     */
    function move(ele, target, duration, callback) {


        //在每一次执行方法之前首先把当前元素之前正在运行的动画结束掉
        window.clearInterval(ele.timer);

        //根据target获取每一个方向的起始值begin和总距离change
        var begin = {}, change = {};
        //遍历目标值,只遍历私有的，不遍历原型上的属性
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = dom.css(ele, key);
                change[key] = target[key] - begin[key];
            }
        }
        //当前运动多长时间了
        var time = 0;
        //实现多方向运动的动画
        ele.timer = window.setInterval(function () {
            time += 10;
            //到达目标，结束动画，让当前元素的样式等于目标值的样式
            if (time >= duration) {
                dom.css(ele, target);
                window.clearInterval(ele.timer);
                //在动画结束后有回调函数就执行 左边为真，右边才执行
                callback && callback.call(ele);
                return;
            }

            //未到达目标：分别获取每一个方向的当前位置，给当前位置设置样式即可

            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = effect.linear(time, begin[key], change[key], duration);
                    dom.css(ele, key, curPos);
                }
            }

        }, 10);

    }

    window.animate = move;



})();