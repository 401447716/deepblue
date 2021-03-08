import React, { Component } from 'react'
// import logo from '@/img/logo.svg'
import './learningTopic.css'
import 'element-theme-default';

import Top from './learningTopic/Top/index'
import NewTopic from './learningTopic/NewTopic/index'
import CheckPage from './learningTopic/CheckPage/index'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Top />
        <NewTopic />
        <CheckPage />
      </div>
    )
  }
}

export default App
