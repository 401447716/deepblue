import React, { Component } from 'react'
// import logo from '@/img/logo.svg'
import './upLoadTopic.css'
import 'element-theme-default';

import Top from './upLoadTopic/Top/index'
import NewTopic from './upLoadTopic/NewTopic/index'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Top />
        <NewTopic />
      </div>
    )
  }
}

export default App
