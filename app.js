const express = require('express');
const config = require('config');
const path = require('path')
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/messages', require('./routes/messages.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || config.get('port') || 3001;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`>>>>>>server started at port ${PORT}`));

  } catch (error) {
    console.log('Server message', error.message);
    process.exit(1);
  }
}

start();