import React, { Component } from 'react'
import './index.scss'
import { Card, Button, Dialog, Message } from 'element-react';
import Api from '../../../utils/api'
import emitter from '../../../utils/event'

class Top extends Component {
  constructor () {
    super ()
    this.state = {
      typeList: [],
      dialogVisible: false,
      indexType: null,
      user: '',
    }
    Api.getUser().then(
      res => {
        this.state.user = res.getUserInfo.account
      }
    )
    this.clickType = this.clickType.bind(this)
    this.getType = this.getType.bind(this)
    this.getTopic = this.getTopic.bind(this)
    this.getType()
  }
  getType () {
    Api.getType().then(
      res => {
        if (!res.result) {
          this.setState({
            typeList: res.data,
            indexType: res.data[0]
          }, this.getTopic)
        } else {
          Message.error(res.msg)
        }
      }
    )
  }
  getTopic () {
    emitter.emit("getTopic", {
      id: this.state.indexType.id
    })
    // Api.getMyTopic(this.state.user, this.state.indexType.id).then(
    //   res => {
    //     console.log(res)
    //   }
    // )
  }
  clickType (val) {
    this.setState({
      indexType: val
    }, this.getTopic)
  }
  render () {
    return (
      <div className='top'>
        <Card className='listBox'>
          <div className="content">
            <div>
              <div className='title'>
                <div className='icon'></div>
                <h2>专项练习</h2>
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
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default Top
