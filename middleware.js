const {productSchema , reviewSchema} = require('./schema') ; 

const validateProduct = (req , res , next)=>{
    const {name , price , img , desc} =  req.body ; 
    const {error} = productSchema.validate({name , price , img , desc}) ; 
    if(error){
        res.render('error',  {err: error.message}) ; 
    }
    next(); 
}
const validateReview =  (req , res , next)=>{
    const {rating , comment} =  req.body ; 
    const {error} = reviewSchema.validate({rating , comment}) ; 
    if(error){
        res.render('error' , {err: error.message}) ; 
    }
    next() ; 
}

module.exports = {validateProduct , validateReview}