// connecting MongoDB with mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('open', () => console.log('MongoDB Connection Success'));
db.on('err', () => console.log('MongoDB Connection Error'));

const Schema = mongoose.Schema;

const models = {
  user: {
    'name': { type: String},
    'pwd': { type: String }
  }
}

for (let m in models) {
  mongoose.model(m, new Schema(models[m]));
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  }
}
