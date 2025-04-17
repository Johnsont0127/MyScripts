const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const Script = require('../models/script');
const User = require('../models/user');

// Generate Script Page
router.get('/generate', ensureAuthenticated, (req, res) => {
  res.render('generate-script', {
    title: 'Generate Script - MyScripts',
    user: req.user
  });
});

// Generate Script - POST
router.post('/generate', ensureAuthenticated, async (req, res) => {
  try {
    const { productName, tone, highlights } = req.body;
    
    // Check if user has reached script limit (for free users)
    if (req.user.plan === 'free' && req.user.scriptsGenerated >= req.user.scriptsLimit) {
      req.flash('error_msg', 'You have reached your monthly script limit. Please upgrade to continue.');
      return res.redirect('/payments/pricing');
    }
    
    // Create script content (placeholder for OpenAI integration)
    let scriptContent = `# ${productName} Video Script\n\n`;
    scriptContent += `## Hook\n`;
    scriptContent += `Attention Amazon shoppers! Are you looking for a ${productName} that actually works? I've found the perfect solution.\n\n`;
    scriptContent += `## Benefits\n`;
    scriptContent += `${highlights}\n\n`;
    scriptContent += `## Call to Action\n`;
    scriptContent += `Click the link in my description to get your ${productName} today. Don't forget to use my code for a special discount!`;
    
    // Create new script
    const newScript = new Script({
      user: req.user.id,
      productName,
      tone,
      highlights,
      content: scriptContent
    });
    
    // Save script
    await newScript.save();
    
    // Update user's script count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { scriptsGenerated: 1 }
    });
    
    res.redirect(`/scripts/${newScript.id}`);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error generating script');
    res.redirect('/scripts/generate');
  }
});

// View All Scripts
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const scripts = await Script.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.render('scripts', {
      title: 'My Scripts - MyScripts',
      user: req.user,
      scripts,
      page: 'scripts'
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading scripts');
    res.redirect('/dashboard');
  }
});

// View Single Script
router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const script = await Script.findById(req.params.id);
    
    // Check if script exists and belongs to user
    if (!script || script.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Script not found');
      return res.redirect('/scripts');
    }
    
    res.render('script-detail', {
      title: `${script.productName} Script - MyScripts`,
      user: req.user,
      script,
      page: 'scripts'
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading script');
    res.redirect('/scripts');
  }
});

// Delete Script
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const script = await Script.findById(req.params.id);
    
    // Check if script exists and belongs to user
    if (!script || script.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: 'Not authorized' });
    }
    
    await script.remove();
    res.json({ success: true, msg: 'Script removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

module.exports = router;
