## 深入理解css之border ##

本博客深入讲解CSS3中的border属性，深入介绍border-color之间的关系，以及border与background定位、border与透明边框，并教你如果使用border进行图形构建，以及如何借助border使用有限标签完成我们的布局。

###1.border-width不支持百分比值
本来width,padding和margin都支持百分比，为何就是border-width不支持呢？个人觉得是因为由语义决定的，比如

![](http://i.imgur.com/g5MKQQ9.png)

语义上，不会因为它是大一点的屏幕，就边框变大了，所以不存在这么一个百分比的关系还有一些类式的属性outline,box-shadow,text-shadow等，但是在实际中却有一些默认值thin--1px,mediun(默认)--3px，thick--5px;

那么问题来了？我们平时在写边框的时候都是1px,为什么默认值却是medium--3px?

![](http://i.imgur.com/euIVtqr.png)

这是因为在border的属性里，有一个border-style的属性，这个属性要在至少border-width为3px的情况下，才有效果？
那border-style又是什么鬼？

### border-style
border-style有以下几种；

![](http://i.imgur.com/kPfRk26.png)

![](http://i.imgur.com/oULFKkd.png)

![](http://i.imgur.com/qdwofJ9.png)

![](http://i.imgur.com/z1mbbzZ.png)

用处既然虚线的边框是原点，当然可以用来做原型或者圆角喽，兼容性比较好。dotted可以构建IE7/IE8下面的圆角，double还可以构建常见的三道杠图标

![](http://i.imgur.com/cbGW0uL.png)

还有其他的border-style:inset,outset,groove,rigde这些审美差，比较鸡肋；

### 3.border-color与color

boder-color的默认颜色就是color。可以继承color的颜色

![](http://i.imgur.com/zguKzUc.png)


有什么用呢？

比如，当我们做一个小图标，实现鼠标移动上去，整个里面和表框都颜色发生变化，通常，我们会通过改变小面的三个地方来实现。

![](http://i.imgur.com/IQtDcU8.png)


但是通过用border来实现，只需改变1处就可以，而且transition属性也只要控制颜色即可。
![](http://i.imgur.com/lUApOJL.png)

	<style type="text/css" media="screen">
	/*  .add{
		border:1px solid #ccc;
		padding: 10px;
	}
	.add:before, .add:after{
		backgroud:#ccc;
	}
	
	.add:hover{
		border-color:red;
	}
	
	.add:hover:before, .add:hover:after{
		background: red;
	}  */
	
	 .add{
		color:#ccc;
		transition: color .25s;
		border:1px solid;
		padding: 10px;
	}
	.add:before{
		border-top: 10px solid;
	}
	.add:after{
		border-left: 10px solid;
	}
	.add:hover{
		color:red;
	} 
		</style>
	
	</head>
	<body>
		<a href="javascript:" class="add">点我 </a>
	</body>

### 4. boder与background定位

假如要在一个宽度可变的容器内放一张图片，实现距离左边50px，那怎么办呢？

只需要设置background-position:50px 40px 即可，因为background的定位是从左上开始的，那么这里假如是要保持右边50px，那怎么实现呢？

只需设置50px的透明边框就可以了。

	border-ringth:50px solid transparent
	background-position:100% 40px;

就达到效果了，为什么呢？因为图片的定位是不计算border宽度的，在padding里面

### 5. border与三角等图形构建

用border solid 来实现各种三角与梯形

原理：利用border-style里的inset,outset等内凹，山脊等。。。

![](http://i.imgur.com/ivKY6P5.png)

在上图的基础上，可以设置不同颜色，以及设置transparent来构建很多图标哦。

### 6. border与透明边框

border的透明边框，很有用。
比如图片定位问题，倒三角问题。

![](http://i.imgur.com/FgFA4hT.png)
![](http://i.imgur.com/KLp7kTh.png)
![](http://i.imgur.com/G0vcYG6.png)

在给png图片变色时，用fontface, svg麻烦，可不可以用border来实现呢？


![](http://i.imgur.com/e7PIeYI.png)

如果让overflow:hideen;把原始图片隐藏，那么滤镜drop-shaow就失效。

用border来实现，就是让边框放大，然后用透明区域；这样drop-shawdow就能使用了；
![](http://i.imgur.com/VgwseKh.png)

### 7. border 在布局中的应用；

border与等高布局

![](http://i.imgur.com/fchaIKu.png)

但是有局限性，因为borderwidth不支持百分比，所以不支持响应式，只能有一边固定宽度了。