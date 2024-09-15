import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send OTP
router.post('/send', asyncHandler(async (req, res) => {
  console.log('Sending OTP')
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
console.log(user)
  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; 
  await user.save();

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL, 
    subject: 'Your OTP Code',
    text: `Dear Staff,
 Please use the following OTP code to update your password. The OTP is valid for 10 minutes.
        
If you did not request this password update, please ignore this email.
    
Thank you,
Team NeBots `,    

html: `<strong>Your OTP code is ${otp}</strong>`,
  };
  try {
    await sgMail.send(msg);
    console.log(`OTP sent to ${email}`);
    res.status(200).json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error(`Error sending OTP: ${error.message}`);
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
  }
}));

// Verify OTP
router.post('/verify-otp', asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ success: true, message: 'OTP verified' });
}));

// Update Password
router.post('/update-password', asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  // Validate the new password
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // Save the updated user record
  await user.save();

  res.status(200).json({ success: true, message: 'Password updated successfully' });
}));

export default router;
