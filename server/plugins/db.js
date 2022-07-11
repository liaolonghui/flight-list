module.exports = (app) => {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/qunar', {

  }, (err) => {
    if (err) {
      console.log('连接数据库失败！', err);
    } else {
      console.log('连接数据库成功！');
    }
  });

}