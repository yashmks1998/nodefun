const mongoose = require('mongoose');


const connectDatabase = async () => {

  //const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const conn = await mongoose.connect('mongodb://mongo:27017/mongo-test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    
  });
  

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDatabase

