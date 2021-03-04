import React, { Component } from 'react'
import './index.scss'
import { Card, Pagination, Button, Input } from 'element-react';
import h from '@/img/h.png'

class Top extends Component {
  constructor () {
    super ()
    this.state = {
      classList: [1, 2, 3, 4, 5],
      select: 1
    }
    this.clickSelect = this.clickSelect.bind(this)
  }
  clickSelect (val) {
    this.setState({
      select: val
    })
  }
  render () {
    return (
      <div className='newclass'>
        <Card
          className="box-card"
          header={
            <div className="selectList">
              关键词: <Input className="selectInput" placeholder="请输入内容" /><Button type="primary">搜索</Button>
            </div>
          }
        >
          <div className='classList'>
            {
              this.state.classList.map((item, index) => {
                return (
                  <Card bodyStyle={{ padding: 0 }} className="classBox" key={index}>
                    <img src={h} className="image" />
                    <div style={{ padding: 14 }}>
                      <span>好吃的汉堡</span>
                      <div className="bottom clearfix">
                        <time className="time">2016-10-21 16:19</time>
                        <Button className='btn' type='text'>删除</Button>
                      </div>
                    </div>
                  </Card>
                )
              })
            }
          </div>
          <Pagination className='page' layout="prev, pager, next" pageSize={10} total={50} onCurrentChange={(val) => { console.log(val) }}/>
        </Card>
      </div>
    )
  }
}

export default Top
