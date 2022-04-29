
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

/* GET users listing. */
router.post('/create', async function (req, res, next) {
    try {
  
      let {items} = req.body.items; 
      let {username} = req.body.name; 

      console.log(req.body.items)
  
  
      const checkUsername = `Select username FROM users WHERE username = ?`;
      con.query(checkUsername, [username], (err, result, fields) => {
        if(result){
            
          const sql = `Insert Into orders (items, date, accountDetails, shippingDetails) VALUES ( ?, ?, ?, ?)`
          con.query(
            sql, [req.body.items, req.body.date, req.body.accountDetails, req.body.shippingDetails],
          (err, result, fields) =>{
              
            if(err){
              console.log(err)
  
              res.send({ status: 0, data: err });
            }else{
              let token = jwt.sign({ data: result }, 'secret')
              res.send({ status: 1, data: result, token : token });
            }
           
          })
        }
      });
     
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

module.exports = router;