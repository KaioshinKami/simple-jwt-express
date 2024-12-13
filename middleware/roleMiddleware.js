const jwt = require("jsonwebtoken");
const {secret} = require("../config");

module.exports=function (roles){
    return function(req, res, next){
        if(req.method==='Options'){
            next()
        }

        try{
            const token=req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(400).json({message:'Пользователь не автаризован'})
            }
            const {roles:userRoles}=jwt.verify(token, secret)
            let hashRole=false;
            userRoles.forEach((role)=>{
                if(roles.includes(role)){
                    hashRole=true
                }
            })
            if(!hashRole){
                return res.status(403).json({message:'У вас нет доступа'})
            }

            next()
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message:'Пользователь не автаризован'})
        }
    }
}