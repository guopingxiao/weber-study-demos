import React from 'react'

class App extends React.Component {
    render() {
        return (
            <div>
                <div>header</div>
                <div>{this.props.children}</div>
                <div>footer</div>
            </div>
        )
    }
}

export default App