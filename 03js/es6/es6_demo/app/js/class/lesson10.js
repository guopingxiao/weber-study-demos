{
  let list = new Set();
  list.add(5);
  list.add(7);

  console.log('size',list.size);//不是length
}
//也可以set数组
{
  let arr = [1,2,3,4,5];
  let list = new Set(arr);

  console.log('size',list.size);
}

//不能重复哦
{
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);//失效

  console.log('list',list);
// 去重，不做数据类型转换
  let arr=[1,2,3,1,'2'];
  let list2=new Set(arr);

  console.log('unique',list2);
}

{
  let arr=['add','delete','clear','has'];
  let list=new Set(arr);

  console.log('has',list.has('add'));
  console.log('delete',list.delete('add'),list);
  list.clear();
  console.log('list',list);
}

{
  let arr=['add','delete','clear','has'];
  let list=new Set(arr);

  for(let key of list.keys()){
    console.log('keys',key);
  }
  for(let value of list.values()){
    console.log('value',value);
  }
  for(let [key,value] of list.entries()){
    console.log('entries',key,value);
  }

  list.forEach(function(item){console.log(item);})
}


{
  let weakList=new WeakSet();

  let arg={};

  weakList.add(arg);

  // weakList.add(2);

  console.log('weakList',weakList);
}

{
  let map = new Map();
  let arr=['123'];

  map.set(arr,456);

  console.log('map',map,map.get(arr));
}

{
  let map = new Map([['a',123],['b',456]]);
  console.log('map args',map);
  console.log('size',map.size);
  console.log('delete',map.delete('a'),map);
  console.log('clear',map.clear(),map);
}

{
  let weakmap = new WeakMap();

  let o = {};
  weakmap.set(o, 123);
  console.log(weakmap.get(o));
}
{
//  数组和map对比：增删该查
  let map = new Map();
  let array = [];
  //增
  map.set('t', 1);
  array.push({t: 1});
  console.log('map-array:', map, array);

  //查
  let map_exist = map.has('t');
  let array_exist = array.find(item => item.t);
  console.log('map-array-exist:', map_exist, array_exist);

  //改
  map.set('t', 2);
  array.forEach(item =>item.t ? item.t = 2 : '');
  console.info('map-array-modify', map, array);

  //删
  map.delete('t');
  let index = array.findIndex(item =>item.t);
  array.splice(index, 1);
  console.info('map-array-delete', map, array);
}
{
  //  数组和set对比：增删该查
  let set = new Set();
  let array = [];
  //增
  set.add({t:1});
  array.push({t: 1});
  console.log('set-array:', set, array);

  //查
  let item = {t:1};//这里要先将{t:1}保存起来再查
  let set_exist = set.has(item);
  let array_exist = array.find(item => item.t);
  console.log('set-array-exist:', set_exist, array_exist);

  //改
  set.forEach(item =>item.t ? item.t = 2 : '');
  array.forEach(item =>item.t ? item.t = 2 : '');
  console.info('set-array-modify', map, array);

  //删
  set.forEach(item =>item.t ? set.delete(item):item);
  let index = array.findIndex(item =>item.t);
  array.splice(index, 1);
  console.info('map-array-delete', map, array);
}
{
  //  obj和set,map对比：增删该查
  let item = {t:1};
  let map = new Map();
  let set = new Set();

  //增
  map.set('t',1);
  set.add(item);
  obj['t'] = 1;
  console.log('map-set-obj:', map, set, obj);

  //查
  let map_exist = map.has('t');
  let set_exist = set.has(item);
  let obj_exist = 't'in obj;
  console.log('map-set-obj-exist:', map_exist, set_exist,obj_exist);

  //改
  map.set('t',2);
  item.t = 2;
  obj['t'] = 2;
  console.info('map-obj-set-modify',map,set,obj);

  //删
  map.delete('t');
  set.delete(item);
  delete obj['t'];
  console.info('map-set-obj-delete',map, set,obj);

  //优先使用map,如果对数据的唯一性有要求的，则考虑使用set, 放弃使用array和  obj;
}
