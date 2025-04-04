const express = require('express')
const cors = require('cors')
require('./DataBase/config')
const User = require('./DataBase/User')

const app = express()
app.use(express.json())
app.use(cors());

app.post("/register", async (req, resp)=> {
    let user = new User(req.body)
    let result = await user.save()
    resp.send(result)  
})

app.post("/login", async (req, resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body)
        if(user){
            resp.send(user)
        }else{
            resp.send({result: 'No User Found'})
        }
    }else{
        resp.send({result: 'No User Found'})
    }


    
})

app.listen(5003) 