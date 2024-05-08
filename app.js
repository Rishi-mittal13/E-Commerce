const express =  require('express') ; 
const app =  express() ; 
const path = require('path') ;
const mongoose =  require('mongoose');
const seedDB =  require('./seed') ;
const ejsMate =  require("ejs-mate");
const methodOverride =  require("method-override") ; 
const flash = require('connect-flash');
const session =  require('express-session') ;
const passport = require('passport') ; 
const LocalStrategy =  require('passport-local') ; 
const User =  require('./models/User')

const productsRoutes =  require("./routes/Product");
const reviewRoutes =  require("./routes/review");
const authRoutes =  require("./routes/auth") ;

const configsession = {
        secret: 'keyboard cannm,t',
        resave: false,
        saveUninitialized: true,
}
mongoose.connect('mongodb://127.0.0.1:27017/Ecom') // it returns a promise(resolve , reject) ; 
.then(()=>{console.log("DB Connected Sucessfully")})
.catch(()=>{console.log("Some error ocuure)")}) ; 

app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs') ; 
app.set('views' , path.join(__dirname , 'views')) ; 
app.use(express.static(path.join(__dirname ,'public'))) ; // public folder . 
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method')) ;  
app.use(flash()) ; 
app.use(session(configsession)) ; 
app.use((req , res , next)=>{
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash('success') ;
    res.locals.error = req.flash('error') ;
    next() ;
})
//products route . 
app.use(productsRoutes) ; 
//review routes . 
app.use(reviewRoutes) ;
//auth routes . 
app.use(authRoutes) ; 




app.get('/' , (req , res)=>{
    res.send('Root me apka swagat hai ') ;
})



//passport

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));


//Seeding . 
// seedDB() ; // only one time . 

let PORT = 8000
app.listen(PORT , ()=>{
    console.log(`Server Connected At ${PORT}`) ;
})
