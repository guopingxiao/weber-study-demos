import React from 'react'
import { hashHistory } from 'react-router'

class List extends React.Component {
    render() {
        const arr = [1, 2, 3]
        return (
            <ul>
                {arr.map((item, index) => {
                    return <li key={index} onClick={this.clickHandler.bind(this, item)}>js jump to {item}</li>
                })}
            </ul>
        )
    }
    clickHandler(value) {
        hashHistory.push('/detail/' + value)// 2.相比于前面的Link,这里是另一种路由的方式
    }
}

export default List