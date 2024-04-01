const express = require('express') ; 
const router =  express.Router() ;
const User =  require('../models/User') ; 

router.get('/register'  , (req , res)=>{
    res.render('auth/signup') ; 
})

router.post('/register' , async (req ,res)=>{
    let {email , username , password} = req.body ; 
    const user = new User({username , email}) ; 
    const userResgister =  await User.register(user , password) ; 
    res.send(userResgister) ; 

})

router.get('/login' , (req , res)=>{
    res.render('auth/login') ; 
})


module.exports = router  ; 
