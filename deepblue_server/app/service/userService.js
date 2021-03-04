const Service = require('egg').Service;

class userService extends Service {
    /**
     * 登录
     * @param {string} account 账号
     * @param {string} password 密码
     * result: {
     *  code,   1为登录成功
     *  msg,    登录错误信息
     *  data    登录成功信息
     * }
     */
    async login (account, password) {
        if (account === '' || password === '') {
            return {
                result: 2,
                msg: '缺失数据',
                data: null
            }
        }
        let sql = 'select * from user where account = ?';
        const res = await this.app.mysql.query(sql, [account]);
        if (res.length === 0) {
            return {
                result: -1,
                msg: '用户账号错误',
                data: null
            };
        }
        if (res[0].password === password) {
            const viewList = await this.app.mysql.query('select * from view where weight <= ?', [res[0].weight]);
            return {
                result: 0,
                msg: '登录成功',
                data: {
                    uid: res[0].id,
                    icon: res[0].icon,
                    name: res[0].name,
                    view: viewList
                }
            };
        } else {
            return {
                result: 1,
                msg: '用户密码错误',
                data: null
            };
        }
    }
    async regist (account, password, weight) {
        if (account === '' || password === '') {
            return {
                result: 2,
                msg: '缺失数据',
                data: null
            }
        }
        let sql = 'select * from user where account = ?';
        const res = await this.app.mysql.query(sql, [account]);
        if (res.length !== 0) {
            return {
                result: -1,
                msg: '账号已被使用',
                data: null
            };
        }
        let insertSQL = 'INSERT INTO user (account, password, name, weight) VALUES (?, ?, ?, ?);'
        const ires = await this.app.mysql.query(insertSQL, [account, password, account, weight]);
        if (ires.affectedRows !== 0) {
            return {
                result: 0,
                msg: '注册成功'
            };
        } else {
            return {
                result: -2,
                msg: '注册失败'
            };
        }
    } 
}

module.exports = userService;
