const express = require('express');
require('./db/mongoose');
const path = require('path');
// const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Express is running');
});

app.listen(port, () => {
  console.log('Server up on port ', port);
});
