const Service = require('egg').Service;

class topicService extends Service {
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
