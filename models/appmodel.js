const mongoose = require('mongoose');

//  Define a schema for the blog using Mongoose
// const blogSchema = new mongoose.Schema({
//   taskname: { type: String, required: true }, 
//   imgUrl: { type: String, required: true }, 
//   content: { type: String, required: true }, 
//   date: { type: Date, default: Date.now } 
// });

const todoSchema=new mongoose.Schema({
  task: { type: String, required: true },
  completed: {type: Boolean,default: false},
  createdAt: {type: Date,default: Date.now},


})

  

// Export the model based on the schema
module.exports = mongoose.model('model', todoSchema);


// text: {
//   type: String,
//   required: true,
// },
// completed: {
//   type: Boolean,
//   default: false, // Initially, the task is not completed
// },
// createdAt: {
//   type: Date,
//   default: Date.now,
// },
// dueDate: {
//   type: Date,
// },
// user: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User', // Reference to the User model to link the task to a user
// },