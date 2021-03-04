'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async uploadPic() {
    const { ctx } = this;
    try {
      let res = await ctx.service.home.upload(ctx.request.files, 'upload');
      ctx.body = res;
    } catch (e) {
      ctx.body = `内部错误:${e}`;
    }
  }
  async uploadVideo() {
    const { ctx } = this;
    try {
      let res = await ctx.service.home.upload(ctx.request.files, 'video');
      ctx.body = res;
    } catch (e) {
      ctx.body = `内部错误:${e}`;
    }
  }
}

module.exports = HomeController;
