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

var Category = module.exports = mongoose.model('Category', categorySchema);

// Get Categories
module.exports.getCategories = function(callback, limit){
  Category.find(callback).limit(limit).sort([['title', 'ascending']]);
};

//Add Category
module.exports.addCategory = function(category, callback){
  Category.create(category, callback);
};

//get Single category by ID

module.exports.getCategoryById = function(id, callback){
  Category.findById(id, callback);
};

//Update Category

module.exports.updateCategory = function(query,update,options,callback){
  Category.findOneAndUpdate(query, update, options, callback);
};

//Delete Category

module.exports.removeCategory = function(query, callback){
  Category.removeCategory(query,callback);
};
