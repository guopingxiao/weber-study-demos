{
  // 基本定义
  let ajax=function(callback){
    console.log('执行');
    // 模拟ajax
    setTimeout(function () {
      callback&&callback.call()
    }, 1000);
  };
  ajax(function(){
    console.log('timeout1');
  })
}

{
  let ajax=function(){
    console.log('执行2');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  ajax().then(function(){
    console.log('promise','timeout2');
  },function(){})
}

{
  let ajax=function(){
    console.log('执行3');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  ajax()
    .then(function(){
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 2000);
    });
  })
    .then(function(){
    console.log('timeout3');
  })
}

{
  let ajax=function(num){
    console.log('执行4');
    return new Promise(function(resolve,reject){
      if(num>5){
        resolve()
      }else{
        throw new Error('出错了')
      }
    })
  }

  ajax(6).then(function(){
    console.log('log',6);
  }).catch(function(err){
    console.log('catch',err);
  });

  ajax(3).then(function(){
    console.log('log',3);
  }).catch(function(err){
    console.log('catch',err);
  });
}

{
  //所有图片加载完，在做处理
  function loadImg(src){
    return new Promise((resolve, reject) =>{
      let img = document.createElement('img');
      img.src =src;
      img.onload = function(){
        resolve(img);
      };
      img.onerror = function(err){
        reject(err);
      }
    })
  }

  function showImgs(imgs){
    imgs.forEach(img => document.append(img));
  }
  // 多个promise合成一个大的promise，并返回新的promise,都完成才执行下一步
  Promise.all([
    loadImg('http://asdf'),
    loadImg('http://asdf'),
    loadImg('http://asdf')
  ]).then(showImgs());

  // 有一个完成了，就执行，不管其他的了
  Promise.race([
    loadImg('http://asdf'),
    loadImg('http://asdf'),
    loadImg('http://asdf')
  ]).then(showImgs());
}
