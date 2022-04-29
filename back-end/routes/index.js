const express = require('express');
const router = express.Router();


const user = require('./user');
const item = require('./items');
const order= require('./orders');



router.use('/user', user);
router.use('/items', item);
router.use('/orders', order);



module.exports = router;