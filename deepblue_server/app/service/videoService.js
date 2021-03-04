const Service = require('egg').Service;

class videoService extends Service {
  async getType () {
    try {
      let sql = 'select * from type_list';
      const res = await this.app.mysql.query(sql);
      return {
        result: 0,
        msg: 'success',
        data: res
      };
    } catch (e) {
      return {
        result: 1,
        msg: 'error',
        data: e
      }
    }
  }
  async addType (type) {
    try {
      let sql = 'INSERT INTO type_list (label) VALUES (?);';
      const res = await this.app.mysql.query(sql, [type]);
      return {
        result: 0,
        msg: 'success',
        data: res
      };
    } catch (e) {
      return {
        result: 1,
        msg: 'error',
        data: e
      }
    }
  }
  async getLabel (type) {
    try {
      let sql = 'select * from label_list where type_id = ?';
      const res = await this.app.mysql.query(sql, [type]);
      return {
        result: 0,
        msg: 'success',
        data: res
      };
    } catch (e) {
      return {
        result: 1,
        msg: 'error',
        data: e
      }
    }
  }
  async addLabel (type, label) {
    try {
      let sql = 'INSERT INTO label_list (type_id,label) VALUES (?,?);';
      const res = await this.app.mysql.query(sql, [type, label]);
      return {
        result: 0,
        msg: 'success',
        data: res
      };
    } catch (e) {
      return {
        result: 1,
        msg: 'error',
        data: e
      }
    }
  }
  async getColumn (type, label, order, page, pageSize) {
    try {
      let sql = 'select * from course,course_label where course.id = course_label.course_id and type = ? and label_id = ? order by ? desc limit ?, ?';
      const res = await this.app.mysql.query(sql, [type | '%%', label | '%%', order ? 'watchNum' : time, (page - 1) * pageSize, pageSize]);
      return {
        result: 0,
        msg: 'success',
        data: res
      };
    } catch (e) {
      return {
        result: 1,
        msg: 'error',
        data: e
      }
    }
  }
  async delColumn (id) {
    try {
      let sql = 'DELETE FROM course WHERE id = ?);';
      const res = await this.app.mysql.query(sql, [id]);
      return {
        result: 0,
        msg: 'success',
        data: res
      };
    } catch (e) {
      return {
        result: 1,
        msg: 'error',
        data: e
      }
    }
  }
  async addColumn (courseName, path, type, label, upLoader) {
    try {
      let time = new Date().getTime() + ''
      let sql1 = 'INSERT INTO course (courseName,path,type_id,time,upLoader) VALUES (?,?,?,?,?);';
      const res = await this.app.mysql.query(sql1, [
        courseName,
        path,
        type,
        time,
        upLoader
      ]);
      let sql2 = 'select * from course where time = ?'
      const res2 = await this.app.mysql.query(sql2, [time]);
      if (res2.length === 1) {
        let sql3 = 'INSERT INTO course_label (course_id,label_id) VALUES (?,?);'
        let res3 = null
        for (let l of label) {
          res3 = await this.app.mysql.query(sql3, [res2[0].id, l]);
          if (!res3 || res3.length === 0) {
            return {
              result: 3,
              msg: '标签保存失败'
            };
          }
        }
      } else {
        return {
          result: 2,
          msg: '课程保存失败'
        };
      }
    } catch (e) {
      return {
        result: 1,
        msg: 'error',
        data: e
      }
    }
    return {
      result: 0,
      msg: '保存成功'
    };
  }
}

module.exports = videoService
