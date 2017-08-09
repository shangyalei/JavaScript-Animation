
/**
 * Created by think on 2017/6/29.
 */

//类库分为操作dom的常用方法，操作bom的常用方法，以及原型上扩展的方法


var dom=(function () {

    /**
     * 1.通过id获取元素
     * @param idStr {string} 元素的id名
     * @returns {Element}  返回id名为idStr的元素
     */
    function id(idStr){
        return document.getElementById(idStr);
    }


    /**
     * 2.获取标签为tagStr的元素
     * @param tagStr   {string} 元素的标签名
     * @returns {NodeList}  返回标签名为tagStr的元素集合
     */
    function tagName(tagStr){
        return document.getElementsByTagName(tagStr);
    }

    /**
     * 3.获取id名，为idStr元素下的所有标签名为tagStr的元素
     * @param idStr  {string}   元素的id名
     * @param tagStr  {string}  元素的标签名
     * @returns {NodeList}      返回标签名为tagStr的元素集合
     */
    function idTag(idStr,tagStr){
        return document.getElementById(idStr).getElementsByTagName(tagStr);
    }


    /**
     * 4.获取元素所有的哥哥元素
     * @param ele {object}  当前元素对象
     * @returns {Array}     返回一个哥哥元素组成的数组
     * 思路：
     * 编程里面常用的思想：假如它有
     * 往上找的判断条件是：元素是否有哥哥元素
     * 那么促使它往上查找的条件是：利用重复赋值会覆盖的性质
     */
    function prevSiblings(ele){
        var ary=[];
        var prev=ele.previousSibling;
        while(prev){
            if(prev.nodeType===1){
                ary.push(prev);
            }
            prev = prev.previousSibling;
        }
        return ary.length>0?ary.reverse():null;
    }

    /**
     * 5.获取所有的弟弟元素
     * @param ele {object}  但前元素
     * @returns {Array}  返回一个弟弟元素组成的数组
     * 思路：
     * 往下找的的条件是：nextSiblings 是否有弟弟元素
     * 促使他往下查找的条件是：利用重复赋值的会覆盖的性质
     * 结束的条件是next为false
     */
    function nextSiblings(ele){
        var ary = [];
        var next = ele.nextSibling;
        while(next){
            if(next.nodeType===1){
                ary.push(next);
            }
            next = next.nextSibling;
        }
        return ary.length>0?ary.reverse():null;
    }


    /**
     * 6.获取哥哥元素
     * @param ele {object} 当前元素对象
     * @returns {*} 返回当前元素的紧邻的哥哥元素
     * 思路：
     * 网上找，一旦找到nodeType===1的元素哥哥，就返回，并结束函数
     */
    function prev(ele){
        if(ele.previousElementSibling){
            return ele.previousElementSibling;
        }
        var prev=ele.previousSibling;
        while(prev){
            if(prev.nodeType===1){
                return prev;
            }
            prev=prev.previousSibling;
        }
        return null;
    }

    /**
     * 7.获取弟弟元素
     * @param ele {object}  当前元素对象
     * @returns {*} 返回当前元素的紧邻的弟弟元素
     * 思路：往下找，只有nodeType!===1的时候发生覆盖
     * 一旦nodeType===1了就返回
     */
    function next(ele) {
        if(ele.nextElementSibling){
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while(next&&next.nodeType!==1){
            next = next.nextSibling;
        }
        return next;
    }

    /**
     * 8.获取所有的兄弟节点(不包含当前元素)
     * @param ele  {object} 当前元素
     * @returns {Array}  返回当前元素所有元素兄弟节点组成的数组
     * 思路：先获取父元素下的所有子元素，然后比较，放入数组
     */
    function siblings(ele){
        var ary=[];
        var eleAll=ele.parentNode.childNodes;
        for(var i=0;i<eleAll.length;i++){
            var curEle=eleAll[i];
            if(curEle.nodeType===1&&curEle!==ele){
                ary.push(curEle);
            }
        }
        return ary.length>0?ary:null;
    }


    /**
     * 9.获取当前元素的所有的子元素
     * @param ele {object}  当前元素
     * @returns {Array}   返回一个其子元素组成的数组
     * 思路：
     * 利用childNodes属性获取所有的子节点
     * 然后遍历这个子节点类数组，从中找出nodeType===1的子元素
     */
    function children(ele){
        var childNodes=ele.childNodes;
        var ary=[];
        for(var i=0;i<childNodes.length;i++){
            var child=childNodes[i];
            if(child.nodeType===1){
                ary.push(child);
            }
        }
        return ary.length>0?ary:null;
    }

    /**
     * 10.获取指定标签名的元素或者后去所有的子元素
     * 第二个参数是可选的，如果没传，则表示获取所有子元素
     * 若传了第二个参数，则表示获取指定标签名的子元素
     * @param ele   {object}   当前元素
     * @param tagName {string}  要获取元素的标签名
     * @returns {Array}
     * 思路：
     * 先获取所有的子元素节点childNodes
     * 然后要是获取的是素有的子元素，遍历找出nodeType===1的元素即可
     * 若找的是指定标签名的元素，则也是遍历，只不过要比较tagName
     *
     */
    function child(ele,tagName){
        var childNodes=ele.childNodes;
        var ary=[];
        if(typeof tagName==="undefined"){
            for(var i=0;i<childNodes.length;i++){
                var child=childNodes[i];
                if(child.nodeType===1){
                    ary.push(child);
                }
            }
        }else if(typeof tagName==='string'){
            for(var j=0;j<childNodes.length;j++){
                var cur = childNodes[j];
                tagName=tagName.toUpperCase();
                if(cur.nodeType===1&&cur.tagName===tagName){
                    ary.push(cur);
                }
            }
        }else{
            throw new Error('第二个参数错误！');
        }

        return ary.length>0?ary:null;
    }


    /**
     * 11.获取当前元素的索引值
     * @param ele   {object}    当前元素
     * @returns {number}    返回计数器的结果
     * 思路：
     * 利用寻找所有哥哥的方法来确定它的下标
     * 只不过返回的是计数器
     */
    function getIndex(ele){
        var n=0;
        var prev=ele.previousSibling;
        while(prev){
            if(prev.nodeType===1){
                n++;
            }
            prev=prev.previousSibling;
        }
        return n;
    }

    /**
     * 12.计算任意DOM元素距离文档左后上的绝对偏移量
     * @param ele   当前元素
     * @returns {{left: (Number|number), top: (Number|number)}}
     */
    function offset(ele){
        var l=ele.offsetLeft;
        var t=ele.offsetTop;
        var p=ele.offsetParent;
        while(p){
            if(window.navigator.userAgent.indexOf('MSIE 8') > -1){
                l+=p.offsetLeft;
                t+=p.offsetTop;
            }else{
                l+=p.offsetLeft+p.clientLeft;
                t+=p.offsetTop+p.clientTop;
            }
            p = p.offsetParent;
        }
        return {left:l,top:t}
    }


    /**
     * 13.获取第一个子元素元素
     * @param ele   {object} 当前元素
     * @returns {null}
     * 思路：利用前面学过的children方法获取到所有的子元素
     * 由于children方法返回的是一个数组，所以去第一项即可
     */
    function firstChild(ele){
        var children=this.children(ele);
        return children.length>0?children[0]:null;
    }


    /**
     * 14.获取素有元素的最后一个子元素
     * @param ele
     * @returns {null}
     * 思路：
     * 同样也是利用children方法
     */
    function lastChild(ele){
        var children=this.children(ele);
        return children.length>0?children[children.length-1]:null;
    }

    /**
     * 15.向指定容器的末尾追加元素
     * @param newEle    新元素
     * @param container 容器
     * 思路：利用appendChild属性
     */
    function insertBottom(newEle,container){
        container.appendChild(newEle);
    }


    /**
     * 16.向指定容器的开头追元素
     * @param newEle
     * @param container
     * 思路：
     * 先获取第一个子元素，若存在，插入到第一个的前面
     * 若不存在，则直接使用appendChild方法向容器内插入
     */
    function insertTop(newEle,container){
        var first=this.firstChild(container);
        if(first){
            container.insertBefore(newEle,first);
            return;
        }
        container.appendChild(newEle);

    }

    /**
     * 17.出入到指定元素的前面
     * @param newEle
     * @param oldEle
     */
    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }


    /**
     * 18.插入到指定元素的后面
     * @param newEle
     * @param oldEle
     */
    function insertAfter(newEle,oldEle){
        var nex = this.next(oldEle);
        if(next){
            oldEle.parentNode.insertBefore(newEle,nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }

    /**
     * 19.获取相邻的哥哥弟弟元素节点
     * @param ele
     * @returns {Array}
     * 思路：
     * 利用前面讲到的获取上一个哥哥和获取下一个弟弟的方法
     * 得到后都push到数组里面返回
     *
     */
    function closet(ele){
        var a=[];
        var prev=this.prev(ele);
        var next=this.next(ele);
        if(prev) a.push(prev);
        if(next) a.push(next);

        return a;
    }

    /**
     * 20.判断是不是第一个元素
     * @param ele
     * @returns {boolean}
     * 思路：如果它有哥哥，那它就不是第一个
     */
    function isFirstChild(ele){
        var res = this.prev(ele);
        if(res){
            return false
        }else{
            return true;
        }
    }

    /**
     * 21.判断是不是最后一个元素
     * @param ele
     * @returns {boolean}
     * 思路：如果它有弟弟，那它就不是第一个
     */
    function isLastChild(ele){
        return this.next(ele)?false:true;
    }


    /**
     * 22.通过单个类名获取元素
     * @param strClass  {string}  元素的类名
     * @returns {Array} 返回一个 相同类名元素组成数组
     * 思路：获取素有的标签，遍历所有的标签，匹配字符串
     */
    function getClass(strClass){
        var ele = document.getElementsByTagName("*");
        var reg = new RegExp("(?:^| )"+strClass+"(?: |$)");
        var ary=[];
        for(var i=0;i<ele.length;i++){
            var cur = ele[i];
            if(reg.test(cur.className)){
                ary.push(cur);
            }
        }
        return ary;
    }

    /**
     * 23.通过多个类名获取元素
     * @param strClass {string}  元素的类名
     * @param context  上下文对象
     * @returns {NodeList}  返回一个有相同类名的元素的数组
     * @constructor
     * 思路：
     * 先把参数类名，处理一下，去掉首尾空格，中间用空格隔开
     * 然后后去所用的标签，使用每一个标签的类名和参数类名进行一一匹配
     *
     */
    function getClassName(strClass,context){
        context=context||document;
        if(context.getElementsByClassName){
            return context.getElementsByClassName(strClass);
        }

        strClass=strClass.replace(/^ +| +$/g,"");
        var aClass=strClass.split(/ +/);

        var eleList = context.getElementsByTagName('*');
        for(var i=0;i<aClass.length;i++){
            var str=aClass[i];
            var reg = new RegExp("(?:^| )"+str+"(?: |$)");
            var ary=[];
            for(var j =0; j<eleList.length;j++){
                var curEle = ele[j];
                if(reg.test(curEle.className)){
                    ary.push(curEle);
                }
            }
            eleList=ary;
        }
        return eleList;
    }


    /**
     * 24.增加类名
     * @param ele {object} 要增加类名的元素
     * @param strClass   {string}  要增加的类名
     * 思路：
     * 先判断一个有没有这个类名，若没有添加
     */
    function addClass(ele,strClass){
        var reg = new RegExp("(?:^| )"+strClass+"(?: |^)");
        if(!reg.test(ele.className)){
            ele.className+=" "+strClass;
        }
    }

    /**
     * 25.删除类名
     * @param ele {object}   要删除类名的元素
     * @param strClass {string}  要删除的类的名字
     * 思路：用正则匹配到，然后用空格替换掉
     */
    function removeClass(ele,strClass){
        var reg = new RegExp("(?:^| )"+strClass+"( |$)","g");
        ele.className=ele.className.replace(reg," ");
    }


    /**
     * 26.判断是否有该类名
     * @param ele   {object}  要判断的元素
     * @param strClass  {string} 要判断的类名
     * @returns {boolean}
     *
     * 思路：用正则匹配类名
     */
    function hasClass(ele,strClass){
        var reg = new RegExp("(?:^| )"+strClass+"(?: |$)");
        return reg.test(ele.className);
    }

    /**
     * 27.获取css样式值，不带单位
     * @param ele  {object}  要获取样式的元素
     * @param attr {string}  要获取哪一种CSS属性的样式
     * @returns {Number}  返回属性值的数值
     *
     * 思路：注意浏览器的兼容性，重点处理不透明度opacity
     */
    function getCss(ele,attr){
        var val=null,reg=null;
        if('getComputedStyle' in window){
            val = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr==='opacity'){
                val=ele.currentStyle['filter'];
                reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)/i;
                val=reg.rest(val)?reg.exec(val)[1]/100:1;
            }else{
                val=ele.currentStyle[attr];
            }
        }

        reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)$/i;
        return reg.test(val)?parseFloat(val):val;
    }

    /**
     * 28.设置元素的样式，会设置在行内样式上
     * @param ele
     * @param attr
     * @param value
     */
    function setCss(ele,attr,value){
        if(attr==='float'){
            ele['style']['cssFloat']=value;
            ele['style']['styleFloat']=value;
            return;
        }
        if(attr==='opacity'){
            ele['style']['opacity']=value;
            ele['style']['filter']="alpha(opacity="+value*100+")";
            return;
        }
        var reg = /^(width|height|top|bottom|left|right|((margin|padding)|(Top|Bottom|Left|Right)?))$/;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value+="px";
            }
        }
        ele['style'][attr]=value;
    }


    /**
     * 29.批量设置Css属性
     * @param ele
     * @param complex
     */
    function setGroupCss(ele,complex){
        if(complex.toString()!=="[object Object]"){
            return;
        }
        for(var key in complex){
            if(complex.hasOwnProperty(key)){
                this.setCss(ele,key,complex[key]);
            }
        }
    }


    /**
     * 30.集成getCss,setCss,setGroupCss
     * @param ele
     * @returns {*}
     * 思路：两个参数是获取值，
     * 三个参数是设置值，
     * 若第二个参数是对象则为批量设置
     *
     */
    function css(ele){
        var argTwo = arguments[1];
        if (typeof argTwo === 'string') {
            if (typeof arguments[2] !== 'undefined') {
                this.setCss(ele, argTwo, arguments[2]);
                return;
            } else {
                return this.getCss(ele, argTwo);
            }
        }
        if (argTwo.toString() === '[object Object]') {
            this.setGroupCss(ele, argTwo);
        }
    }





    return{
        id:id,
        tagName:tagName,
        idTag:idTag,
        prevSiblings:prevSiblings,
        nextSiblings:nextSiblings,
        prev:prev,
        next:next,
        siblings:siblings,
        children:children,
        child:child,
        getIndex:getIndex,
        offset:offset,
        firstChild:firstChild,
        lastChild:lastChild,
        insertTop:insertTop,
        inertBottom:insertBottom,
        insertBefore:insertBefore,
        insertAfter:insertAfter,
        closet:closet,
        isFirstChild:isFirstChild,
        isLastChild:isLastChild,
        getClass:getClass,
        getClassName:getClassName,
        addClass:addClass,
        removeClass:removeClass,
        hasClass:hasClass,
        getCss:getCss,
        setCss:setCss,
        setGroupCss:setGroupCss,
        css:css
    }


})();


