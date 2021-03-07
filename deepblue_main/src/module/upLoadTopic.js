import React, { Component } from 'react'
// import logo from '@/img/logo.svg'
import './upLoadTopic.css'
import 'element-theme-default';

import Top from './upLoadTopic/Top/index'
import NewTopic from './upLoadTopic/NewTopic/index'
import CheckPage from './upLoadTopic/CheckPage/index'

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
