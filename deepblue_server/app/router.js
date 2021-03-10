'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.userController.login);
  router.get('/regist', controller.userController.regist);
  router.get('/getType', controller.videoControll.getType);
  router.get('/getLabel', controller.videoControll.getLabel);
  router.get('/addLabel', controller.videoControll.addLabel);
  router.post('/addCourse', controller.videoControll.addCourse);
  router.get('/getTopic', controller.topicController.getTopic);
  router.get('/delTopic', controller.topicController.delTopic);
  router.get('/getTopicDetail', controller.topicController.getTocicDetail);
  router.post('/addTopic', controller.topicController.addTopic);
  router.post('/receiveTopic', controller.topicController.receiveTopic);
};
