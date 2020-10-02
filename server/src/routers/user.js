const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
