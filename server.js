const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
//const db =require('./config/keys').mongoURI;

//Connect to Mongo
//mongoose.connect(db)
//.then(() => console.log('MongoDB Connected...'))
//.catch(err => console.log(err));

//Mongoose using async/await
mongoose.connection.on('connected', () => {
    console.log('Connection Established')
  })
  
  mongoose.connection.on('reconnected', () => {
    console.log('Connection Reestablished')
  })
  
  mongoose.connection.on('disconnected', () => {
    console.log('Connection Disconnected')
  })
  
  mongoose.connection.on('close', () => {
    console.log('Connection Closed')
  })
  
  mongoose.connection.on('error', (error) => {
    console.log('ERROR: ' + error)
  })
  
  const run = async () => {
      await mongoose.connect('mongodb://localhost:27017/user', {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    })
  }

  run().catch(error => console.error(error))

//Use Routes
app.use('/api/users',users);

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on port ${port}`));