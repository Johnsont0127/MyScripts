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

// Contact page route
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - MyScripts',
    user: req.user
  });
});

// Blog page route
router.get('/blog', (req, res) => {
  res.render('blog', {
    title: 'Blog - MyScripts',
    user: req.user
  });
});

// Help Center page route
router.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Center - MyScripts',
    user: req.user
  });
});

// Terms of Service page route
router.get('/terms', (req, res) => {
  res.render('terms', {
    title: 'Terms of Service - MyScripts',
    user: req.user
  });
});

// Privacy Policy page route
router.get('/privacy', (req, res) => {
  res.render('privacy', {
    title: 'Privacy Policy - MyScripts',
    user: req.user
  });
});

module.exports = router;
