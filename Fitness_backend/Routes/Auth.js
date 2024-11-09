const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema')
const errorHandler = require('../Middlewares/errorMiddleware');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

//tyen gzcy rkna ctpn
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tiwaridhruv4146@gmail.com',
        pass: 'tyengzcyrknactpn'
    }
});

router.get('/test', async (req, res) => {
    res.json({
        message: "Auth api is working"
    })
});

function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

router.post('/register', async (req, res, next) => {
    console.log('Request body:', req.body);  // Log the incoming request body

    try {
        const {
            name,
            email,
            password,
            gender,
            dob,
            goal,
            activityLevel,
            weightInKg,
            heightInCm
        } = req.body;

        if (!name || !email || !password || !gender || !goal || !activityLevel || !weightInKg || !heightInCm) {
            return res.status(400).json({ success: false, message: 'Some fields are missing from the request body' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }

        // Create a new user object with the required structure
        const newUser = new User({
            name,
            email,
            password,
            gender,
            dob: new Date(dob),  // Ensure dob is in Date format
            goal,
            activityLevel,
            weight: [{ weight: weightInKg, date: new Date() }],  // Array of weight objects
            height: [{ height: heightInCm, date: new Date() }]   // Array of height objects
        });

        // Save the new user
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });

    } catch (err) {
        console.error('Validation error details:', err);  // Log error details for debugging

        if (err.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: err.errors });
        }
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '50m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '100m' });

        res.cookie('authToken', authToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(200).json(createResponse(true, 'Login successful', {
            authToken,
            refreshToken
        }));
    }
    catch (err) {
        next(err);
    }
});
router.post('/sendotp', async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
            from: 'tiwaridhruv4146@gmail.com', 
            to: email,
            subject: 'OTP for verification',
            text: `Your OTP is ${otp}`
        }

        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json(createResponse(false, err.message));
            } else {
                res.json(createResponse(true, 'OTP sent successfully', { otp }));
            }
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/checklogin', authTokenHandler, async (req, res, next) => {
    res.json({
        ok: true,
        message: 'User authenticated successfully'
    })
});

router.use(errorHandler);
module.exports = router;
