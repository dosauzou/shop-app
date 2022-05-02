const express1 = require('express');
const router = express1.Router();


const user = require('./user.ts');
const item = require('./items.ts');
const order= require('./orders.ts');



router.use('/user', user);
router.use('/items', item);
router.use('/orders', order);


module.exports = router;