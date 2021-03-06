const Service = require('egg').Service;

class topicService extends Service {
  async receiveTopic (data) {
    try {
      const answer = await this.getTopicDeatil(data.id)
      let single = 0;
      let multiple = 0;
      let fill = 0;
      let count = 0;
      if (data.single.length) {
        single = this.dealSingle(data.single, answer.data.single)
      }
      if (data.multiple.length) {
        multiple = this.dealMultiple(data.multiple, answer.data.multiple)
      }
      if (data.fill.length) {
        fill = this.dealFill(data.fill, answer.data.fill)
      }
      count = single + multiple + fill;
      const topicSave = await this.saveUserTopic(data.id, data.account, count);
      this.addTopicClickData(count)
      if (topicSave) {
        return {
          result: 0,
          msg: 'success',
          count
        }
      } else {
        return {
          result: 2,
          msg: 'error'
        }
      }
    } catch (e) {
      console.log(e)
      return {
        result: 1,
        msg: 'error'
      }
    }
  }
  addTopicClickData (count) {
    this.app.mysql.query('update deepblue.topic_list set ave = ave + ?, clickNum = clickNum + 1', [count]).then(
      res => {
        console.log(res)
      }
    )
  }
  async saveUserTopic (id, account, count) {
    try {
      let result = []
      const res1 = await this.app.mysql.query('select * from deepblue.user_topic where topic_id=? and user_account=?', [id, account])
      if (res1.length === 0) {
        result = await this.app.mysql.query('INSERT INTO deepblue.user_topic (topic_id, user_account, count) VALUES (?, ?, ?);', [id, account, count]);
      } else {
        result = await this.app.mysql.query('UPDATE deepblue.user_topic SET count = ? WHERE (id = ?);', [count, res1[0].id]);
      }
      if (result.affectedRows === 0) {
        return 0
      }
      return 1
    } catch (e) {
      console.log(e)
      return 0
    }
  }
  async getTopicCount (account) {
    console.log(account)
    try {
      const result = await this.app.mysql.query("select * from deepblue.user_topic where user_account=?", [account])
      return {
        result: 0,
        msg: 'ok',
        data: {
          count: result
        }
      }
    } catch (e) {
      console.log(e)
      return {
        result: 1,
        msg: 'error'
      }
    }
  }
  dealFill (data, answer) {
    let count = 0;
    for (let i = 0; i < answer.length; i++) {
      let f = true
      if (data[i].length === 0) {
        continue
      }
      let answers = answer[i].answer.split(',')
      let nums = answer[i].num.split(',')
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === answers[j]) {
          count += +nums[j]
        }
      }
    }
    return count
  }
  dealSingle (data, answer) {
    let count = 0;
    for (let i = 0; i < answer.length; i++) {
      if (data[i] === answer[i].answer) {
        count += +answer[i].num
      }
    }
    return count
  }
  dealMultiple (data, answer) {
    let count = 0;
    for (let i = 0; i < answer.length; i++) {
      let f = true
      if (!data[i]) {
        continue
      }
      let answers = answer[i].answer.replace(/,/g, '')
      for (let j = 0; j < data[i].length; j++) {
        f = answers.includes(data[i][j])
        if (!f) {
          break
        }
        answers = answers.replace(data[i][j], '')
      }
      if (f && answers === '') {
        count += +answer[i].num
      }
    }
    return count
  }
  async delTopic (id) {
    try {
      await this.app.mysql.query('DELETE FROM deepblue.topic_list WHERE (id = ?);', [id]);
      await this.app.mysql.query('DELETE FROM deepblue.single_list WHERE (originid = ?);', [id]);
      await this.app.mysql.query('DELETE FROM deepblue.multiple_list WHERE (originid = ?);', [id]);
      await this.app.mysql.query('DELETE FROM deepblue.fill_list WHERE (originid = ?);', [id]);
      await this.app.mysql.query('DELETE FROM deepblue.subjective_list WHERE (originid = ?);', [id]);
      return {
        result: 0,
        msg: 'ok'
      }
    } catch (e) {
      console.log(e)
      return {
        result: 1,
        msg: '网络错误'
      }
    }
  }
  async getTopic(account, type, name) {
    try { 
      let res = []
      if (account) {
        res = await this.app.mysql.query(`select * from type_list, topic_list where type_list.id = topic_list.type and upLoader='${account}' and type=${type} and name like '%${name}%'`);
      } else {
        res = await this.app.mysql.query(`select * from type_list, topic_list where type_list.id = topic_list.type and type=${type} and name like '%${name}%'`);
      }
      return {
        result: 0,
        msg: 'ok',
        data: res
      }
    } catch (e) {
      console.log(e)
      return {
        result: 1,
        msg: '网络错误'
      }
    }
  }
  async getTopicDeatil (id) {
    try {
      const data = {}
      const res = await this.app.mysql.query(`select * from topic_list where id=${id}`);
      data.topic = res[0]
      if (res[0].single) {
        data.single = await this.app.mysql.query(`select * from single_list where originid=${id}`);
      }
      if (res[0].fill) {
        data.fill = await this.app.mysql.query(`select * from fill_list where originid=${id}`);
      }
      if (res[0].multiple) {
        data.multiple = await this.app.mysql.query(`select * from multiple_list where originid=${id}`);
      }
      if (res[0].subjective) {
        data.subjective = await this.app.mysql.query(`select * from subjective_list where originid=${id}`);
      }
      return {
        resule: 0,
        data
      }
    } catch (e) {
      console.log(e)
      return {
        resule: 1,
        msg: e
      }
    }
  }
  async addTopic (data) {
    // console.log(data)
    const topic = {
      single: data.single ? 1 : 0,
      multiple: data.single ? 1 : 0,
      fill: data.fill ? 1 : 0,
      subjective: data.subjective ? 1 : 0,
      name: data.name,
      type: +data.type,
      desc: data.desc || '',
      time: +data.setTime ? data.time : -1,
      share: data.share,
      limit: +data.haveLimit ? data.limit : -1,
      upTime: new Date().getTime() + '',
      upLoader: data.upLoader
    }
    if (!data.single && !data.multiple && !data.fill && !data.subjective) {
      return {
        result: 2,
        msg: '无题目信息'
      }
    }
    try {
      const originid = await this.insertTopic(topic);
      if (!originid) { throw new Error('创建题目错误') };
      if (data.single) {
        const index = await this.insertSingle(originid, data.single);
        if (!index) { throw new Error('单选题错误') };
      }
      if (data.multiple) {
        const index = await this.insertMultiple(originid, data.multiple);
        if (!index) { throw new Error('多选题错误') };
      }
      if (data.fill) {
        const index = await this.insertFill(originid, data.fill);
        if (!index) { throw new Error('填空题错误') };
      }
      if (data.subjective) {
        const index = await this.insertSubjective(originid, data.subjective);
        if (!index) { throw new Error('填空题错误') };
      }
      return {
        result: 0,
        msg: 'success'
      };
    } catch (e) {
      console.log(e)
      return {
        result: 1,
        msg: e
      }
    }
  }
  async insertSubjective (originid, datas) {
    try {
      for(let data of datas) {
        data.originid = originid
        const result = await this.app.mysql.insert('subjective_list', data);
        if (result.affectedRows === 0) {
          return 0
        }
      }
      return 1
    } catch (e) {
      console.log(e)
      return 0
    }
    return 0
  }
  async insertFill (originid, datas) {
    try {
      for(let data of datas) {
        data.originid = originid
        data.answernum = data.num.reduce(function(prev, curr, idx, arr){
          return prev + curr;
        })
        data.num = data.num.join(',')
        data.answer = data.answer.join(',')
        const result = await this.app.mysql.insert('fill_list', data);
        if (result.affectedRows === 0) {
          return 0
        }
      }
      return 1
    } catch (e) {
      console.log(e)
      return 0
    }
    return 0
  }
  async insertMultiple (originid, datas) {
    try {
      for(let data of datas) {
        data.originid = originid
        data.answer = data.answer.join(',')
        const result = await this.app.mysql.insert('multiple_list', data);
        if (result.affectedRows === 0) {
          return 0
        }
      }
      return 1
    } catch (e) {
      console.log(e)
      return 0
    }
    return 0
  }
  async insertSingle (originid, datas) {
    try {
      for(let data of datas) {
        data.originid = originid
        const result = await this.app.mysql.insert('single_list', data);
        if (result.affectedRows === 0) {
          return 0
        }
      }
      return 1
    } catch (e) {
      console.log(e)
      return 0
    }
    return 0
  }
  async insertTopic (data) {
    const uuid = this.uuid()
    data.uuid = uuid
    try {
      const result = await this.app.mysql.insert('topic_list', data);
      if (result.affectedRows > 0) {
        const res = await this.app.mysql.query(`select * from topic_list where uuid='${uuid}'`);
        if (res.length !== 0) {
          return res[0].id
        }
      }
    } catch (e) {
      console.log(e)
      return 0
    }
    return 0
  }
  uuid () {
    function funu() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (funu() + funu() + "-" + funu() + "-" + funu() + "-" + funu() + "-" + funu() + funu() + funu());
  }
}

module.exports = topicService
