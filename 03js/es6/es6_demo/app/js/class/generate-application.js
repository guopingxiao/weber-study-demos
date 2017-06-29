{
    /*
    1.异步操作的同步化
    */
    //ajax请求
    /* function* main() {
         var result = yield request("http://some.url");
         var resp = JSON.parse(result);
         console.log(resp.value);
     }
 
     function request(url) {
         makeAjaxCall(url, function (response) {
             it.next(response); //response会回传到yield语句
         });
     }
 
     var it = main();
     it.next();
 
     //同步读取文本
     function* numbers() {
         let file = new FileReader("numbers.txt");
         try {
             while (!file.eof) {
                 yield parseInt(file.readLine(), 10);
             }
         } finally {
             file.close();
         }
     }*/
}

{
    //流程控制
    let step1Func = () => {
        console.log('step1');
    };
    let step2Func = () => {
        console.log('step2');
    };
    let step3Func = () => {
        console.log('step3');
    };
    let steps = [step1Func, step2Func, step3Func];

    function* iterateSteps(steps) {
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            yield step();
        }
    }

    var a = iterateSteps(steps);
    a.next();
    a.next();
    a.next();
}

{
    // 7.错误捕获
    /*
    Generator 函数返回的遍历器对象，都有一个throw方法：

    - 可以在函数体外抛出错误，然后在 Generator 函数体内捕获，如果函数体内没有try...catch，则在函数体外的catch捕获。
    同样的体内的错误，如果没有体内catch,则可以在体外捕获。两者都没有，则报错，中断执行

    - throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。体内捕获不影响迭代器遍历；
        只要 Generator 函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历。

    - 体外的throw 抛出的错误只要捕获，也不影响迭代器遍历

    */
    var g = function* () {
        try {
            yield;
        } catch (e) {
            console.log('内部捕获', e);
        }
    };

    var i = g();
    i.next();

    try {
        i.throw('a');
        i.throw(new Error('出错了！'));
    } catch (e) {
        console.log('外部捕获', e);
    }
    // 内部捕获 a
    // 外部捕获 b
    /*上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的catch语句捕获。
    i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，
    所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。
    throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。*/


    var gen = function* gen() {
        try {
            yield console.log('a');
        } catch (e) {
            // ...
        }
        yield console.log('b');
        yield console.log('c');
    }

    var g = gen();
    g.next() // a
    g.throw() // b
    g.next() // c



    // throw命令与g.throw方法是无关的，两者互不影响。
    /*
         这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield表达式，可以只用一个try...catch代码块来捕获错误。
         如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部
         写一次catch语句就可以了。
     */
    var gen = function* gen() {
        yield console.log('hello');
        yield console.log('world');
    }

    var g = gen();
    g.next();

    try {
        throw new Error();
    } catch (e) {
        g.next();
    }
    // hello
    // world

    function* foo() {
        var x = yield 3;
        var y = x.toUpperCase();//数值是没有toUpperCase方法的，所以会抛出一个TypeError错误，被函数体外的catch捕获。
        yield y;
    }

    var it = foo();

    it.next(); // { value:3, done:false }

    try {
        it.next(42);
    } catch (err) {
        console.log(err);
    }

    //一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，
    //将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
}