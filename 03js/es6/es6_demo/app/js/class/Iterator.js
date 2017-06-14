{
  //在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。
  //其他数据结构（主要是对象）的Iterator接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。
  /*
  Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，
  就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，
  这是一个预定义好的、类型为Symbol的特殊值，所以要放在方括号内。*/

  //变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面
  let arr = ['a', 'b', 'c'];
  let iter = arr[Symbol.iterator]();

  iter.next() // { value: 'a', done: false }
  iter.next() // { value: 'b', done: false }
  iter.next() // { value: 'c', done: false }
  iter.next() // { value: undefined, done: true }
}



{
  /*
    使用场景：1.解构 2. 扩展符 3. yield 4. ger

  */
  let set = new Set().add('a').add('b').add('c');

  let [x, y] = set;
  // x='a'; y='b'

  let [first, ...rest] = set;
  // first='a'; rest=['b','c'];

  let arr = ['b', 'c'];
  ['a', ...arr, 'd']
}

{
  //3. yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
  let generator = function* () {
    yield 1;
    yield* [2, 3, 4];
    yield 5;
  };

  var iterator = generator();

  iterator.next() // { value: 1, done: false }
  iterator.next() // { value: 2, done: false }
  iterator.next() // { value: 3, done: false }
  iterator.next() // { value: 4, done: false }
  iterator.next() // { value: 5, done: false }
  iterator.next() // { value: undefined, done: true }
}

{
  // 4. 与iterator关系，凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。
  //或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）
  let obj = {};
  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  [...obj]; // [1, 2, 3]
  for (let value of obj) {
    console.log('value', value);
  }
  // 或者简洁的写法
  let obj1 = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj1) {
  console.log(x);
}
}














{
  let obj = {
    start: [1, 3, 2],
    end: [7, 9, 8],
    [Symbol.iterator]() {
      let self = this;
      let index = 0;
      let arr = self.start.concat(self.end);
      let len = arr.length;
      return {
        next() {
          if (index < len) {
            return {
              value: arr[index++],
              done: false
            }
          } else {
            return {
              value: arr[index++],
              done: true
            }
          }
        }
      }
    }
  }
  for (let key of obj) {
    console.log(key);
  }
}

{
  let arr = ['hello', 'world'];
  for (let value of arr) {
    console.log('value', value);
  }
}
