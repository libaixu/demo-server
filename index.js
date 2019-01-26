const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router/router');

// 允许跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods","PUT,DELETE,POST,GET");
  res.header("Access-Control-Allow-Credentials",true); //带cookies
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

app.listen(9999, function() {
  console.log('server is running at localhost:9999');
});
