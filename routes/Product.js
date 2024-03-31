const express = require('express');
const Product = require('../models/Product');
const router = express.Router() //mini instance
const {validateProduct } =  require('../middleware') ; 

//to show all the products . 
router.get('/products' , async(req,res)=>{
    try{
        let products = await Product.find({});
        res.render('products/index' , {products});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    }
})
//to create ne products . 
router.get('/products/new' ,  (req , res)=>{
    try{
        res.render('products/new' ) ; 
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    }
})

//to add data of producst in database . 
router.post('/products' , validateProduct , async  (req , res)=>{
    try{
        let {name ,  price ,  img , desc} =  req.body ;  
        await Product.create({name ,  price ,  img , desc});
        req.flash('success' , 'Product Added Successfully') ; 
        res.redirect("/products") ; 
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    }
})

//to show a particular product  .  
router.get("/products/:id" ,  async (req , res)=>{
    try{
        let {id} =  req.params   ; 
        let foundProduct =  await Product.findById(id).populate('reviews'); 
        res.render('products/show' , {foundProduct }) ; 
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    }

})
//to show Edit Form .  
router.get("/products/:id/edit", async (req , res)=>{
    try{
        let {id} =  req.params   ; 
        let foundProduct =  await Product.findById(id) ; 
        res.render("products/edit" ,  {foundProduct}) ;  
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    }
})

//to update changes in dataBases  . 
router.patch("/products/:id" , validateProduct ,  async (req , res)=>{
    try{
        let {id} = req.params  ; 
        let {name ,  price ,  img , desc} =  req.body ; 
        await Product.findByIdAndUpdate(id , {name ,  price ,  img , desc});
        req.flash('success' , 'Product Edited Successfully') ; 
        res.redirect(`/products/${id}`) ; 
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    }
})

//to delete any product . 

router.delete("/products/:id" , async (req , res)=>{
    try{
        let {id} = req.params ; 
        await Product.findByIdAndDelete(id);
        req.flash('success' , 'Product Deleted Successfully') ; 
        res.redirect('/products') ; 
    }
    catch(e){
        res.status(500).render('error' , {err:e.message}) ; 
    }
})

module.exports = router;







