import { createStore } from 'redux'

export default function () {
    // 下面这一段代码，就是 https://github.com/reactjs/redux 中的入门demo

    // 1.定义计算规则，即 reducer, 这里不能改变state, 不能return state = state +1
    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            default:
                return state
        }
    }

    // 2.根据计算规则生成 store
    let store = createStore(counter)

    // 3.定义数据（即 state）变化之后的派发规则(dispatch action 改变数据 -- subscrible 订阅监听，getState()来拿到state,进行操作 )
    store.subscribe(() => {
        console.log('current state', store.getState())
    })

    // 4. 触发action, 数据变化
    store.dispatch({type: 'INCREMENT'})
    store.dispatch({type: 'INCREMENT'})
    store.dispatch({type: 'DECREMENT'})
}
