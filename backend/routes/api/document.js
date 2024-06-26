const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Test Route
// @access  Public
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})