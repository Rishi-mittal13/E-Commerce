const express = require('express');
const router = express.Router() //mini instance
const Review = require('../models/Review');
const Product =  require('../models/Product') ; 
const {validateReview} = require('../middleware') ; 

router.post('/products/:id/review' , validateReview ,  async (req , res)=>{
    try{
        let {id} =  req.params  ; 
        let {rating , comment} = req.body  ;  
        const product = await Product.findById(id) ; 
        // console.log(rating)
        const review =  new Review({rating , comment}) ; 
        product.reviews.push(review) ; 
        await review.save() ; 
        await product.save() ; 
        res.redirect(`/products/${id}`) ;
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    } 
})
module.exports = router ; 