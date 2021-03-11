'use strict';

const Controller = require('egg').Controller;

class topicController extends Controller {
  async receiveTopic () {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      let res = await ctx.service.topicService.receiveTopic(data);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async getTopic () {
    const { ctx } = this;
    const account = ctx.request.query.account || null;
    const type = ctx.request.query.type || 0;
    const name = ctx.request.query.name || ''
    try {
      let res = await ctx.service.topicService.getTopic(account, type, name);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async getTopicCount () {
    const { ctx } = this;
    const account = ctx.request.query.account || null;
    try {
      let res = await ctx.service.topicService.getTopicCount(account);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async delTopic () {
    const { ctx } = this;
    const id = ctx.request.query.id || null;
    try {
      let res = await ctx.service.topicService.delTopic(id);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async getTocicDetail () {
    const { ctx } = this;
    const id = ctx.request.query.id || 0;
    try {
      let res = await ctx.service.topicService.getTopicDeatil(id);
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
  async addTopic() {
    const { ctx } = this;
    try {
      const data = ctx.request.body;
      let res = await ctx.service.topicService.addTopic(data);
      console.log(res)
      ctx.success(res);
    } catch (e) {
      ctx.fail(`内部错误:${e}`);
    }
  }
}

module.exports = topicController;
