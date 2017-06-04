import $ from 'jquery';

class Interface{
  /** 没有声明一些属性时，可以不用构造函数，
   * 箭头函数的this指向，是在定义的时候，而不是运行时，直接在外面通过闭包的形式，在外面声明了this的引用；
   * 1.通过Promise解决异步的问题，实例化后，直接到时候实例.getOmit.then()就行;
   * 2.self.setOpenCode(res.data);可以直接拿到数据；
   * [getOmit 获取遗漏数据]
   * @param  {string} issue [当前期号]//每次开奖都涉及到期号
   * @return {[type]}       [description]
   */
  getOmit(issue){
    let self=this;
    //创建一个Promise的ajax请求
    return new Promise((resolve,reject)=>{
      $.ajax({
        url:'/get/omit',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          self.setOmit(res.data);//做一个桥梁，以免别的地方可以取到
          resolve.call(self,res);//保证then()可以拿到数据resolve(res)
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }
  /**
   * [getOpenCode 获取开奖号码]
   * @param  {string} issue [期号]
   * @return {[type]}       [description]
   */
  getOpenCode(issue){
    let self=this;
    return new Promise((resolve,rejet)=>{
      $.ajax({
        url:'/get/opencode',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          self.setOpenCode(res.data);
          resolve.call(self,res);
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }

  /**
   * [getState 获取当前状态]
   * @param  {string} issue [当前期号]
   * @return {[type]}       [description]
   */
  getState(issue){
    let self=this;
    return new Promise((resolve,rejet)=>{
      $.ajax({
        url:'/get/state',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          resolve.call(self,res);
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }
}

export default Interface
