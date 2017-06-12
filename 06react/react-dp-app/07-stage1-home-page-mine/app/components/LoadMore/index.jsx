import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore
                        ? <span>加载中...</span>
                        : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle() {
        // 执行传输过来的
        this.props.onLoadMoreData();
    }
    componentDidMount() {
        // 使用滚动时自动加载更多
        const onLoadMoreData = this.props.onLoadMoreData
        const wrapper = this.refs.wrapper
        function callback() {
            const top = wrapper.getBoundingClientRect().top //相对于视窗的top, bottom,left,right
            const windowHeight = window.screen.height // 屏幕的高度
            if (top && top < windowHeight) {
                // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
                onLoadMoreData()
                console.log('1')
            }
        }

        function debounce(func) {
            let timer = null;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(func, 500);
            }
        }
        // 监听scroll 事件，在指定时间内只触发一次，有就清除，没有就添加一个定时器==》函数节流
        window.addEventListener('scroll', debounce(callback));
    }
}

export default LoadMore