import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userinfoActions from '../actions/userinfo'

import A from '../components/A'
import B from '../components/B'
import C from '../components/C'

class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>hello world</p>
                <hr/>
                <A userinfo={this.props.userinfo}/>
                <hr/>
                <B userinfo={this.props.userinfo}/>
                <hr/>
                <C actions={this.props.userinfoActions}/>
            </div>
        )
    }
    componentDidMount() {
        // 模拟登陆, 在DicComponent()时给定初值
        this.props.userinfoActions.login({
            userid: 'abc',
            city: 'beijing'
        })
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo // 从reducer里connect中拿的数据,然后传给组件
    }
}

function mapDispatchToProps(dispatch) { // 从action中拿到action创建函数，以及将diapatch给mapDispatchProps,这样就给把数从action创建函数的acion方法更新到state
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello)