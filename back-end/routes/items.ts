import Mysql from '../server-global';

const express = require('express');

const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');



router.get('/display', async function (req: any, res: { send: (arg0: { status: number; data?: any; token?: any; error?: unknown; }) => void; }, next: any) {
    try {
        console.log('hey')
    //   let { username, password } = req.body; 
     
    //   const hashed_password = md5(password.toString())
      const sql = `SELECT * FROM items`
      let q = await Mysql.getInstance().query(sql) as any
        console.log(q)
        if(q.length){
            let token = jwt.sign({ data: q }, 'secret')
            res.send({ status: 1, data: q, token: token });
        }else
        res.send({ status: 0, data: q});

      
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

  router.post('/purchase', async function (req: { body: { title: any; manufacturer: any; price: any; quantity: any; category: any; }; }, res: { send: (arg0: { status?: number; error?: unknown; data?: any; token?: any }) => void; }, next: any) {
    try {
    //   let { username, password } = req.body; 
     
    //   const hashed_password = md5(password.toString())
    const sql = `Insert Into items (title, manufacturer, price, quantity, category) VALUES ( ?, ?, ?, ?, ?)`

    let q = await Mysql.getInstance().query(sql,[req.body.title, req.body.manufacturer, req.body.price, req.body.quantity, req.body.category]) as any
    console.log(q)
    if(q.length){
        let token = jwt.sign({ data: q }, 'secret')
        res.send({ status: 1, data: q, token: token });
    }else
    res.send({ status: 0, data: q});

    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

  router.post('/update', async function (req: { body: { price: any; title: any; quantity: any; }; }, res: { send: (arg0: { status?: number; error?: unknown; data?: any; token?: any}) => void; }, next: any) {
    try {
    //   let { username, password } = req.body; 
     
    //   const hashed_password = md5(password.toString())
    const sql = 'UPDATE items SET price = ? WHERE title = ?'
    let q = await Mysql.getInstance().query( sql, [req.body.price, req.body.title]) as any
    if(q.length){
        let token = jwt.sign({ data: q }, 'secret')
        res.send({ status: 1, data: q, token: token });
    }else
    res.send({ status: 0, data: q});
    

    const sql2 = 'UPDATE items SET quantity = ? WHERE title = ?'
    q = await Mysql.getInstance().query(sql2, [req.body.quantity, req.body.title]) as any
    if(q.length){
        let token = jwt.sign({ data: q }, 'secret')
        res.send({ status: 1, data: q, token: token });
    }else
    res.send({ status: 0, data: q});
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

  module.exports = router;