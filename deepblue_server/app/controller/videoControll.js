'use strict';

const Controller = require('egg').Controller;

class videoController extends Controller {
  async getType() {
    const { ctx } = this;
    try {
      let res = await ctx.service.videoService.getType();
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async getLabel() {
    const { ctx } = this;
    try {
      const type = ctx.request.query.type;
      let res = await ctx.service.videoService.getLabel(type);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async addLabel() {
    const { ctx } = this;
    try {
      const type = +ctx.request.query.type;
      const label = ctx.request.query.label;
      let res = await ctx.service.videoService.addLabel(type, label);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async addCourse() {
    const { ctx } = this;
    try {
      const form = ctx.request.body;
      const courseName = form.courseName;
      const path = form.path;
      const type = form.type;
      const label = form.label;
      const upLoader = form.upLoader;
      console.log(form)
      let res = await ctx.service.videoService.addColumn(courseName, path, type, label, upLoader);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
}

module.exports = videoController;
