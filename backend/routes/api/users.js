const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register a new user
// @access  Public
router.post('/', [
    check('fname', 'First name is required')
        .not()
        .isEmpty(),
    check('lname', 'Last name is required')
        .not()
        .isEmpty(),
    check('email', 'Must include valid email')
        .isEmail(),
    check('password', 'Password does not meet requirements')
        .isLength({ min: 8 })
        .not()
        .isAlpha()
], 
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fname, lname, email, password } = req.body;

    try {
        // Check that user does not already exist
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const salt = await bcrypt.genSalt(12);

        // Create new user with bcrypt hashed password
        user = new User({
            email: email,
            password: await bcrypt.hash(password, salt),
            fname: fname,
            lname: lname
        });
        await user.save();

        // Return JSON Web Token

        res.send('User registered');
    }
    catch(err) {
        console.error("User Post Err - " + err.message);
        return res.status(500).send('Server error');
    }
    
});

module.exports = router;