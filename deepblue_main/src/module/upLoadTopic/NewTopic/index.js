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
    this.getMyTopic = this.getMyTopic.bind(this)
    this.delBox = this.delBox.bind(this)
  }
  clickSelect (val) {
    this.setState({
      select: val
    })
  }
  componentDidMount(){
    this.eventEmitter = emitter.addListener('getMyTopic', (val) => {
      this.state.val = val
      this.getMyTopic()
    })
  }
  getMyTopic () {
    Api.getMyTopic(this.state.val.user, this.state.val.id, this.state.keyName).then(
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
  delBox (id) {
    MessageBox.msgbox({
      title: '提示',
      message: '确定删除该题目？',
      showCancelButton: true
    }).then(action => {
      if (action === 'confirm') {
        Api.delTopic(id).then(
          res => {
            if(!res.result) {
              Message.success('操作成功')
              this.getMyTopic()
            } else {
              Message.error(res.msg)
            }
          }
        )
      }
    })
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
              <Button type="primary" onClick={this.getMyTopic}>搜索</Button>
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
                      </div>
                      <div className='center'>
                        <p>平均得分：{(item.ave / item.clickNum).toFixed(2)}</p>
                        <p>点击次数：{item.clickNum}</p>
                      </div>
                      <div className='right'>
                        <p>发布时间：{new Date(parseInt(item.upTime)).toLocaleDateString()}</p>
                        <p>
                          <Button onClick={ () => emitter.emit("getTopicDetail", item.id) } type="text">查看</Button> 
                          {/* <Button type="text">编辑</Button>  */}
                          <Button type="text" className='delBtn' onClick={ () => this.delBox(item.id)}>删除</Button>
                        </p>
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
