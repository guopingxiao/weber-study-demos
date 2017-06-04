class Timer{
  countdown(end,update,handle){
    const now=new Date().getTime();
    const self=this;
    if(now-end>0){
      handle.call(self);//倒计时结束时的回调
    }else{
      let last_time=end-now; //剩余时间
      const px_d=1000*60*60*24; //天
      const px_h=1000*60*60;//时
      const px_m=1000*60;//分
      const px_s=1000;//秒
      let d=Math.floor(last_time/px_d);
      let h=Math.floor((last_time-d*px_d)/px_h);
      let m=Math.floor((last_time-d*px_d-h*px_h)/px_m);
      let s=Math.floor((last_time-d*px_d-h*px_h-m*px_m)/px_s);
      let r=[];
      //es6的字符串模板
      if(d>0){
        r.push(`<em>${d}</em>天`);
      }
      if(r.length||(h>0)){
        r.push(`<em>${h}</em>时`);
      }
      if(r.length||m>0){
        r.push(`<em>${m}</em>分`);
      }
      if(r.length||s>0){
        r.push(`<em>${s}</em>秒`);
      }
      self.last_time=r.join('');// 数组转化为字符串
      update.call(self,r.join(''));
      setTimeout(function () {
        self.countdown(end,update,handle);
      }, 1000);
    }
  }
}

export default Timer
