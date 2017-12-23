'use strict';
function ajax(opts) {

    var xmlhttp = new XMLHttpRequest(); // 新建ajax请求，不兼容IE7以下
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if ((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp.status == 304) {
                var data = JSON.parse(xmlhttp.responseText);
                opts.success(data);  // callback
            }
            else {
                alert('出错啦');
            }
        }

        // 获取data键值对
        var dataSend = '';
        for (var key in opts.data) {
            dataSend += key + '=' + opts.data[key] + '&';
        }

        if (opts.method.toLowerCase() === 'get') {
            xmlhttp.open(opts.method, opts.url + '?' + dataSend, true);
            xmlhttp.send(null);
        }

        else if (opts.method.toLowerCase() === 'post') {
            xmlhttp.open(opts.method, opts.url, true);
            xmlhttp.setRequestHeader('ContentType', 'application/x-www-form-urlencoded');
            xmlhttp.send(JSON.stringify(dataSend));
        }

        else {
            console.log('不识别的方法' + opts.method);
        }
    }

}

// 封装hasClass, removeClass, addClass
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('\\b' + cls + '\\b'));
}

function addClass(ele, cls) {
    if (ele.length && ele.length > 0) {
        for (var i = 0; i < ele.length; i++) {
            singleAddClass(ele[i], cls);
        }
    } 
    
    else {
        singleAddClass(ele, cls);
    }
}

function removeClass(ele, cls) {
    if (ele.length && ele.length > 0) {
        for (var i = 0; i < ele.length; i++) {
            singleRemoveClass(ele[i], cls);
        }
    }

    else {
        singleAddClass(ele, cls);
    }
}

function singleAddClass(ele, cls) {
    if (hasClass(ele, cls)) return;
    ele.className += ' ' + cls; 
}

function singleRemoveClass(ele, cls) {
    ele.className = ele.className.replace(new RegExp('\\b' + cls + '\\b', 'g'), '');
}

// 判断用户输入的字符长度是否满足要求
function isValidLength(str, len1, len2) {
    // 把32bit编码的中文字符的一个汉字转为两个英文字符
    str = str.replace(/[xd800-xffff]/g, 'a');
    // 把16bit字符串中的一个汉字转为两个英文字符
    str = str.replace(/[\u4000-\u9fa5]/g, 'aa');
    if (len1 <= str.length && str.length <= len2) {
        return true;
    }
    return false;
};

// 表单字段的验证，支持非空、手机号、邮箱的判断
function validate(str, type) {
    // trim可以转换非字符串为字符串，及去除字符串的前后空格
    var str = str.trim();
    // 非空验证
    if ('require' === type) {
        return !!str;
    }

    // 用户名验证，3~10个字符，只能是字母、数字、下划线
    if ('username' === type) {
        return /^[A-Za-z_0-9]{3,10}$/.test(str);
    }

    // 密码验证，6-15个字符，至少包括大写，小写，下划线，数字两种 
    if ('password' === type) {
        if (str.length < 6 || str.length > 16) {
            return false;
        }

        // 包含上述四种以外的字符，返回false
        if (/[^A-Za-z_0-9]/.test(str)) {
            return false;
        }

        // 如果全为大写、小写、下划线、数字,false
        if (/(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(str)) {
            return false;
        }

        return true;
    }

    // 手机号验证
    if ('phone' === type) {
        return /^1\d{10}$/.test(str);
    }
    // 邮箱格式验证
    if ('email' === type) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(str);
    }
}


/**
 * 把那些在页面加载完毕时执行的函数创建为一个队列。
 * @param {object} func  在页面加载完毕时执行的函数的名字 
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
