{
    //Promise就是个承诺
    /*现实生活中：
    我走到快餐店的柜台前，点了一个起士汉堡。并交了1.47美元的现金。通过点餐和付款，我为得到一个 值（起士汉堡）制造了一个请求。我发起了一个事务。

但是通常来说，起士汉堡不会立即到我手中。收银员交给一些东西代替我的起士汉堡：一个带有点餐排队号的收据。这个点餐号是一个“我欠你”的许诺（Promise），它保证我最终会得到我的起士汉堡。

于是我就拿着我的收据和点餐号。我知道它代表我的 未来的起士汉堡，所以我无需再担心它——除了挨饿！

在我等待的时候，我可以做其他的事情，比如给我的朋友发微信说，“嘿，一块儿吃午餐吗？我要吃起士汉堡”。

我已经在用我的 未来的起士汉堡 进行推理了，即便它还没有到我手中。我的大脑可以这么做是因为它将点餐号作为起士汉堡的占位符号。这个占位符号实质上使这个值 与时间无关。它是一个 未来的值。

最终，我听到，“113号！”。于是我愉快地拿着收据走回柜台前。我把收据递给收银员，拿回我的起士汉堡。
    */

    var x, y = 2;

    console.log(x + y); // NaN  <-- 因为`x`还没有被赋值

}

{
    // Promise一般写法
    add(fetchX(), fetchY())
        .then(
        // 完成处理器
        function (sum) {
            console.log(sum);
        },
        // 拒绝处理器
        function (err) {
            console.error(err); // 倒霉！
        }
        );
}

{
    // 吞掉所有错误/异常,如果在Promise的创建过程中的任意一点，或者在监听它的解析的过程中，
    //一个JS异常错误发生的话，比如TypeError或ReferenceError，这个异常将会被捕获，并且强制当前的Promise变为拒绝。

    var p = new Promise(function (resolve, reject) {
        foo.bar();	// `foo`没有定义，所以这是一个错误！
        resolve(42);	// 永远不会跑到这里 :(
    });

    p.then(
        function fulfilled() {
            // 永远不会跑到这里 :(
        },
        function rejected(err) {
            // `err`将是一个来自`foo.bar()`那一行的`TypeError`异常对象
        }
    );

    // 代码变成这样呢？
    var p = new Promise(function (resolve, reject) {
        resolve(42);
    });

    p.then(
        function fulfilled(msg) {
            foo.bar();
            console.log(msg);	// 永远不会跑到这里 :(
        },
        function rejected(err) {
            // 也永远不会跑到这里 :(
        }
    );
    /*
    等一下，这看起来foo.bar()发生的异常确实被吞掉了。不要害怕，它没有。但更深层次的东西出问题了，也就是我们没能成功地监听他。p.then(..)调用本身返回另一个promise，是 那个 promise将会被TypeError异常拒绝。
为什么它不能调用我们在这里定义的错误处理器呢？表面上看起来是一个符合逻辑的行为。但它会违反Promise一旦被解析就 不可变 的基本原则。p已经完成为值42，所以它不能因为在监听p的解析时发生了错误，而在稍后变成一个拒绝。

*/
}

{
    //可信的Promise
    
}