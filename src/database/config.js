const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECT)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB: ', err));