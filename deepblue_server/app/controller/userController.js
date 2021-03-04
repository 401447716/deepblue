'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {
  async login() {
    const { ctx } = this;
    const account = ctx.request.query.account || '';
    const password = ctx.request.query.password || '';
    try {
      let res = await ctx.service.userService.login(account, password);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async regist() {
    const { ctx } = this;
    const account = ctx.request.query.account || '';
    const password = ctx.request.query.password || '';
    const weight = ctx.request.query.weight || 1;
    try {
      let res = await ctx.service.userService.regist(account, password, weight);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
}

module.exports = userController;
