const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USERNAMEPASSWORD}@cluster0.qcpbsjv.mongodb.net/${process.env.MYDATABASE}?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("DB conntected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
