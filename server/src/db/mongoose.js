const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/filmee-api', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
