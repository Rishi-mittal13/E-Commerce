const express = require('express') ; 
const router =  express.Router() ;
const User =  require('../models/User') ; 
const passport = require('passport') ; 

router.get('/register'  , (req , res)=>{
    res.render('auth/signup') ; 
})

router.post('/register' , async (req ,res)=>{
    let {email , username , password} = req.body ; 
    const user = new User({username , email}) ; 
    const userResgister =  await User.register(user , password) ; 
    res.redirect('/login'); 
})

router.get('/login' , (req , res)=>{
    res.render('auth/login') ; 
})

//for login the user  
router.post('/login' , passport.authenticate('local', { failureRedirect: '/login' }),

    function(req, res) {
        req.flash('success' , `Welcome Back ${req.user.username}`) ; 
        res.redirect('/products');
} )


//for logout 

router.get('/logout' , (req , res)=>{
    ()=>{
        req.logout() ; 
    }
    req.flash('success' , `Logout Successfully`) ; 
    res.redirect('/login');
})


module.exports = router  ; 
