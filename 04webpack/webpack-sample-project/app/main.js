import React from 'react'
import { render } from 'react-dom'
import Greeter from './Greeter'

import './main.css';
// // 通常情况下，css会和js打包到同一个文件中，并不会打包为一个单独的css文件，不过通过合适的配置webpack也可以把css打包为单独的文件的。
// // 不过这也只是webpack把css当做模块而已，咱们继续看看一个真的CSS模块的实践。

render(<Greeter />, document.getElementById('root'))
