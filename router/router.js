const express = require('express');
const router = express.Router();
const model = require('../model/userMode');
const User = model.getModel('user');
const _filter = { pwd: 0, __v: 0 }
const utility = require('utility');

const md5Pwd = (pwd) => {
  const str = 'aluiwrfgrbvbiWFVKEVUKEYRFVB846516~'
  let salt = str + pwd;

  return utility.md5(utility.md5(salt));
}

router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    if (doc) {
      return res.json({code: 0, data: doc});
    }
  });
});

router.get('/delete', (req, res) => {
  User.deleteMany({}, (err, doc) => {
    if (doc) {
      return res.json({code: 0});
    }
  });
});

router.post('/login', (req, res) => {
  const { name, pwd } = req.body;
  User.findOne({ name, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '服务端错误'});
    }
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码错误'});
    }
    res.cookie('userid', doc._id);
    return res.json({code: 0, data: doc});
  });
});

router.post('/register', (req, res) => {
  const { name, pwd } = req.body;
  User.findOne({name: name}, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'});
    }
    if (doc) {
      return res.json({code: 1, msg: '用户名已存在'});
    }
    const user = new User({ name, pwd: md5Pwd(pwd) });
    user.save((e, d) => {
      if (e) {
        res.json({code: 1, msg: 'server is wrong'});
      }
      const { name, _id } = d;
      res.cookie('userid', _id);
      return res.json({code: 0, data: { name, _id }});
    });
  });

});

module.exports = router;
