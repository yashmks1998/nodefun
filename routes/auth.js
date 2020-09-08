const express = require('express');
const router = express.Router();


const {
    register,
    login,
    profile
} = require('../controllers/auth');


const { protect } = require('../middleware/auth');


router.post('/register', register)
router.post('/login', login)
router.get('/profile', protect, profile)


module.exports = router;