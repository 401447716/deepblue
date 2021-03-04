import React, { Component } from 'react'
// import logo from '@/img/logo.svg'
import './App.css'
import 'element-theme-default';

import Top from './learningVideo/Top/index'
import NewClass from './learningVideo/NewClass/index'

class App extends Component {
  render () {
    return (
      // <img src={logo} className='App-logo' alt='logo' />
      <div className='App'>
        <Top />
        <NewClass />
      </div>
    )
  }
}

export default App
