const mongoose = require('mongoose')

const TasksSchema = new mongoose.Schema({

  body: {
      type: String,
      required: true,
      lowercase: true // Always convert `body` to lowercase

  },

  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },

  
  completed: {
        type: Boolean,
        default: false
    },
    
  createdAt: {
      type: Date,
      default: Date.now
  }
})

module.exports = mongoose.model('Tasks', TasksSchema)
