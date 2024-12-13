const jwt=require('jsonwebtoken')
const {secret}=require('../config')

module.exports=function (req, res, next){
    if(req.method==='Options'){
        next()
    }
    
    try{
        const token=req.headers.authorization.split(' ')[1]
        if(!token){
            res.status(400).json({message:'Пользователь не автаризован'})
        }
        const decodedData=jwt.verify(token, secret)
        req.user=decodedData
        next()
    }
    catch (e) {
        console.log(e)
        res.status(400).json({message:'Пользователь не автаризован'})
    }
}