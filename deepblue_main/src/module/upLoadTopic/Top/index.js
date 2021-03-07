import React, { Component } from 'react'
import './index.scss'
import { Card, Button, Dialog, Message } from 'element-react';
import TopicBox from './topicBox/index'
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
    this.topicBoxRef = React.createRef();
    this.clickType = this.clickType.bind(this)
    this.getType = this.getType.bind(this)
    this.addTopic = this.addTopic.bind(this)
    this.getMyTopic = this.getMyTopic.bind(this)
    this.getType()
  }
  getType () {
    Api.getType().then(
      res => {
        if (!res.result) {
          this.setState({
            typeList: res.data,
            indexType: res.data[0]
          }, this.getMyTopic)
        } else {
          Message.error(res.msg)
        }
      }
    )
  }
  getMyTopic () {
    emitter.emit("getMyTopic", {
      user: this.state.user,
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
    }, this.getMyTopic)
  }
  addTopic () {
    let form = this.topicBoxRef.current.getAllTopicData()
    let data = {
      name: form.topic.name,
      type: form.topic.type,
      desc: form.topic.desc,
      setTime: +form.topic.setTime,
      time: +form.topic.setTime || -1,
      share: +form.topic.share,
      haveLimit: +form.topic.haveLimit,
      limit: +form.topic.haveLimit ? form.topic.all : -1,
      upLoader: this.state.user,
      single: form.single || null,
      multiple: form.multiple || null,
      fill: form.fill || null,
      subjective: form.subjective || null
    }
    Api.addTopic(data).then(
      res => {
        if (!res.result) {
          Message.success('操作成功')
          this.getMyTopic()
          this.setState({
            dialogVisible: false
          })
        } else {
          Message.error(res.msg)
        }
      }
    )
  }
  render () {
    return (
      <div className='top'>
        <Card className='listBox'>
          <div className="content">
            <div>
              <div className='title'>
                <div className='icon'></div>
                <h2>我的发布</h2>
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
            <div>
              <Button type="primary" onClick={ () => this.setState({ dialogVisible: true }) }>创建新题目</Button>
            </div>
          </div>
        </Card>
        <Dialog
          title="创建题目"
          size="full"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
        >
          <Dialog.Body>
            <TopicBox ref={this.topicBoxRef} typeList={this.state.typeList}/>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
            <Button type="primary" onClick={ this.addTopic.bind(this) }>确定</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    )
  }
}

export default Top
