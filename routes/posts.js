const router = require('express').Router();
const auth = require('./verifyToken');


router.get('/posts',auth,(req,res)=>{
    res.json({
        posts:{
            title:"this is private post",
            description:"this is the private post and only the logged in people can see this"
         }
    });
});
module.exports = router;