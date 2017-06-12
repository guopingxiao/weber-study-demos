{
    // ajax(..)是某个包中任意的Ajax函数
    var data = ajax("http://some.url.1");
    console.log(data);
    // 噢！`data`一般不会有Ajax的结果,这样是拿不到数据的
}
{
    // ajax(..) 是某个包中任意的Ajax函数，一般是通过回调
    ajax("http://some.url.1", function myCallbackFunction(data) {
        console.log(data); // Yay, 我得到了一些`data`!
    });
}
{
    //常见的异步：定时器，鼠标点击等交互行为，Ajax应答等等，console.*有时候由于I/O的阻塞也是不安全的，可以断点或者JSON.stringify(..)获得快照
    function now() {
        return 21;
    }

    function later() {
        answer = answer * 2;
        console.log("Meaning of life:", answer);
    }

    var answer = now();

    setTimeout(later, 1000);// 1s后执行later，得到42

}
{
    /*
      应为js是单线程的，所以不可能共享数据，所有事件是顺序执行的，线程不可能被打乱，==》 事件轮询：
      所有的回调函数都会被放在事件轮询队列上，setTimeout()会在等待设定时间后，被放到事件轮询队列中，所以不准，Promises对这个做出了改变；
    */

    //异步带来的不确定性；但是有了generate之后，有了更多的可能结果；
    var a = 1;
    var b = 2;

    function foo() {
        a++;
        b = b * a;
        a = b + 3;
    }

    function bar() {
        b--;
        a = 8 + b;
        b = a * 2;
    }

    // ajax(..) 是某个包中任意的Ajax函数
    ajax("http://some.url.1", foo);
    ajax("http://some.url.2", bar);
}
{
    //竞态
    //在同一个程序中两个或更多的“进程”在穿插它们的步骤/事件时，如果它们的任务之间没有联系，那么他们就没必要互动。

    //如果它们不互动，不确定性就是完全可以接受的。


    // 鼠标滚轮无线加载实例：
    /*onscroll, request 1   < --- 进程1开始
    onscroll, request 2
    response 1            < --- 进程2开始
    onscroll, request 3
    response 2
    response 3
    onscroll, request 4
    onscroll, request 5
    onscroll, request 6
    response 4
    onscroll, request 7   < --- 进程1结束
    response 6
    response 5
    response 7            < --- 进程2结束*/


}
{
    //互动
    //这样的代码是有危险的
    var res = [];

    function response(data) {
        res.push(data);
    }

    // ajax(..) 是某个包中任意的Ajax函数
    ajax("http://some.url.1", response);
    ajax("http://some.url.2", response);

    //改进
    var res = [];

    function response(data) {
        if (data.url == "http://some.url.1") {
            res[0] = data;
        }
        else if (data.url == "http://some.url.2") {
            res[1] = data;
        }
    }

    // ajax(..) 是某个包中任意的Ajax函数
    ajax("http://some.url.1", response);
    ajax("http://some.url.2", response);


    //协作

    //在大数据的处理中，因为独占事件轮询，所以其他操作，有UI更新，甚至不能有用户事件比如滚动，打字，按钮点击等。非常痛苦。
    var res = [];

    // `response(..)`从Ajax调用收到一个结果数组
    function response(data) {
        // 连接到既存的`res`数组上
        res = res.concat(
            // 制造一个新的变形过的数组，所有的`data`值都翻倍
            data.map(function (val) {
                return val * 2;
            })
        );
    }

    // ajax(..) 是某个包中任意的Ajax函数
    ajax("http://some.url.1", response);
    ajax("http://some.url.2", response);

    
    
    // 改进， 每次只处理一批数据
    var res = [];

    // `response(..)`从Ajax调用收到一个结果数组
    function response(data) {
        // 我们一次只处理1000件
        var chunk = data.splice(0, 1000);

        // 连接到既存的`res`数组上
        res = res.concat(
            // 制造一个新的变形过的数组，所有的`data`值都翻倍
            chunk.map(function (val) {
                return val * 2;
            })
        );

        // 还有东西要处理吗？
        if (data.length > 0) {
            // 异步规划下一个批处理
            setTimeout(function () {
                response(data);
            }, 0);
        }
    }

    // ajax(..) 是某个包中任意的Ajax函数
    ajax("http://some.url.1", response);
    ajax("http://some.url.2", response);
    //保证每个“进程”都是短时间运行的,使用setTimeout(..0)（黑科技）来异步排程，基本上它的意思是“将这个函数贴在事件轮询队列的末尾”。


}