const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const encodedPass = encodeURIComponent(process.env.DB_PASS);
   
    const uri = `mongodb+srv://${process.env.DB_USER}:${encodedPass}@cluster0.g65hyqn.mongodb.net/beautyzone?retryWrites=true&w=majority`;
    
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
   
  }
};

module.exports = connectDB;