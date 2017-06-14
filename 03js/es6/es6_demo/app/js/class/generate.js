{
  // genertaor基本定义，有*，有yeild 语句， return 语句(结束执行)。返回就是Iterator接口，调用next()，是一个状态机，封装了多个内部状态，
  //执行 Generator 函数会返回一个遍历器对象，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
  let tell = function* () {
    yield 'a';
    yield 'b';
    return 'c'
  };

  let k = tell();

  //next方法返回一个对象，它的value属性就是当前yield表达式的值，内部状态的值。done属性的值false，表示遍历还没有结束。
  //done属性的值true，表示遍历已经结束。有return时，有值 done:true, 没有return,undefined,done:true

  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
}

{
  // 与iterator关系，凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。
  //或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）
  let obj = {};
  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  }

  for (let value of obj) {
    console.log('value', value);
  }
}

//Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
{
  function* f() {
    console.log('执行了！')
  }

  var generator = f();

  setTimeout(function () {
    generator.next()
  }, 2000);
}

{
  // 状态机
  let state = function* () {
    while (1) {
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status = state();
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}

// { * 换成 async ，yeild 换成 await 上面就是语法糖
//   let state=async function (){
//     while(1){
//       await 'A';
//       await 'B';
//       await 'C';
//     }
//   }
//   let status=state();
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
// }

{
  //yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

  function* f() {
    for (var i = 0; true; i++) {
      var reset = yield i;
      if (reset) { i = -1; }
    }
  }

  var g = f();

  g.next() // { value: 0, done: false }
  g.next() // { value: 1, done: false }
  g.next(true) // { value: 0, done: false }

  /*上面代码先定义了一个可以无限运行的 Generator 函数f，如果next方法没有参数，每次运行到yield表达式，
  变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），
  因此i会等于 - 1，下一轮循环就会从 - 1开始递增。

  这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
  通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，
  可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。*/
}

{
  /*
    generator 函数与普通函数不同，只定义遍历器，而不会执行，每次调用这个遍历器的next方法，
    就从函数体的头部或者上一次停下来的地方开始执行，直到遇到下一个yield语句为止。
  
  yield语句就是暂停标志，next方法遇到yield，就会暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，
  作为返回对象的value属性的值。当下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
  如果没有再遇到新的yield语句，就一直运行到函数结束，将return语句后面的表达式的值，作为value属性的值，
  如果该函数没有return语句，则value属性的值为undefined。

  当第一次调用 sum.next() 时 返回的a变量值是5 + 3，
  同理第二次调用 sum.next() ，a变量值是8 +3，知道循环执行结束，返回done:true标识。
  注意：这里没有返回值，区别下面的例子
  */

    var r = 3;

    function* infinite_ap(a) {
      for (var i = 0; i < 3; i++) {
        a = a + r;
        yield a;
      }
    }

    var sum = infinite_ap(5);

    console.log(sum.next()); // returns { value : 8, done : false }
    console.log(sum.next()); // returns { value : 11, done: false }
    console.log(sum.next()); // returns { value : 14, done: false }
    console.log(sum.next()); //return { value: undefined, done: true }
}

{
  //next 传参数，next()没有参数时，返回值为undefined，next(12)参数时，参数为上一个yield的返回结果。

  function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
  }

  var a = foo(5);
  a.next() // Object{value:6, done:false}
  a.next() // Object{value:NaN, done:false}
  a.next() // Object{value:NaN, done:true}

  var b = foo(5);
  b.next() // { value:6, done:false }
  b.next(12) // { value:8, done:false }
  b.next(13) // { value:42, done:true }

  /*
  上面代码中，第二次运行next方法的时候不带参数，导致y的值等于2 * undefined（即NaN），除以3以后还是NaN，
  因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，
  返回对象的value属性等于5 + NaN + undefined，即NaN。

如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；
第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，
将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

注意，由于next方法的参数表示上一个yield表达式的返回值，所以第一次使用next方法时，不能带有参数。
V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，
第一个next方法用来启动遍历器对象，所以不用带有参数。
  */
}
{
  // 安心 写具体的抽奖逻辑，不关心抽奖次数
  let draw = function (count) {
    //具体的抽奖逻辑，怎么计算当前当前抽奖次数呢？
    console.info(`剩余${count}次`);
  }

  let residue = function* (count) {
    while (count > 0) {
      count--;
      yield draw(count);
    }
  }
  // 通过yeild 来控制抽奖的次数；
  let star = residue(5);
  let bnt = document.createElement('button');
  bnt.id = 'start';
  document.appendChild(bnt);
  document.getElementById('start').addEventListener('click', () => { star.next() }, false)
}

//因为http 是无状态的，所以要通过长轮询或者web socket去服务端取数据
// 长轮训，以前是通过定时器去取，现在通过generator优雅一点；
{
  let ajax = function* () {
    yield new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({ code: 0 })
      }, 2000);
    });
  }
  // 拉取数据
  let pull = function () {
    let generator = ajax();
    let step = generator.next();
    step.value.then(function (data) {
      if (data.code !== 0) {
        setTimeout(function () {
          console.log('wait');
          pull();
        }, 1000)
      } else {
        console.info(data)
      }
    })
  }
  pull();
}
