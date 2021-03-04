'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/uploadPic', controller.home.uploadPic);
  router.post('/uploadVideo', controller.home.uploadVideo);
};