/**
 * 关于浏览器的方法
 * @type {{getWin}}
 */
var bom=(function(){

    /**
     * 1.获取浏览器可视区域的宽高
     * @param attr
     * @param value
     * @returns {*}
     */
    function win(attr,value){
        if(typeof value ==='undefined'){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }




    return {
        win:win
    }


})();

/**
 * 获取关于浏览器的一些属性、
 * 比如说浏览器的版本，浏览器的高宽、滚动条的位置等等
 * @type {{getWBox: BOM.getWBox, getBrowser: BOM.getBrowser, isIE: boolean, isIE6: boolean, isIE7: boolean, isIE8: boolean, isIE9: boolean, isIE10: boolean, isChrome: boolean, isOpera: boolean, isFirefox: boolean, isSafari: boolean}}
 *
 */
var BOM={
        getWBox:function (){
            var box={};
            box.h=document.documentElement.clientHeight||document.body.clientHeight;//浏览器窗口的高
            box.w=document.documentElement.clientWidth||document.body.clientWidth;//窗口的高
            box.scrollT=(document.documentElement.scrollTop||document.body.scrollTop);//滚动条的位置
            box.scrollL=(document.documentElement.scrollLeft||document.body.scrollLeft);//左边滚动条的位置
            box.centerL=box.w/2+box.scrollL;//窗口的中间
            box.centerT=box.h/2+box.scrollL;//窗口的中间
            return box;
        },

        getBrowser:function() {
            var ua = navigator.userAgent;
            var b;
            if(b = ua.match(/msie ([\d.]+)/i )){
                return "Internet Explorer " + b[1];
            }else if(b = ua.match(/firefox\/([\d.]+)/i)){
                return "Firefox "+ b[1];
            }else if(b = ua.match(/version\/([\d.]+).*safari/i)){
                return "Safari "+ b[1];
            }else if(b = ua.match(/opera.([\d.]+)/i)){
                return "Opera " + b[1];
            }else if(b = ua.match(/chrome\/([\d.]+)/i)) {
                return "Chrome "  + b[1];
            }
        },
        isIE:false,isIE6:false,isIE7:false,isIE8:false,isIE9:false,isIE10:false,isChrome:false,isOpera:false,isFirefox:false,isSafari:false

    }
;(function(){
    var ua = navigator.userAgent;
    var b;
    if(b = ua.match(/msie ([\d.]+)/i)){
        BOM.isIE=true;
        BOM['isIE'+Number(b[1])]=true;
    }else if(b = ua.match(/firefox\/([\d.]+)/i)){
        BOM.isFirefox=true;
    }else if(b = ua.match(/version\/([\d.]+).*safari/i)){
        BOM.isSafri=true;
    }else if(b = ua.match(/opera.([\d.]+)/i)) {
        BOM.isOpera=true;
    }else if(b = ua.match(/chrome\/([\d.]+)/i)) {
        BOM.isChrome=true;
    }
})();


/**
 * 请编写一个JavaScript函数 parseQueryStr，
 * 它的用途是把URL参数解析为一个对象：
 * 用法如：var obj = parseQueryString(url);
 * 例如： www.zhufengpeixun.cn?course1=js&course=css;
 * 则obj的值为{course1:"js",course:"css"  }
 * 也就是说这个方法是解析URL字符串的
 * @param str
 * @returns {{}}
 */
BOM.parseQueryStr=function (str){
    var tempa=null;//存放临时匹配到的字符串的那个临时数组

    //定义一个取每一对值的正则，
    // 把满足要求的内容分别定义成两个分组。
    // 匹配到的内容不到包括=?&这三个字符既可
    var reg=/([^=?&]+)=([^=?&]+)/g;
    var obj={};
    while( tempa=reg.exec(str)){//把exec的返回值赋给这个tempa,如果tempa不是null，则exec会执行多次。
        //tempa是一个数组，这个数组的长度是reg中匹配到的子表达式（分组）的个数加1
        //tempa的第0项是整个正则匹配到的内容，所以从索引1开始
        obj[tempa[1]]=tempa[2];
    }
    return obj;
};









/**
 * 常用工具函数
 * @type {{domArray, toJSON}}
 */
var utils=(function(){

    /**
     * 1.类数组转化为数组
     * @param ele  类数组对象  也就是元素的集合
     * @returns {*|Array}
     * 利用call借用数组的slice方法
     * 如果不支持，遍历类数组，把它放到数组里面
     */
    function domToArray(ele){
        try{
            var ary=[].slice.call(ele,0);
        }catch(e){
            var ary=[];
            for(var i=0;i<ele.length;i++){
                ary.push(eles[i]);
            }
        }
        return ary;
    }


    /**
     * 2.后台数据字符串转化为Object
     * @param str
     * @returns {Object}
     */
    function toJSON(str){
        try{
            return JSON.parse(str);
        }catch(e){
            return eval("("+str+")");
        }
    }



    return {
        domToArray:domToArray,
        toJSON:toJSON
    }

})();


/**
 * 字符串原型扩展方法：去除字符串首尾空格
 * 原型上扩展的方法可以用字符串直接调用
 * @returns {string}  返回一个去掉首尾看空格的字符串
 */
String.prototype.trim=function(){
    var reg=/^\s+|\s+$/g;
    return this.replace(reg,'');
};

/**
 * 给数组原型上扩展一个去掉重复项的方法
 * @returns {Array}
 */
Array.prototype.distinct=function (){
    var a=this;
    for(var nIndex=0;nIndex<a.length-1;nIndex++){
        for(var i=nIndex+1;i<a.length;){
            if(a[nIndex]===a[i]){
                a.splice(i,1);
            }else{
                i++;
            }
        }
    }
    return a;

};























