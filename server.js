const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const update = require('./routes/api/update');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());


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
      useNewUrlParser:true,
      autoReconnect: true,
      useFindAndModify: false,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    })
  }

  run().catch(error => console.error(error))

//Use Routes
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/update',update);

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server started on port ${port}`));