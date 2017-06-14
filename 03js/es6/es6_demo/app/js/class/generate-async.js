{
    //1. 回调处理，
    fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
        if (err) throw err;
        console.log(data);
    });

    // 回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件
    fs.readFile(fileA, 'utf-8', function (err, data) {
        fs.readFile(fileB, 'utf-8', function (err, data) {
            // ...
        });
    });

    // 2.Promise 写法改进

    /*
    不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。
    Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。
    Promise 的最大问题是代码冗余，原来的任务被 Promise 包装了一下，不管什么操作，一眼看去都是一堆then，原来的语义变得很不清楚。
    */
    var readFile = require('fs-readfile-promise');

    readFile(fileA)
        .then(function (data) {
            console.log(data.toString());
        })
        .then(function () {
            return readFile(fileB);
        })
        .then(function (data) {
            console.log(data.toString());
        })
        .catch(function (err) {
            console.log(err);
        });


    //3. yield 与协程
    function* asyncJob() {
        // ...其他代码
        var f = yield readFile(fileA);
        // ...其他代码
    }
    /*
    上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。
    也就是说，yield命令是异步两个阶段的分界线。协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
    它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。
    */

    function* gen(x) {
        var y = yield x + 2;
        return y;
    }

    var g = gen(1); //返回一个遍历器generator
    g.next() // { value: 3, done: false }  第一次调用，执行到yield x+2 ,返回对象的value表示当前yield的表达式的值
    g.next() // { value: undefined, done: true }
    /*
    调用 Generator 函数，会返回一个内部指针（即遍历器）g。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，
    返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止。

    换言之，next方法的作用是分阶段执行Generator函数。每次调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。v
    alue属性是yield语句后面表达式的值，表示当前阶段的值；done属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。
    */
}
{
    //Generator 函数的数据输入输出，next返回值的value属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据。
    function* gen(x) {
        var y = yield x + 2;
        return y;
    }

    var g = gen(1);
    g.next() // { value: 3, done: false }
    g.next(2) // { value: 2, done: true }
}

{
    // 4. thunk 函数 和 thunkkfy 
    // 将所有带有回调函数的多参数函数，转换为只有带回调函数参数的单参数函数
    function f(a, cb) {
        cb(a);
    }
    const ft = Thunk(f);

    ft(1)(console.log) // 1


    function f(a, b, callback) {
        var sum = a + b;
        callback(sum);
        callback(sum);
    }

    var ft = thunkify(f);
    var print = console.log.bind(console);
    ft(1, 2)(print);
    // 3
}

{
    // 5. generator 函数流程管理（自动执行）

    function* gen() {
        yield 1;
        yield 2;
        yield 3;
    }

    var g = gen();
    var res = g.next();

    while (!res.done) {
        console.log(res.value);
        res = g.next();
    }

}

{
    //6. Thunk 函数的自动流程管理 
    function run(fn) {
        var gen = fn();

        function next(err, data) { // 内部的next函数就是 Thunk 的回调函数。
            var result = gen.next(data); //next函数先将指针移到 Generator 函数的下一步
            if (result.done) return;  //然后判断 Generator 函数是否结束
            result.value(next);       //就将next函数再传入 Thunk 函数
        }

        next();
    }

    var g = function* () { // 生成器每个yield都是Thunk()函数
        var f1 = yield readFile('fileA');
        var f2 = yield readFile('fileB');
        // ...
        var fn = yield readFile('fileN');
    };

    run(g);

    /*
    有了这个执行器，执行 Generator 函数方便多了。不管内部有多少个异步操作，直接把 Generator 函数传入run函数即可。
    当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在yield命令后面的必须是 Thunk 函数。

    上面代码中，函数g封装了n个异步的读取文件操作，只要执行run函数，这些操作就会自动完成。这样一来，异步操作不仅可以写得像同步操作，
    而且一行代码就可以执行。
    Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，
    接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。
    */
}


{
    //7.co 模块

    // 下面Generator 函数，用于依次读取两个文件。co模块可以让你不用编写Generator函数的执行器。只要传入co函数，就会自动执行。
    //var co = require('co');

    var gen1 = function* () {
        var f1 = yield readFile('/etc/fstab');
        var f2 = yield readFile('/etc/shells');
        console.log(f1.toString());
        console.log(f2.toString());
    };

    co(gen).then(function () {
        console.log('Generator 函数执行完成');
    });
    //上面代码中，等到 Generator 函数执行结束，就会输出一行提示。
}

