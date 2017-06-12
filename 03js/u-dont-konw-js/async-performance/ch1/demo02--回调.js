{
    /*
     回调是最为常见的异步管理方式,
     // A和// B代表程序的前半部分（也就是 现在），// C标识了程序的后半部分,前半部分立即执行,后半部分在在未来某个时刻执行
    */
    // A
    ajax("..", function (...args) {
        // C
    });
    // B


    //产生的问题：顺序的大脑规划和JS代码中回调驱动的异步处理间的不匹配

    //回调的地域
    listen("click", function handler(evt) {
        setTimeout(function request() {
            ajax("http://some.url.1", function response(text) {
                if (text == "hello") {
                    handler();
                }
                else if (text == "world") {
                    request();
                }
            });
        }, 500);
    });

    // 稍微优雅，但是跳跃式的回调
    listen("click", handler);

    function handler() {
        setTimeout(request, 500);
    }

    function request() {
        ajax("http://some.url.1", response);
    }

    function response(text) {
        if (text == "hello") {
            handler();
        }
        else if (text == "world") {
            request();
        }
    }

    //回调的地域
    doA(function () {
        doB();

        doC(function () {
            doD();
        })

        doE();
    });

    doF();
}

{
    // 逃离回调的地狱

    //Promise风格 --- 进行毁掉函数的分离,error可选
    function success(data) {
        console.log(data);
    }

    function failure(err) {
        console.error(err);
    }

    ajax("http://some.url.1", success, failure);

    // node 风格  -- 先处理 error
    function response(err, data) {
        // 有错？
        if (err) {
            console.error(err);
        }
        // 否则，认为成功
        else {
            console.log(data);
        }
    }

    ajax("http://some.url.1", response);



}