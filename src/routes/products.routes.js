import {Router} from "express";
import ProductManager from "../managers/ProductManagerFile.js";


const router = Router();
const path = "products.json";
const productManager = new ProductManager(path);

router.get('/', async (req,res)=>{
    
    const limit = req.query.limit;

    let allProducts = await productManager.getProducts();

    if(!limit){
        return res.send({
            status:"succes",
            productos: allProducts
        })
    }

    const result = allProducts.filter((p,index) => index<limit);
    res.send({
        status:"succes",
        productos: result
    })

})

router.get('/:pid', async (req,res)=>{
    let product = await productManager.getProductById(parseInt(req.params.pid))

    if(!product){
        return res.send({
            error: 'Producto no encontrado.'
        })}
    res.send({
        status:"succes",
        product: product
    })
}) 

router.post('/', async (req,res)=>{
    //validacion de todos los campos
    if(typeof req.body.title === "string" && 
    typeof req.body.description === "string" &&
    // typeof req.body.thumbnail === "string" &&
    typeof req.body.code === "string" &&
    typeof req.body.price === "number" &&
    typeof req.body.stock === "number" &&
    typeof req.body.status === "boolean" &&
    typeof req.body.category === "string")
{
    //validacion OK
    productManager.addProduct(req.body);
    res.send({
        status:"succes",
        product: req.body
    })

}
else{
    res.send({
        error:"Datos no validos"
    })
}
})

router.put('/:pid', async (req,res)=>{
    const oldData= await productManager.updateProduct(parseInt(req.params.pid),req.body);

    if(oldData)
    {
        res.send({
            status:"succes"
        })}
    else{
        res.send({
            error:"Datos no validos"
        })}
})

router.delete('/:pid', async (req,res)=>{
    const status= await productManager.deleteProduct(parseInt(req.params.pid));
    if(status !=-1)
    {
        res.send({
            status:"succes"
        })}
    else{
        res.send({
            error:"Producto no encontrado"
        })}
})

export {router as productRouter};