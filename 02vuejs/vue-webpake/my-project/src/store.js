/**
 * Created by gpxiao on 2016/8/8.
 */
const STORAGE_KEY = 'todos_vue';
export default{
  get(){
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY || '[]'));
  },
  set(item){
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(item));
  }
}
