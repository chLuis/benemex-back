require('./database/config')
const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')

app.use(express.json());
app.use(cors())

app.use('/api', require('./routes/index.routes'))
//app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})