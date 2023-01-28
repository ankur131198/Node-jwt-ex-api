const express = require("express");

const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

const app = express()

app.get("/", (req, resp) => {
    resp.json({
        message: "sample api"
    });
});

app.post("/create-user", (req, resp) => {
    const user = {
        username: "Ankur",
        password:"abc123"
    }
    jwt.sign({ user }, secretKey, { expiresIn: '3000s' }, (err, token) => {   /* jwt.sign has following parameters:
                                                                               1-details which u want
                                                                               2-security key(secret key)
                                                                               3-duration(expiry time)
                                                                               4- Call- back function(err,token)
                                                                               */
        resp.json({           // json is a function
            token
        })
    })

  app.post("/validate-user",verifyToken,(req,resp)=>{     // this is api
        jwt.verify(req.token,secretKey,(err,authData)=>{
            if(err)
            {
                resp.send({result:"Token is invalid"});
            }
            else{
                resp.json({
                    message:"Profile has been accessed",
                    authData
                })
                }
            })
  });  


    function verifyToken(req,resp,next){
          const bearerHeader=req.headers['authorization'];
          if(typeof bearerHeader !=='undefined'){
               const bearer=bearerHeader.split(" ");
               const token=bearer[1];
               req.token=token;
               next();  //This function takes the command to the profile api
               }
          else{
            resp.send({
                result:"Token is not valid"
            })
          }
          next();
    }
    
})


app.listen(4000);