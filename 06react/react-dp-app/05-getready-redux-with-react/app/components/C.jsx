import React from 'react'

class C extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.changeUserInfo.bind(this)}>修改</button>
            </div>
        )
    }
    changeUserInfo() {
        // action 触发action创建函数，将实际的数据携带到reducer进行处理，更新state,其他组件也会更新到最新的state
        const actions = this.props.actions
        actions.updateCityName({
            userid: '123',
            city: 'nanjing'
        })
    }
}

export default C