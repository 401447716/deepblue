import React, { Component } from 'react'
import './index.scss'
import emitter from '../../../utils/event'
import Api from '../../../utils/api'
import { Radio, Button } from 'element-react';

class CheckPage extends Component {
  constructor () {
    super ()
    this.state = {
      show: false,
      topicData: {}
    }
    this.getTopicDetail = this.getTopicDetail.bind(this)
  }
  componentDidMount(){
    this.eventEmitter = emitter.addListener('getTopicDetail', (val) => {
      this.getTopicDetail(val)
    })
  }
  getTopicDetail (id) {
    Api.getTopicDetail(id).then(
      res => {
        console.log(res)
        if (res.data.topic.fill) {
          for(let item of res.data.fill) {
            item.num = item.num.split(',')
            item.answer = item.answer.split(',')
            item.text = item.text.split('[-]').join('______')
          }
        }
        this.setState({
          topicData: res.data,
          show: true
        })
      }
    )
  }
  render () {
    return (
      this.state.show && (
        <div className='checkpage'>
          <div className='top'>
            <i className="el-icon-close closeBtn" onClick={ () => this.setState({ show: false })}></i>
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
                          <Radio.Group value={item.answer}>
                            <Radio checked={item.answer === 'A'} value='A'>A：{item.A}</Radio>
                            <Radio checked={item.answer === 'B'} value='B'>B：{item.B}</Radio>
                            <Radio checked={item.answer === 'C'} value='C'>C：{item.C}</Radio>
                            <Radio checked={item.answer === 'D'} value='D'>D：{item.D}</Radio>
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
                          <Radio.Group value={item.answer}>
                            <Radio checked={item.answer.includes('A')} value='A'>A：{item.A}</Radio>
                            <Radio checked={item.answer.includes('B')} value='B'>B：{item.B}</Radio>
                            <Radio checked={item.answer.includes('C')} value='C'>C：{item.C}</Radio>
                            <Radio checked={item.answer.includes('D')} value='D'>D：{item.D}</Radio>
                          </Radio.Group>
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
                            item.answer.map((item2, index2) => {
                              return (
                                <span key={index + '-' + index2}>{index2 + 1}、{item.answer[index2]} ({item.num[index2]}分)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
          <Button type='primary' onClick={ () => this.setState({ show: false })}>关闭</Button>
        </div>
      )
    )
  }
}

export default CheckPage
