import React, { Component } from 'react'
import './index.scss'
import { Card, MessageBox, Button, Input, Message } from 'element-react';
import emitter from '../../../utils/event'
import Api from '../../../utils/api'

class Top extends Component {
  constructor () {
    super ()
    this.state = {
      classList: [],
      select: 1,
      keyName: '',
      val: {}
    }
    this.clickSelect = this.clickSelect.bind(this)
    this.getTopic = this.getTopic.bind(this)
    this.openTopic = this.openTopic.bind(this)
  }
  clickSelect (val) {
    this.setState({
      select: val
    })
  }
  componentDidMount(){
    this.eventEmitter = emitter.addListener('getTopic', (val) => {
      this.state.val = val
      this.getTopic()
    })
  }
  getTopic () {
    Api.getTopic(this.state.val.id, this.state.keyName).then(
      res => {
        console.log(res)
        if (!res.result) {
          this.setState({
            classList: res.data
          })
        }
      }
    )
  }
  openTopic (id) {
    MessageBox.confirm('是否进入专题训练?', '提示', {}).then(() => {
      emitter.emit("getTopicDetail", id)
    }).catch(
      () => {}
    )
  }
  componentWillUnmount(){
    emitter.removeListener(this.eventEmitter);
  }
  render () {
    return (
      <div className='newclass'>
        <Card
          className="box-card"
          header={
            <div className="selectList">
              关键词: <Input className="selectInput" value={this.state.keyName} onChange={val => this.setState({ keyName: val })} placeholder="请输入题目标题" />
              <Button type="primary" onClick={this.getTopic}>搜索</Button>
            </div>
          }
        >
          <div className='classList'>
            {
              this.state.classList.map((item, index) => {
                return (
                  <Card className='classBox' key={index}>
                    <div className='top'>
                      <p className='title'>{item.name}</p>
                      <p>{item.desc}</p>
                    </div>
                    <div className='body'>
                      <div className='left'>
                        <p>分数上限：{item.limit !== -1 ? item.limit : '无'}</p>
                        <p>时间上限：{item.time !== -1 ? item.time + ' 分钟' : '无'}</p>
                        <p>历史得分：</p>
                      </div>
                      <div className='right'>
                        <p>发布时间：{new Date(parseInt(item.upTime)).toLocaleDateString()}</p>
                        <p>贡献作者：{item.upLoader}</p>
                        <Button type='text' onClick={ () => this.openTopic(item.id) }>开始作答</Button>
                      </div>
                    </div>
                  </Card>
                )
              })
            }
          </div>
          {/* <Pagination className='page' layout="prev, pager, next" pageSize={10} total={50} onCurrentChange={(val) => { console.log(val) }}/> */}
        </Card>
      </div>
    )
  }
}

export default Top
