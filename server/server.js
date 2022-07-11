const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 数据库
require('./plugins/db.js')(app);

// 路由
require('./routes/index.js')(app);

app.listen(8080, () => {
  console.log('localhost:8080');
});
