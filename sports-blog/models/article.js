var mongoose = require('mongoose');

//Article Schema

var articleSchema = mongoose.Schema({
  title: {
    type: String
  },
  subTitle:{
    type: String
  },
  category:{
    type: String
  },
  body:{
    type: String
  },
  author:{
    type: String
  },
  created_at: {
    type: Date,
    default : Date.now
  },
  comment: [{
    comment_subject :{
      type: String
    },
    comment_body:{
      type: String
    },
    comment_author:{
      type: String
    },
    comment_email:{
      type: String
    },
    comment_date: {
      type: String
    }
  }]

});

var Article = module.exports = mongoose.model('Article', articleSchema);

// Get Articles
module.exports.getArticles = function(callback, limit){
  Article.find(callback).limit(limit).sort([['title', 'ascending']]);
};

//Add Article
module.exports.addArticle = function(category, callback){
  Article.create(category, callback);
};

//get Single Article by ID

module.exports.getArticleById = function(id, callback){
  Article.findById(id, callback);
};

//Update Category

module.exports.updateCategory = function(query,update,options,callback){
  Category.findOneAndUpdate(query, update, options, callback);
};

//Delete Category

module.exports.removeCategory = function(query, callback){
  Category.removeCategory(query,callback);
};
