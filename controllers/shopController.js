const Cart = require("../model/cart");
const Product = require("../model/product");

const mysql = require("mysql");

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node-ecom-sql',
    password : ''
})

exports.getHome = ((req,res) => {
    const SqlQuery = `INSERT INTO products (title,price,description,img) VALUES ('Lotto','5200','Wear the new venom','/images/image.png');`
    db.query(SqlQuery,(err,data) => {
        if(err){
            console.log(err);
        }
        else{
            Product.fetchproducts(product => {
                res
                .status(200)
                .render('shop/index',{
                    title : 'Home',
                    path: req._parsedOriginalUrl.path,
                    itemData : product
                })
            })
        }
    })
})



exports.getShopProducts = ((req,res) => {
    Product.fetchproducts(product => {
        res
        .status(200)
        .render('shop/show-product',{
            title : 'Products',
            path: req._parsedOriginalUrl.path,
            itemData : product
        })
    })
})

exports.getProductByID = ((req,res,next) => {
    const id = req.params.id;
    Product.findProductByID(id,item => {
        res
        .status(200)
        .render('shop/product/each',{
            title : `Product | ${id}`,
            path : '/products',
            pageID : id,
            item
        })
    })
})

exports.getOrders = ((req,res) => {
    res
    .status(200)
    .render('shop/order',{
        title : 'Your orders',
        path: req._parsedOriginalUrl.path,
    })
})

exports.getShopCart = ((req,res) => {
    res
    .status(200)
    .render('shop/cart',{
        title : 'Your Cart',
        path: req._parsedOriginalUrl.path,
    })
})

exports.postProductInCart = (req,res) => {
    const { productID } = req.body;
    Product.findProductByID(productID,product => {
        Cart.addToCart(productID,product.price)
    })
    res.redirect('/cart');
} 