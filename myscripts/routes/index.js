const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const User = require('../models/user');

// Home page route
router.get('/', (req, res) => {
  res.render('landing', {
    title: 'MyScripts - AI-Powered Video Scripts for Amazon Influencers'
  });
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // Get user's scripts
    const scripts = await require('../models/script').find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.render('dashboard', {
      title: 'Dashboard - MyScripts',
      user: req.user,
      scripts,
      page: 'dashboard'
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading dashboard');
    res.redirect('/');
  }
});

// About page route
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About MyScripts',
    user: req.user
  });
});

module.exports = router;
