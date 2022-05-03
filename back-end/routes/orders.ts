import Mysql from '../server-global';
const jwt = require('jsonwebtoken');


const express = require('express');

const router = express.Router();
/* GET users listing. */
router.post('/create', async function (req: { body: { items: { items: any; }; name: { username: any; }; date: any; accountDetails: { cccvv: any; ccexpiration: any; ccname: any; ccnumber: any; }; shippingDetails: { address: any; address2: any; state: any; country: any; zip: any; }; }; }, res: { send: (arg0: { status: number; data?: any; token?: any; error?: unknown; }) => void; }, next: any) {
    try {

        let { items } = req.body.items;
        let { username } = req.body.name;

        console.log(req.body)


        const checkUsername = `Select username FROM users WHERE username = ?`;
        let q = await Mysql.getInstance().query(checkUsername, [username]) as any
        console.log(q)

        if (q) {
            let sql = `Insert Into orders (items, date, user) VALUES ( ?, ?, ?)`
            let q = await Mysql.getInstance().query(sql, [JSON.stringify(req.body.items), req.body.date, req.body.name]) as any


            if (q) {
                console.log(q.insertId)
                sql = `Insert Into accountDetails (cccvv, ccexpiration, ccname, ccnumber, orderId) VALUES (?, ?, ?, ?, ?)`
                let b = await Mysql.getInstance().query(
                    sql, [req.body.accountDetails.cccvv, req.body.accountDetails.ccexpiration, req.body.accountDetails.ccname, req.body.accountDetails.ccnumber, q.insertId]) as any
                sql = `Insert Into shippingDetails (address, address2, state, country, zip, orderId) VALUES ( ?, ?, ?, ?, ?, ?)`
                b  = await Mysql.getInstance().query(
                    sql, [req.body.shippingDetails.address, req.body.shippingDetails.address2, req.body.shippingDetails.state, req.body.shippingDetails.country, req.body.shippingDetails.zip, q.insertId])
                let token = jwt.sign({ data: q }, 'secret')
                res.send({ status: 1, data: q, token: token });
            }
            else {
                res.send({ status: 0, error: q });

            }
        }else
        res.send({ status: 0, error: q });


    } catch (error) {
        res.send({ status: 0, error: error });
    }
});

module.exports = router;