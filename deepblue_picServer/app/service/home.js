const Service = require('egg').Service;
const fs = require('mz/fs');
const basepath = require('path')

class home extends Service {
  async upload (files, path) {
    let savelist = []
    for (const file of files) {
      try {
        const data = fs.readFileSync(file.filepath);
        const base64str = Buffer.from(data, 'binary').toString('base64');
        const bufferData = Buffer.from(base64str, 'base64');
        const fileName = new Date().getTime() + '_' + file.filename
        const src = basepath.join(`app/public/${path}/`, fileName);
        try {
          await fs.writeFileSync(src, bufferData);
          if (file.titlePic) {
            let titlePic = await this.saveTitlePic(file.titlePic);
            if (titlePic === 0) {
              throw new Error('pic Error')
            }
            savelist.push({
              titlePic,
              path: `http://127.0.0.1:8001/public/${path}/${fileName}`
            });
          } else {
            savelist.push(`http://127.0.0.1:8001/public/${path}/${fileName}`);
          }
        } catch (e) {
          return {
            result: 1,
            msg: '写入失败'
          }
          // this.serverError('上传、更新失败', request, '上传、更新用户头像');
        }
      } finally {
        // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
      // this.operationLogger(request, '上传、更新用户头像', true);
      // console.log(result);
    }
    return {
      result: 0,
      msg: '上传成功',
      data: savelist
    };
  }
  async saveTitlePic (imgData) {
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    const base64str = Buffer.from(base64Data, 'binary').toString('base64');
    const bufferData = Buffer.from(base64str, 'base64');
    const fileName = `${new Date().getTime()}${Math.ceil(Math.random() * 100)}`
    fs.writeFile(basepath.join(`app/public/titlePic/`, fileName), bufferData, function(err) {
      if (err) {
        return 0;
      } else {
        return `http://127.0.0.1:8001/public/titlePic/${fileName}`;
      }
    });
  }
}

module.exports = home;
