const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  depCity: String, // 出发地
  arrCity: String, // 目的地
  goDate: String, // 日期
  fromTimestamp: Number, // 出发时间的时间戳
  fromTime: String,
  fromPlace: String,
  toTime: String,
  toPlace: String,
  howlong: String,
  addDay: Number, // +n天
  stopCity: String, // 有stopCity就是转
  companyInfo: String,
  price1: { // 为了简便就只设置一个价格
    price: Number,
    moreInfo: [String],
  }
});

module.exports = mongoose.model('Flight', schema);