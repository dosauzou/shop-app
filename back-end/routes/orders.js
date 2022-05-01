
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

      console.log(req.body)
  
  
      const checkUsername = `Select username FROM users WHERE username = ?`;
      con.query(checkUsername, [username], (err, result, fields) => {
        if(result){
            
          const sql = `Insert Into orders (items, date) VALUES ( ?, ?)`
          con.query(
            sql, [JSON.stringify(req.body.items), req.body.date],
          (err, result, fields) =>{

            if(err){
              console.log(err)
  
            }else{
              let token = jwt.sign({ data: result }, 'secret')
            }
          })
        }
      }).then(
            con.query((err, result, fields) => {
                
                  const sql = `Insert Into accountDetails (cccvv, ccexpiration, ccname, ccnumber) VALUES (?, ?, ?, ?)`
                  con.query(
                    sql, [req.body.accountDetails.cccvv,req.body.accountDetails.ccexpiration, req.body.accountDetails.ccname, req.body.accountDetails.ccnumber],
                  (err, result, fields) =>{
        
                    if(err){
                      console.log(err)
          
                    }else{
                      let token = jwt.sign({ data: result }, 'secret')
                    }
                })
             } ,
             con.query((err, result, fields) => {
                
                const sql = `Insert Into shippingDetails (address, address2, state, country, zip) VALUES ( ?, ?, ?, ?, ?)`
                con.query(
                  sql, [req.body.shippingDetails.address, req.body.shippingDetails.address2, req.body.shippingDetails.state, req.body.shippingDetails.country, req.body.shippingDetails.zip],
                (err, result, fields) =>{
                        console.log(result)
                  if(err){
                    console.log(err)
        
                  }else{

                    let token = jwt.sign({ data: result }, 'secret')
                    res.send({ status: 1, data: result, token : token });
                  }
              })
           } 
             )
      )
      )
     
    } catch (error) {
      res.send({ status: 0, error: error });
    }
  });

module.exports = router;