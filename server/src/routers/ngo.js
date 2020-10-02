const express = require('express');
const NGO = require('../models/ngo');
const router = new express.Router();

router.post('/register', async (req, res) => {
  const ngo = NGO(req.body);
  try {
    await ngo.save();
    res.send(ngo);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/data', (req, res) => {
  try {
    NGO.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
