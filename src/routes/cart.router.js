import {Router} from "express";
import CartManager from "../managers/CartManagerFile.js";


const router = Router();
const path = "carts.json";
const cartManager = new CartManager(path);

router.post('/', async (req,res)=>{
    console.log(req.body)
    const id = await cartManager.addCart(req.body)
    
    res.send({
        status:"succes",
        cartid:id
    })
})

router.get('/:pid', async (req,res)=>{
    let cart = await cartManager.getCartById(parseInt(req.params.pid))

    if(!cart){
        return res.send({
            error: 'Carrito no encontrado.'
        })}
    res.send({
        status:"succes",
        cart: cart
    })
}) 

router.post('/:cid/product/:pid', async (req,res)=>{

    let cart = await cartManager.addProductoToCart(parseInt(req.params.cid),parseInt(req.params.pid))

    if(!cart){
        return res.send({
            error: 'Carrito no encontrado.'
        })}
    res.send({
        status:"succes",
        cart: cart
    })
}) 


export {router as cartRouter}