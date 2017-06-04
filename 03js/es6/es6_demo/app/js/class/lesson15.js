{
  // genertaor基本定义，有*，有yeild 语句，返回就是Iterator接口
  let tell=function* (){
    yield 'a';
    yield 'b';
    return 'c'
  };

  let k=tell();

  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
}

{
  // 与iterator关系
  let obj={};
  obj[Symbol.iterator]=function* (){
    yield 1;
    yield 2;
    yield 3;
  }

  for(let value of obj){
    console.log('value',value);
  }
}

{
  // 状态机
  let state=function* (){
    while(1){
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status=state();
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
  // 安心 写具体的抽奖逻辑，不关心抽奖次数
  let draw  = function(count){
    //具体的抽奖逻辑，怎么计算当前当前抽奖次数呢？
    console.info(`剩余${count}次`);
  }

  let residue = function (count) {
    while(count>0){
      count --;
      yield draw(count);
    }
  }
// 通过yeild 来控制抽奖的次数；
  let star = residue(5);
  let bnt = document.createElement('button');
  bnt.id = 'start';
  document.appendChild(bnt);
  document.getElementById('start').addEventListener('click',()=>{star.next()},false)
}

//因为http 是无状态的，所以要通过长轮询或者web socket去服务端取数据
// 长轮训，以前是通过定时器去取，现在通过generator优雅一点；
{
  let ajax = function* (){
    yield  new Promise(function(resolve,reject)=>{
      setTimeout(function(){
        resolve({code:0})
      },2000);
    })
  }
  // 拉取数据
  let pull = function(){
    let generator = ajax();
    let step = generator.next();
    step.value.then(function(data){
      if (d.code !== 0){
        setTimeout(function(){
          console.log('wait');
          pull();
        },1000)
      }else{
        console.info(data)
      }
    })
  }

  pull();
}
