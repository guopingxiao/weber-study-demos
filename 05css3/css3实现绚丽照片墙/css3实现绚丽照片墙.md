主要给大家介绍几个css3比较绚丽和实用的动画属性，其中包括旋转、缩放等。课程实现的照片墙特效内容为：照片随意的摆放在页面的不同位置，并且都有不同角度的倾斜和相互遮挡，当鼠标移动到某一张照片上时，此照片缓慢的由倾斜状态转变为端正状态，并且放大一定比例显示在最上面，鼠标移走后，又恢复为原状态。此特效不使用任何javascript，而是用纯css实现。效果如下

![](http://i.imgur.com/k927XSP.gif)


## 需求分析

1. 用10张图片作为照片。
2. 照片以不同的位置和旋转角度随意摆放。
3. 鼠标移动到某一张照片上时，此照片由倾斜缓慢旋转成端正，并且放大显示在最上层。



## 要点分析

1. 每张照片的位置是不一样的
2. 每张照片有一定的倾斜角度
3. 照片能够缓慢的旋转
4. 照片能够缓慢的放大


## 技能要点

1. `box-shadow`：给元素的边框添加阴影的效果
2. `position`：给元素定位，主要用到绝对定位
3. `z-index`:设置元素的上下层显示
4. `transition`：设置元素由样式1转变为样式2的过程所需时间
5. `transform`：使元素变形的属性，其配合`rotate`(旋转角度)、`scale`(改变大小)、`skew`(扭曲元素)等参数一起使用


## 原理分析

（一）照片墙以一定倾斜角度随意摆放原理：

1. 使用绝对定位`position:absolute`将照片放在不同的位置
2. 使用css3属性`transform：rotate()`，将各个照片旋转不同的角度


（二）鼠标移到照片上，照片缓慢旋转并且放大的原理：

1.使用css3属性`transform：rotate(0deg)`，可以将倾斜的照片角度旋转为0，即把照片旋转端正。
2.使用css3属性`transform：scale()`，将照片放大一定比例。
3.使用css3属性`transition`，将以上的变化设置为在一定时间内完成，从而达到缓慢变化的效果。


（三）鼠标移到照片上照片显示在最上层的原理：

设置了绝对定位的元素可以通过z-index属性控制其显示的层次关系。将要显示在最上层的照片的`z-index`值设置得比其他照片大即可。


主要的两个部分就是

.container img{
	padding:10px 10px 15px; 
	background:white; 
	border:1px solid #ddd; 
	box-shadow:2px 2px 3px rgba(50, 50, 50, 0.4);
	-webkit-transition:all 0.5s ease-in;
	-moz-transition:all 0.5s ease-in;
	transition:all 0.5s ease-in; 
	position:absolute; 
	z-index:1;
}

.container img:hover{
	box-shadow:15px 15px 20px rgba(50, 50, 50, 0.4); 
	-webkit-transform:rotate(0deg) scale(1.20); 
	-moz-transform:rotate(0deg) scale(1.20); 
	transform:rotate(0deg) scale(1.20); 
	z-index:2;
}

## 附录：CSS3 transform是什么？

`transform`的含义是：改变，使…变形；转换

CSS3 transform都有哪些常用属性？

下面一张图说明问题

![](http://i.imgur.com/eYfWkX8.gif)

transform的属性包括：`rotate() / skew() / scale() / translate(,)` ，分别还有x、y之分，比如：`rotatex()` 和 `rotatey()` ，以此类推。

下面我们来分解各个属性的用法：

 **transform:rotate()：**

含义：旋转；其中“deg”是“度”的意思，如“10deg”表示“10度”下同。


.demo_transform1{-webkit-transform:rotate(10deg);
				-moz-transform:rotate(10deg)}

**transform:skew()：**

含义：倾斜；

.demo_transform2{-webkit-transform:skew(20deg);
-moz-transform:skew(20deg)}

**transform:scale()：**

含义：比例；“1.5”表示以1.5的比例放大，如果要放大2倍，须写成“2.0”，缩小则为负“-”。



.demo_transform3{-webkit-transform:scale(1.5);
		-moz-transform:scale(1.5)}

**transform:translate()：**

含义：变动，位移；如下表示向右位移120像素，如果向上位移，把后面的“0”改个值就行，向左向下位移则为负“-”。


.demo_transform4{
-webkit-transform:translate(120px,0);
-moz-transform:translate(120px,0)
}

**transform综合：**

transform的常用属性就是这些了，下面我们借助transition的帮忙来演示一个关于css3 transform的综合实例：


.demo_transform5{
-webkit-transition:all 1s ease-in-out;
-moz-transition:all 1s ease-in-out
}
.demo_transform5:hover{
-webkit-transform:rotate(360deg) skew(-20deg)  scale(3.0)  translate(100px,0);
-moz-transform:rotate(360deg) skew(-20deg)scale(3.0) translate(100px,0)；
}

**transform属性要是加上transition的过渡特性，那可就是如虎添翼，樱木花道配上流川枫啊，可以产生不少美妙的火花**

CSS3 transition属性其作用是：平滑的改变CSS的值。无论是点击事件，焦点事件，还是鼠标hover，只要值改变了，就是平滑的，就是动画。于是乎，只要一个整站通用的class，就可以很轻松的渐进增强地实现动画效果，超有实用价值的说。

##话说Transitions这厮

ransition有下面些具体属性：

> transition-property :* //指定过渡的性质，比如transition-property:backgrond 就是指backgound参与这个过渡
> transition-duration:*//指定这个过渡的持续时间
> transition-delay:* //延迟过渡时间
> transition-timing-function:*//指定过渡类型，有ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier

例如下面这个很简单的例子：

.trans {
    -webkit-transition-property: background-color;
    -webkit-transition-duration: 0.3s;
    -webkit-transition-timing-function: ease;
}
.trans:hover {
    background-color: #486AAA;
    color: #fff;
}

##Animation属性介绍

Animation属性是一个简写属性，用于设置六个动画属性：

**两个必要属性：**

	1、animation-name     动画名称（关键帧名称）
	2、animation-duration 动画持续时间
**其他属性值：**
	
	3、animation-timing-function 动画运动形式
	4、animation-delay 动画延迟
	5、animation-iteration-count 重复次数
	6、animation-direction 动画的播放方向
	7、animation-play-state 播放状态（ running 播放 和paused 暂停 ），可以用来控制动画暂停。
**参数语法：**

1、animation-name: IDENT; 

此处的IDENT要和Keyframes中的IDENT一致，如果不一致,将不能实现任何动画效果；none为默认值，当值为none时，将没有任何动画效果。

2、animation-duration: time;

animation-duration动画所持续的时间长，取值:<time>为数值，单位为s （秒.）其默认值为“0”。
 
3、animation-timing-function: ease;ease-in;ease-in-out;linear;cubic-bezier

动画的运动形式。具有以下六种变换方式：ease/ease-in/ease-in-out/linear/cubic-bezier。

4、animation-delay:time;

动画开始（延迟）时间。取值为<time>为数值，单位为s(秒)，其默认值也是0。

5、animation-iteration-count: infinite/number；

动画的循环次数，其可以取值<number>为数字，其默认值为“1”；infinite为无限次数循环。

6、animation-direction: normal /alternate

动画播放的方向，其只有两个值，默认值为normal，如果设置为normal时，动画的每次循环都是向前播放；另一个值是alternate，他的作用是，动画播放在第偶数次向前播放，第奇数次向反方向播放。

7、animation-play-state: running/paused

主要是用来控制元素动画的播放状态。其主要有两个值，running（播放）和paused（暂停）其中running为默认值。这个属性目前很少内核支持。

	简写语法： animation: myani 1s ease 2 alternate 1s both;
	参数意义： 名称 缓动时间 缓动形式 轮播几次  交替轮播  延迟播放时间  停止播放 


举个例子

	@-webkit-keyframes resize {
	    0% {
	        padding: 0;
	    }
	    50% {
	        padding: 0 20px;
	        background-color:rgba(190, 206, 235, 0.2);        
	    }
	    100% {
	        padding: 0 100px;
	        background-color:rgba(190, 206, 235, 0.9);
	    }
	}
	.anim_box:hover {
	    -webkit-animation-name: resize;
	    -webkit-animation-duration: 1.5s;
	    -webkit-animation-iteration-count: 4;
	    -webkit-animation-direction: alternate;
	    -webkit-animation-timing-function: ease-in-out;
	}
## CSS animation 与 CSS transition 有何区别

Transition作用是指定了某一个属性（如width、left、transform等）在两个值之间如何过渡，他包括transition-property、transition-duration、transition-timing-function、transition-delay等。

如果某一个元素指定了Transiton，那么当其某个属性改变的时候就会按照Transition指定的方式进行过渡，动画就这么产生了。

Animation也是通过指定某一个属性（如width、left、transform等）在两个值之间如何过渡来实现动画的，与Transition不同的是，Animation可以通过keyframe显式控制当前帧的属性值，而Transition只能隐式来进行（不能指定每帧的属性值），所以相对而言Animation的功能更加灵活。另外一个区别是Animation通过模拟属性值改变来实现动画，动画结束之后元素的属性没有变化；而Transition确实改变了元素的属性值，动画结束之后元素的属性发生了变化；这一点，这在实际应用中会产生很大的区别，也决定了二者各有春秋

Animation模块包括了animation-name、animation-duration、animation-timing-function、animation-delay、animation-iteration-count、animation-play-state等属性。

其实说这么多，一句话就是：Transform和width、left一样，定义了元素很多静态样式，只不过通过Transition和Animation指定如何改变不同的属性值，才实现了动画。


参考：[http://www.zhangxinxu.com/wordpress/2010/11/css3-transitions-transforms-animation-introduction/](http://www.zhangxinxu.com/wordpress/2010/11/css3-transitions-transforms-animation-introduction/)





