const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  profileImgPath: {
    type: String,
    required: false,
  }
},{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);