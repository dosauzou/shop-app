const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ShopApp"
});

router.get('/display', async function (req, res, next) {
    try {
    //   let { username, password } = req.body; 
     
    //   const hashed_password = md5(password.toString())
      const sql = `SELECT * FROM items`
      con.query(
        sql, 
      function(err, result, fields){
          console.log(result)
        if(err){
          res.send({ status: 0, data: err });
        }else{
          let token = jwt.sign({ data: result }, 'secret')
          res.send({ status: 1, data: result, token: token });
        }
       
      })
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

  router.post('/purchase', async function (req, res, next) {
    try {
    //   let { username, password } = req.body; 
     
    //   const hashed_password = md5(password.toString())
    const sql = `Insert Into items (title, manufacturer, price, quantity, category) VALUES ( ?, ?, ?, ?, ?)`
    con.query(
      sql, [req.body.title, req.body.manufacturer, req.body.price, req.body.quantity, req.body.category],
    (err, result, fields) =>{

      if(err){
        console.log(err)

      }else{
        let token = jwt.sign({ data: result }, 'secret')
      }
    })
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

  router.post('/update', async function (req, res, next) {
    try {
    //   let { username, password } = req.body; 
     
    //   const hashed_password = md5(password.toString())
    const sql = 'UPDATE items SET price = ? WHERE title = ?'
    con.query(
      sql, [req.body.price, req.body.title],
    (err, result, fields) =>{

      if(err){
        console.log(err)

      }else{
        let token = jwt.sign({ data: result }, 'secret')
      }
    })
    const sql2 = 'UPDATE items SET quantity = ? WHERE title = ?'
    con.query(
      sql2, [req.body.quantity, req.body.title],
    (err, result, fields) =>{

      if(err){
        console.log(err)

      }else{
        let token = jwt.sign({ data: result }, 'secret')
      }
    })
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

  module.exports = router;