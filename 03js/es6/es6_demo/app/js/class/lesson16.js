{
  let readonly=function(target,name,descriptor){
    descriptor.writable=false;
    return descriptor
  };

  class Test{
    @readonly
    time(){
      return '2017-03-11'
    }
  }

  let test=new Test();
  // 修饰器修饰后，把类的功能修改了，变成只读的了
  // test.time=function(){
  //   console.log('reset time');
  // };

  console.log(test.time());
}


{
  let typename=function(target,name,descriptor){
    target.myname='hello';
  }

  @typename
  class Test{

  }

  console.log('类修饰符',Test.myname);
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}

{
  //打点的修饰器，
  // 将埋点的信息抽离出来，更好的复用和维护性
  let log = (type)=>{
    return function(target,name,descriptor){
      let _src_method = descriptor.value;
      descriptor.value = (...arg) =>{
        _src_method.apply(target, arg);
        console.log(`log ${type}`);//埋点信息
      }
    }
  }


  class AD{
    @log('show')
    show(){
      console.log('ad is show');
    }
    @log('click')
    click(){
      console.log('ad is click');
    }
  }

  let ad = new AD();
  ad.show();// ad is show, log show ,先执行show,在执行埋点；
  ad.click();
}
