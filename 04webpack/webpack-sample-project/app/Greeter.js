import React, {Component} from 'react';
import { render } from 'react-dom'
import config from './config.json';
import styles from './greet.css';//导入

class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter