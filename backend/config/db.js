const mongoose = require('mongoose');

const connectDB = async() => {
  try{
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB : ${con.connection.host}`);
  }catch(e){
    console.log(`Error: ${e.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;