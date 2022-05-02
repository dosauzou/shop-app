const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

import Mysql from '../server-global';

/* GET users listing. */
router.post('/register', async function (req: { body: { username: any; email: any; password: any; firstName: any; lastName: any; phoneNo: any; admin: any; }; }, res: { send: (arg0: { status: number; error?: any; data?: any; token?: any; }) => void; }, next: any) {
  try {

    let { username, email, password, firstName, lastName, phoneNo, admin} = req.body; 

    const hashed_password = md5(password.toString())

    const checkUsername = `Select username FROM users WHERE username = ?`;
   let q = await Mysql.getInstance().query(checkUsername, [username]) as any
   console.log(q)
   if(!q.length){
        const sql = `Insert Into users (username, email, password, firstname, lastname, phoneNo, admin) VALUES ( ?, ?, ?, ?, ?, ?, ?)`
        let q = await Mysql.getInstance().query(sql, [username, email, hashed_password, firstName, lastName, phoneNo, admin]) as any
        console.log(q)

       if(q.length){
        let token = jwt.sign({ data: q }, 'secret')

        res.send({ status: 1, data: q, token: token });


       }else{

       }
      
      }

  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
router.get('/display', async function (req: any, res: { send: (arg0: { status: number; data?: any; token?: any; error?: unknown; }) => void; }, next: any) {
  try {
      let { username, password } = req.body; 

      const hashed_password = md5(password.toString())
    const sql = `SELECT * FROM users`
    let q = await Mysql.getInstance().query(sql, [username, hashed_password]) as any

    if ((q).length) {
      let token = jwt.sign({ data: q }, 'secret')

      res.send({ status: 1, data: q, token: token });
    } else {
      res.send({ status: 0, data: q });

    }
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});

router.post('/login', async function (req: { body: { username: any; password: any; }; }, res: { send: (arg0: { status: number; error?: any; data?: any; token?: any; }) => void; }, next: any) {
  try {
    let { username, password } = req.body;
    const hashed_password = md5(password.toString())
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    let q = await Mysql.getInstance().query(sql, [username, hashed_password]) as any

    if ((q).length) {
      let token = jwt.sign({ data: q }, 'secret')

      res.send({ status: 1, data: q, token: token });
    } else {
      res.send({ status: 0, data: q });

    }

    console.log(q)

  } catch (error) {
    res.send({ status: 0, error: error });
  }
});


module.exports = router