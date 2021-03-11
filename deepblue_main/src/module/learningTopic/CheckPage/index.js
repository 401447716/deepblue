import React, { Component } from 'react'
import './index.scss'
import emitter from '../../../utils/event'
import Api from '../../../utils/api'
import { Radio, Button, Message, Input, Checkbox, MessageBox, Loading } from 'element-react';

class CheckPage extends Component {
  constructor () {
    super ()
    this.state = {
      show: false,
      topicData: {},
      endtime: null,
      cutTime: '00:00',
      time: -1,
      answer: {
        single: [],
        multiple: [],
        fill: []
      },
      user: '',
      fullscreen: false
    }
    Api.getUser().then(
      res => {
        this.state.user = res.getUserInfo.account
      }
    )
    this.getTopicDetail = this.getTopicDetail.bind(this)
    this.countdown = this.countdown.bind(this)
    this.openCountdown = this.openCountdown.bind(this)
    this.addZero = this.addZero.bind(this)
    this.saveSelectAnswer = this.saveSelectAnswer.bind(this)
    this.saveFillAnswer = this.saveFillAnswer.bind(this)
    this.closeTopic = this.closeTopic.bind(this)
  }
  componentDidMount(){
    this.eventEmitter = emitter.addListener('getTopicDetail', (val) => {
      this.getTopicDetail(val)
    })
  }
  openCountdown () {
    this.state.endtime = new Date(new Date().getTime() + this.state.time * 60 * 1000).getTime()
    this.countdown()
  }
  addZero (i) {
    return i < 10 ? '0' + i : i + ''
  }
  countdown () {
    let lefttime = parseInt((this.state.endtime - new Date().getTime()) / 1000)
    if (lefttime <= 0) {
      Message.info('结束')
      return
    }
    this.setState({
      cutTime: `${this.addZero(parseInt(lefttime / 60 % 60))} : ${this.addZero(parseInt(lefttime % 60))}`
    })
    setTimeout(this.countdown, 1000)
  }
  saveSelectAnswer (key, index, val) {
    this.state.answer[key][index] = val
    console.log(this.state.answer)
    this.forceUpdate()
  }
  saveFillAnswer (index1, index2, val) {
    if (this.state.answer.fill[index1] === undefined) {
      this.state.answer.fill[index1] = []
    }
    this.state.answer.fill[index1][index2] = val
    console.log(this.state.answer)
    this.forceUpdate()
  }
  closeTopic () {
    MessageBox.confirm('将提前提交答案并关闭答题窗口，是否确定', '提示', {}).then(() => {
      this.setState({
        fullscreen: true
      })
      Api.receiveTopic({
        id: this.state.topicData.topic.id,
        account: this.state.user,
        ...this.state.answer
      }).then(
        res => {
          this.setState({
            fullscreen: false
          })
          if (!res.result) {
            MessageBox.alert( `本次练习成绩为：${res.count} 分`, '提示');
            emitter.emit("getTopicCount", {})
            this.setState({
              show: false
            })
          } else {
            Message({
              type: 'error',
              message: '提交失败!'
            })
          }
        }
      )
    }).catch(
      () => {}
    )
  }
  getTopicDetail (id) {
    Api.getTopicDetail(id).then(
      res => {
        console.log(res)
        if (res.data.topic.fill) {
          for(let item of res.data.fill) {
            item.num = item.num.split(',')
            item.text = item.text.split('[-]').join('______')
            let fillAnswer = []
            for (let i = 0; i < item.num.length; i++) {
              fillAnswer[i] = ''
            }
            this.state.answer.fill.push(fillAnswer)
          }
        }
        this.setState({
          topicData: res.data,
          time: res.data.topic.time,
          show: true
        }, this.openCountdown)
      }
    )
  }
  render () {
    return (
      this.state.show && (
        <div className='checkpage'>
          {
            this.state.fullscreen && <Loading fullscreen={true} />
          }
          <div className='time'>
            {
              this.state.m === -1 ? '' : (
                <p>{this.state.cutTime}</p>
              )
            }
          </div>
          <div className='top'>
            <i className="el-icon-close closeBtn" onClick={ () => this.closeTopic() }></i>
            <p className='title'>{this.state.topicData.topic.name}</p>
            <div className='lineBox'>
              <p className='upLoader'>贡献者：{this.state.topicData.topic.upLoader}</p>
              <p className='desc'>说明：{this.state.topicData.topic.desc}</p>
            </div>
            <div className='lineBox'>
              <p>时间限制：{this.state.topicData.topic.time !== -1 ? `${this.state.topicData.topic.time} 分钟` : '无'}</p>
              <p>总分&nbsp;&nbsp;：{this.state.topicData.topic.limit !== -1 ? `${this.state.topicData.topic.limit} 分` : '无上限'}</p>
              <p>
                题型：
                <span>{this.state.topicData.topic.single ? '单选题 ' : ''}</span>
                <span>{this.state.topicData.topic.multiple ? '多选题 ' : ''}</span>
                <span>{this.state.topicData.topic.fill ? '填空题 ' : ''}</span>
                <span>{this.state.topicData.topic.subjective ? '主观题' : ''}</span>
              </p>
            </div>
            <p></p>
          </div>
          <div className='content'>
            {
              this.state.topicData.topic.single && (
                <div className='singleTopic'>
                  <p className='title'>单选题</p>
                  {
                    this.state.topicData.single.map((item, index) => {
                      return (
                        <div className='single' key={index}>
                          <p>({item.num}分) 第{index + 1}题：{item.text}</p>
                          <Radio.Group value={this.state.answer.single[index]} onChange={ val => this.saveSelectAnswer('single', index, val) }>
                            <Radio value='A'>A：{item.A}</Radio>
                            <Radio value='B'>B：{item.B}</Radio>
                            <Radio value='C'>C：{item.C}</Radio>
                            <Radio value='D'>D：{item.D}</Radio>
                          </Radio.Group>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
            {
              this.state.topicData.topic.multiple && (
                <div className='multipleTopic'>
                  <p className='title'>多选题</p>
                  {
                    this.state.topicData.multiple.map((item, index) => {
                      return (
                        <div className='multiple' key={index}>
                          <p>({item.num}分) 第{index + 1}题：{item.text}</p>
                          <Checkbox.Group value={this.state.answer.multiple[index]} onChange={ val => this.saveSelectAnswer('multiple', index, val) }>
                            <Checkbox label="A">A：{item.A}</Checkbox>
                            <Checkbox label="B">B：{item.B}</Checkbox>
                            <Checkbox label="C">C：{item.C}</Checkbox>
                            <Checkbox label="D">D：{item.D}</Checkbox>
                          </Checkbox.Group>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
            {
              this.state.topicData.topic.fill && (
                <div className='fillTopic'>
                  <p className='title'>填空题</p>
                  {
                    this.state.topicData.fill.map((item, index) => {
                      return (
                        <div className='fill' key={index}>
                          <p>({item.answernum}分) 第{index + 1}题：{item.text}</p>
                          <p>
                            {
                            item.num.map((item2, index2) => {
                              return (
                                <div className='fillItemBox' key={index + '-' + index2}>
                                  <span>&nbsp;&nbsp;{index2 + 1}、</span>
                                  <Input value={this.state.answer.fill[index][index2]} onChange={ val => this.saveFillAnswer(index, index2, val) }></Input>
                                  <span>({item2}分)</span>
                                </div>
                              )
                            })
                          }
                          </p>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
            {
              this.state.topicData.topic.subjective && (
                <div className='subjectiveTopic'>
                  <p className='title'>主观题</p>
                  {
                    this.state.topicData.subjective.map((item, index) => {
                      return (
                        <div className='subjective' key={index}>
                          <p>({item.num}分) 第{index + 1}题：{item.text}</p>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
          <Button type='primary' onClick={ () => this.closeTopic() }>提交</Button>
        </div>
      )
    )
  }
}

export default CheckPage
