import React, { Component } from 'react'
import './index.scss'
import { Card, Button, Dialog, Form, Input, Radio, Checkbox, Upload, Message, Select  } from 'element-react';
import Api from '../../../utils/api'
import utilsTool from '../../../utils/cutPic'

class Top extends Component {
  constructor () {
    super ()
    this.state = {
      typeList: [],
      labelList: [],
      indexType: null,
      indexLabel: null,
      upLoadBox: false,
      form: {
        courseName: '',
        type: '',
        upLoader: null,
        label: null,
        path: '',
        titPic: ''
      },
      newLabelList: [],
      addLabel: false,
      newType: 0,
      newLabel: '',
      user: '',
      path: ''
    }
    Api.getUser().then(
      res => {
        this.state.user = res.getUserInfo.account
      }
    )
    this.clickType = this.clickType.bind(this)
    this.clicklabel = this.clicklabel.bind(this)
    this.upLoadSuccess = this.upLoadSuccess.bind(this)
    this.getType = this.getType.bind(this)
    this.getLabel = this.getLabel.bind(this)
    this.getNewLabel = this.getNewLabel.bind(this)
    this.openAddLabel = this.openAddLabel.bind(this)
    this.saveNewLabel = this.saveNewLabel.bind(this)
    this.upLoadClass = this.upLoadClass.bind(this)
    this.showUpLoadBox = this.showUpLoadBox.bind(this)
    this.cutVideoCover = this.cutVideoCover.bind(this)
    this.getType()
  }
  getType () {
    Api.getType().then(
      res => {
        if (!res.result) {
          this.setState({
            typeList: res.data,
            indexType: res.data[0]
          })
          this.getLabel()
        } else {
          Message.error(res.msg)
        }
      }
    )
  }
  getLabel () {
    Api.getLabel(this.state.indexType.id).then(
      res => {
        if (!res.result) {
          this.setState({
            labelList: res.data,
            indexLabel: res.data[0]
          })
        } else {
          Message.error(res.msg)
        }
      }
    )
  }
  getNewLabel (val) {
    this.state.form.type = val
    Api.getLabel(val).then(
      res => {
        if (!res.result) {
          this.setState({
            newLabelList: res.data
          })
        } else {
          Message.error(res.msg)
        }
      }
    )
  }
  openAddLabel () {
    if (!this.state.form.type) {
      alert('请先选择类型')
      return
    }
    this.setState({
      addLabel: true,
      newLabel: ''
    })
  }
  saveNewLabel () {
    if (!this.state.form.type || !this.state.newLabel) {
      alert('缺失数据')
      return
    }
    Api.addLabel(this.state.form.type, this.state.newLabel).then(
      res => {
        if (!res.result) {
          Message.success('操作成功')
          this.getNewLabel(this.state.form.type)
          this.setState({
            addLabel: false
          })
        } else {
          Message.error(res.msg)
        }
      }
    )
  }
  clickType (val) {
    this.setState({
      indexType: val
    }, this.getLabel)
  }
  clicklabel (val) {
    this.setState({
      indexLabel: val
    })
  }
  changeFrom (key, val) {
    this.state.form[key] = val
    this.forceUpdate()
  }
  upLoadSuccess(res, file, filePath) {
    // console.log(res, file, filePath)
    console.log(res)
    if (!res.result) {
      this.state.form.path = res.data[0]
    } else {
      Message.error(res.msg)
    }
    this.setState({
      path: res.data[0]
    }, () => {
      this.cutVideoCover(res.data[0], 0, 1)
    })
  }
  showUpLoadBox () {
    this.setState({
      form: {
        courseName: '',
        type: '',
        upLoader: this.state.user,
        label: null,
        path: '',
        titlePic: ''
      },
      upLoadBox: true,
      path: ''
    })
  }
  cutVideoCover (url, index = 0, num = 1) {
    let showCoverArr = []
    utilsTool.GetVideoCover({
      url: url,
      time: 3,
      success: (res) => {
        showCoverArr.push(res.base64); //给展示列表传入截图的URL
        console.log(
          "第",index+1,"张",
        );
        if(parseInt(showCoverArr.length) < num){
          this.cutVideoCover(url, index+=1);
        }else {
          console.log(showCoverArr)
        }
        this.state.form.titlePic = showCoverArr[index]
        console.log(this.state.form)
      },
    });
  }
  upLoadClass () {
    let data = JSON.parse(JSON.stringify(this.state.form))
    if (!data.courseName || !data.type || !data.label || !data.path) {
      Message.error('缺少数据')
      return
    }
    Api.addCourse(data).then(
      res => {
        if (!res.result) {
          Message.success('操作成功')
          this.setState({
            upLoadBox: false
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
          <div className='content'>
            <div>
              <div className='title'>
                <div className='icon'></div>
                <h2>我的课程</h2>
              </div>
              <div className='classTypeList'>
                <p className='typeTitle'>类型：</p>
                {
                  this.state.typeList.map(item => {
                    return (
                      <span onClick={() => this.clickType(item)} key={item.id} className={this.state.indexType.id === item.id ? 'activeType' : ''}>{item.label}</span>
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
            </div>
            <div>
              <Button type='primary' className='btn' onClick={ () => this.showUpLoadBox() }>发布</Button>
            </div>
          </div>
        </Card>
        <Dialog
          title="发布视频"
          size="small"
          visible={ this.state.upLoadBox }
          onCancel={ () => this.setState({ upLoadBox: false }) }
          lockScroll={ false }
          style={{ 'width': '550px'}}
        >
          <Dialog.Body>
          <Form model={this.state.form} labelWidth="80">
            <Form.Item label="课程名称">
              <Input value={this.state.form.courseName} style={{ 'width': '300px' }}  onChange={ this.changeFrom.bind(this, 'courseName') }></Input>
            </Form.Item>
            <Form.Item label="类型">
              <Select value={this.state.form.type} placeholder="请选择" onChange={ (val) => this.getNewLabel(val) }>
                {
                  this.state.typeList.map(el => {
                    return <Select.Option key={el.id} label={el.label} value={el.id} />
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item label="标签">
              <Checkbox.Group value={this.state.form.label}  onChange={ this.changeFrom.bind(this, 'label') }>
                {
                  this.state.newLabelList.map(item => {
                    return <Checkbox value={item.id} name="type" key={item.id} >{item.label}</Checkbox>
                  })
                }
              </Checkbox.Group>
              <Button type="primary" icon="plus" className='plusBtn' onClick={ this.openAddLabel }></Button>
            </Form.Item>
            <Form.Item label="视频">
            <Upload
              action="http://127.0.0.1:8001/uploadVideo"
              accept='mp4'
              limit={1}
              headers="Access-Control-Allow-Origin"
              onSuccess={ (response, file, fileList) => this.upLoadSuccess(response, file, fileList)}
              onExceed={ () => Message.error('最多上传一个文件') }
              onRemove={ () => this.state.form.path = '' }
              tip={<div className="el-upload__tip">只能上传mp4文件</div>}
            >
              <Button size="small" type="primary">点击上传</Button>
            </Upload>
            {
              this.state.path ? (
                <video id="video" controls="controls" className='video'>
                  <source src={this.state.path || ''} />
                </video>
              ) : ''
            }
            </Form.Item>
          </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button onClick={ () => this.setState({ upLoadBox: false }) }>取消</Button>
            <Button type="primary" onClick={ () => this.upLoadClass() }>发布</Button>
          </Dialog.Footer>
        </Dialog>
        <Dialog
          title="添加标签"
          size="small"
          visible={ this.state.addLabel }
          onCancel={ () => this.setState({ addLabel: false }) }
          lockScroll={ false }
          style={{ 'width': '550px'}}
        >
          <Dialog.Body>
          <Form model={this.state.form} labelWidth="80">
            <Form.Item label="标签名称">
              <Input value={this.state.newLabel} style={{ 'width': '300px' }}  onChange={ (val) => this.setState({ newLabel: val }) }></Input>
            </Form.Item>
          </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button onClick={ () => this.setState({ newLabel: '', addLabel: false }) }>取消</Button>
            <Button type="primary" onClick={ this.saveNewLabel }>确定</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    )
  }
}

export default Top
