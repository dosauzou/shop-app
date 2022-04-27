const express = require('express');
const router = express.Router();


const user = require('./user');
const item = require('./items');



router.use('/user', user);
router.use('/items', item);



module.exports = router;