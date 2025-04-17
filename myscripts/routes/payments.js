const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const User = require('../models/user');

// Pricing page
router.get('/pricing', (req, res) => {
  res.render('pricing', {
    title: 'Pricing - MyScripts',
    user: req.user
  });
});

// Checkout session for Pro Monthly
router.post('/create-checkout-session/monthly', ensureAuthenticated, async (req, res) => {
  try {
    // This would normally create a Stripe checkout session
    // For now, we'll just redirect to a success page
    res.redirect('/payments/success?plan=pro_monthly');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Payment processing error');
    res.redirect('/payments/pricing');
  }
});

// Checkout session for Pro Annual
router.post('/create-checkout-session/annual', ensureAuthenticated, async (req, res) => {
  try {
    // This would normally create a Stripe checkout session
    // For now, we'll just redirect to a success page
    res.redirect('/payments/success?plan=pro_annual');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Payment processing error');
    res.redirect('/payments/pricing');
  }
});

// Success page
router.get('/success', ensureAuthenticated, async (req, res) => {
  try {
    const { plan } = req.query;
    
    // Update user's plan
    if (plan === 'pro_monthly' || plan === 'pro_annual') {
      await User.findByIdAndUpdate(req.user.id, {
        plan: plan === 'pro_monthly' ? 'pro_monthly' : 'pro_annual',
        scriptsLimit: 999999 // Unlimited for pro users
      });
    }
    
    res.render('success', {
      title: 'Payment Successful - MyScripts',
      user: req.user,
      plan
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating subscription');
    res.redirect('/dashboard');
  }
});

// Cancel page
router.get('/cancel', (req, res) => {
  res.render('cancel', {
    title: 'Payment Cancelled - MyScripts',
    user: req.user
  });
});

module.exports = router;
