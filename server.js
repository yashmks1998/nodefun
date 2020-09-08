const express = require('express');
const app = express();
require('dotenv').config()
const colors = require('colors')
var morgan = require('morgan')
var connectDatabase = require('./db')
const errorHandler = require('./middleware/error')

//import for course routes;


const auth = require('./routes/auth');

const PORT = process.env.PORT || 3000

app.use(express.json())

if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'));
}

connectDatabase();

// map courses routes

app.use('/api/v1/auth', auth)


app.use(errorHandler);

const server = app.listen(PORT, ()=>{
    console.log(`Listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow);
})

// handle Promise Rejection Warning:
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error : ${err.message}`.red.bold);
    server.close(()=>process.exit(1));

})



