let mongoose = require('../db');
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: String,
  body: String,
  created_at: Date
})

module.exports = mongoose.model('Article', ArticleSchema);