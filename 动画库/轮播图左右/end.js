/**
 * Created by think on 2017/7/11.
 */


function addClass(ele,strClass) {
    var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
    if(!reg.test(ele.className)){
        ele.className+=" "+strClass;
    }
}

function removeClass(ele,strClass){
    var reg = new RegExp("(?:^| )"+strClass+"(?: |$)","g");
    ele.className=ele.className.replace(reg,"");
}


function getCss(ele, attr) {
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
}

function setCss(ele, attr, value) {
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

}

function setGroupCss(ele, complex) {
    if (complex.toString() !== "[object Object]") {
        return;
    }
    for (var key in complex) {
        if (complex.hasOwnProperty(key)) {
            setCss(ele, key, complex[key]);
        }
    }
}

function css(ele) {
    var argTwo = arguments[1];
    if (typeof argTwo === 'string') {
        if (typeof arguments[2] !== 'undefined') {
            setCss(ele, argTwo, arguments[2]);
            return;
        } else {
            return getCss(ele, argTwo);
        }
    }
    if (argTwo.toString() === '[object Object]') {
        setGroupCss(ele, argTwo);
    }
}


function linear(times, begin, change, duration) {
    return times / duration * change + begin;
}


function move(ele, target, duration, effect, callback) {
    clearInterval(ele.timer);
    var times = null;
    var begin = {};
    var change = {};
    duration = duration || 3000;
    for (var attr in target) {
        if (target.hasOwnProperty(attr)) {
            begin[attr] = css(ele, attr);
            change[attr] = target[attr] - begin[attr];
        }
    }

    ele.timer = setInterval(function () {
        times += 10;
        if (times >= duration) {
            css(ele, target);
            clearInterval(ele.timer);
            callback && callback.call(ele);
            return;
        }

        for (var attr in change) {
            var curPos = effect(times, begin[attr], change[attr], duration);
            css(ele, attr, curPos);
        }
    }, 10);

}

window.animate = move;





