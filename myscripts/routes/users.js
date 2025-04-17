const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../middleware/auth');
const User = require('../models/user');

// Login Page
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login - MyScripts'
  });
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register - MyScripts'
  });
});

// Register Handle
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      title: 'Register - MyScripts',
      errors,
      name,
      email
    });
  } else {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        errors.push({ msg: 'Email is already registered' });
        return res.render('register', {
          title: 'Register - MyScripts',
          errors,
          name,
          email
        });
      }
      
      // Get referral code if any
      const { ref } = req.query;
      
      // Create new user
      const newUser = new User({
        name,
        email,
        password,
        referredBy: ref || null
      });
      
      // Save user
      await newUser.save();
      
      // Update referrer's stats if applicable
      if (ref) {
        const Affiliate = require('../models/affiliate');
        const affiliate = await Affiliate.findOne({ referralCode: ref });
        
        if (affiliate) {
          affiliate.totalReferrals += 1;
          await affiliate.save();
        }
      }
      
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('/users/login');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Registration error');
      res.redirect('/users/register');
    }
  }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

// Account Page
router.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', {
    title: 'Account Settings - MyScripts',
    user: req.user,
    page: 'account'
  });
});

// Update Account
router.post('/account', ensureAuthenticated, async (req, res) => {
  const { name, email } = req.body;
  
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email
    });
    
    req.flash('success_msg', 'Account updated successfully');
    res.redirect('/users/account');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating account');
    res.redirect('/users/account');
  }
});

// Forgot Password Page
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', {
    title: 'Forgot Password - MyScripts'
  });
});

// Reset Password Page
router.get('/reset-password/:token', (req, res) => {
  res.render('reset-password', {
    title: 'Reset Password - MyScripts',
    token: req.params.token
  });
});

module.exports = router;
