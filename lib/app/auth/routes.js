const express = require('express');

const { Router } = express;

const router = new Router();

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
