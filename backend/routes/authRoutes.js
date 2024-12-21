const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const sgMail = require('@sendgrid/mail');
const router = express.Router();

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  

// Send verification email function
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:3000.com/verify?token=${token}`;
  
  const message = {
    to: email,
    from: 'vaishnavirk2203@gmail.com', // Your SendGrid verified email address
    subject: 'Email Verification',
    text: `Click the link to verify your email: ${verificationLink}`,
    html: `<p>Click the link to verify your email:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  };

  try {
    await sgMail.send(message);
    console.log('Verification email sent.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Register route
router.post("/register", async (req, res) => {
  console.log("Register route hit");
  const { fname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    const user = await User.create({
      fname,
      email,
      password: encryptedPassword,
      userType,
      isVerified: false, // Initially set as unverified
    });

    // Generate verification token
    const verificationToken = jwt.sign(
      { email: user.email, userId: user._id },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    const token = jwt.sign(
      { email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "ok",
      message: "User registered successfully. Please verify your email.",
      data: { token, userType: user.userType },
    });
  } catch (error) {
    res.send({ status: "error", error: "Registration failed" });
  }
});



// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", error: "Invalid credentials" });
    }

    // Compare the hashed password with the entered one
    const encryptedPassword = await bcrypt.hash(password, 10);

    const isPasswordValid = await bcrypt.compare(password, encryptedPassword);
    console.log("Password valid?", isPasswordValid);

      
        if (!isPasswordValid) {
      return res.status(400).json({ status: "error", error: "Invalid credentials" });
    }

    // Generate token and send response
    const token = jwt.sign(
      { email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "ok",
      data: { token, userType: user.userType },
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Login failed" });
  }
});

// email verification route 
router.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    if (user.isVerified) {
      return res.status(400).send('User already verified');
    }

    user.isVerified = true;
    user.verificationToken = undefined; 
    await user.save();

    res.send('Email successfully verified');
  } catch (error) {
    res.status(400).send('Invalid or expired verification token');
  }
});



module.exports = router;