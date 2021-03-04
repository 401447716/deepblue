import React, { Component } from 'react'
import './index.scss'
import { Card } from 'element-react';

class Top extends Component {
  constructor () {
    super ()
    this.state = {
      typeList: [
        { id: 0, label: '全部'},
        { id: 1, label: '公共基础'},
        { id: 2, label: '计算机'},
        { id: 3, label: '高等数学'},
      ],
      labelList: [
        { id: 0, label: '全部'},
        { id: 1, label: '标签1'},
        { id: 2, label: '标签2'},
        { id: 3, label: '标签3'},
      ],
      indexType: { id: 0, label: '全部'},
      indexLabel: { id: 0, label: '全部'}
    }
    this.clickType = this.clickType.bind(this)
    this.clicklabel = this.clicklabel.bind(this)
  }
  clickType (val) {
    this.setState({
      indexType: val
    })
  }
  clicklabel (val) {
    this.setState({
      indexLabel: val
    })
  }
  render () {
    return (
      <div className='top'>
        <Card className='listBox'>
          <div className='title'>
            <div className='icon'></div>
            <h2>全部课程</h2>
          </div>
          <div className='classTypeList'>
            <p className='typeTitle'>类型：</p>
            {
              this.state.typeList.map(item => {
                return (
                  <span
                    onClick={() => this.clickType(item)} key={item.id} className={this.state.indexType.id === item.id ? 'activeType' : ''}>{item.label}</span>
                )
              })
            }
          </div>
          <div className='classTypeList'>
            <p className='typeTitle'>标签：</p>
            {
              this.state.labelList.map(item => {
                return (
                  <span
                    onClick={() => this.clicklabel(item)} key={item.id} className={this.state.indexLabel.id === item.id ? 'activeType' : ''}>{item.label}</span>
                )
              })
            }
          </div>
        </Card>
      </div>
    )
  }
}

export default Top