{
    // 8.基于 Promise 对象的自动执行器。

    /*
    Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。两种方法可以做到这一点。
    （1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
     (2）Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。
     co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。
     使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数(4.0以后不行)或 Promise 对象。
     */
    // 

    var fs = require('fs');

    var readFile = function (fileName) {    //(1)首先，把fs模块的readFile方法包装成一个 Promise 对象。
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, function (error, data) {
                if (error) return reject(error);
                resolve(data);
            });
        });
    };

    var gen2 = function* () {
        var f1 = yield readFile('/etc/fstab');
        var f2 = yield readFile('/etc/shells');
        console.log(f1.toString());
        console.log(f2.toString());
    };

    var g = gen2();

    g.next().value.then(function (data) { //(2)手动执行上面的 Generator 函数。
        g.next(data).value.then(function (data) {
            g.next(data);
        });
    });

    //(3)手动执行其实就是用then方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。
    function run(gen) {
        var g = gen();

        function next(data) {  //只要 Generator 函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。
            var result = g.next(data);
            if (result.done) return result.value;
            result.value.then(function (data) {
                next(data);
            });
        }

        next();
    }

    run(gen);
}

{
    //9.co 源码解析
    function co(gen) {
        var ctx = this;//1.co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。

        return new Promise(function (resolve, reject) {


            if (typeof gen === 'function') gen = gen.call(ctx);//co 先检查参数gen是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；
            if (!gen || typeof gen.next !== 'function') return resolve(gen);// // 如果不是就返回，并将 Promise 对象的状态改为resolved。

            onFulfilled();
            //co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
            function onFulfilled(res) {
                var ret;
                try {
                    ret = gen.next(res);
                } catch (e) {
                    return reject(e);
                }
                next(ret);
            }
        });
    }

    function next(ret) {//最后，就是关键的next函数，它会反复调用自身。
        if (ret.done) return resolve(ret.value);  //(1)第一行，检查当前是否为 Generator 函数的最后一步，如果是就返回。
        var value = toPromise.call(ctx, ret.value); //(2)第二行，确保每一步的返回值，是 Promise 对象。
        if (value && isPromise(value)) return value.then(onFulfilled, onRejected);//(3)第三行，使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数。
        return onRejected( //(4)第四行，在参数不符合要求的情况下,报错，终止执行。
            new TypeError(
                'You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "'
                + String(ret.value)
                + '"'
            )
        );
    }
}

{
    // 10.处理并发的异步操作

    //co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
    //这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。

    // 数组的写法
    co(function* () {
        var res = yield [
            Promise.resolve(1),
            Promise.resolve(2)
        ];
        console.log(res);
    }).catch(onerror);

    // 对象的写法
    co(function* () {
        var res = yield {
            1: Promise.resolve(1),
            2: Promise.resolve(2),
        };
        console.log(res);
    }).catch(onerror);

    //下面是另一个例子。

    co(function* () {
        var values = [n1, n2, n3];
        yield values.map(somethingAsync);
    });

    function* somethingAsync(x) {
        // do something async
        return y
    }

    //上面的代码允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。

}

{
    // 11.处理 Stream

    /*
    Node 提供 Stream 模式读写数据，特点是一次只处理数据的一部分，数据分成一块块依次处理，就好像“数据流”一样。
    这对于处理大规模数据非常有利。Stream 模式使用 EventEmitter API，会释放三个事件。
        - data事件：下一块数据块已经准备好了。
        - end事件：整个“数据流”处理“完了。
        - error事件：发生错误。
    使用Promise.race()函数，可以判断这三个事件之中哪一个最先发生，只有当data事件最先发生时，才进入下一个数据块的处理。
    从而，我们可以通过一个while循环，完成所有数据的读取。
    */

    const co = require('co');
    const fs = require('fs');

    const stream = fs.createReadStream('./les_miserables.txt');
    let valjeanCount = 0;

    co(function* () {
        while (true) {
            const res = yield Promise.race([
                new Promise(resolve => stream.once('data', resolve)),
                new Promise(resolve => stream.once('end', resolve)),
                new Promise((resolve, reject) => stream.once('error', reject))
            ]);
            if (!res) {
                break;
            }
            stream.removeAllListeners('data');
            stream.removeAllListeners('end');
            stream.removeAllListeners('error');
            valjeanCount += (res.toString().match(/valjean/ig) || []).length;
        }
        console.log('count:', valjeanCount); // count: 1120
    });

    /*
    上面代码采用 Stream 模式读取《悲惨世界》的文本文件，对于每个数据块都使用stream.once方法，
    在data、end、error三个事件上添加一次性回调函数。变量res只有在data事件发生时才有值，
    然后累加每个数据块之中valjean这个词出现的次数。
    */
}