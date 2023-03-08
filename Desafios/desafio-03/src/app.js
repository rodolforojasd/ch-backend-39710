import express from 'express'
import  {ProductManager} from './ProductManager.js'
import { Product } from './ProductManager.js'
import { randomUUID } from 'crypto'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const productManager = new ProductManager('./static/products.json')

// productManager.addProduct('Añejo Patrón','Tequila 100% Agave, Hecho en México','750 ml', 6800,'./static/img/products/anejopatron.jpg',25)
// productManager.addProduct('Bombay Shapphire','London Dry Gin, Alc.40%','700ml',4800,'./static/img/products/bombay-saphire.webp',25)
// productManager.addProduct('Chimay Bleu','Peres Trappistes, hecho en Bélgica, Alc. 9%', '300ml', 2400,'./static/img/products/Chimay bleu.jpg',25)
// productManager.addProduct('Cerveza Ciney','Cerveza Belga Blonde, Alc.10%','330ml',2420,'./static/img/products/ciney-blonde.jpg',25)
// productManager.addProduct('Lindemans Kriek Cherry','Cerveza Lambic, sabor cereza, Hecha en Bélgica','355ml',2600,'./static/img/products/Lindemans_Kriek_BottleGlass_website_2022-1.png',25)
// productManager.addProduct('Delirium Tremens Blonde','Cerveza Rubia, Hecha en Bélgica, Alc. 8,5%','330ml',2400,'./static/img/products/delirium-tremens-blonde.jpg',25)
// productManager.addProduct('El Profeta','Ginebra, Industria Argentina, Alc. 40%','750 ml',2400,'./static/img/products/ginebra-el-profeta-750-ml.jpg',25)
// productManager.addProduct('Luca Old Vine Malbec','Uco Valley ','750 ml',3100,'./static/img/products/luca-malbec.png',25)
// productManager.addProduct('Zarapaca XO','Gran Reserva Especial, Solera, Hecho en Guatamala','750 ml',7800,'./static/img/products/ron-zaracapa-xo.webp',25)
// productManager.addProduct('Rutini Malbec','Mendoza, alc. 18% ','750 ml',2790,'./static/img/products/rutini-malbec-2021.png',25)
// productManager.addProduct(' Santa Teresa 1796','Ron Venezolano Extra Añeejo, Alc.40%','750 ml',7000,'./static/img/products/santa-teresa-1796.jpg',25)
// productManager.addProduct('El Enemigo, Malbec','Mendoza. Anio 2021','750 ml',3560,'./static/img/products/vino-el-enemigo-malbec-botella-750ml-a582a8a18e.webp',25)


app.get('/products', (req,res)=>{
    let  products = productManager.getProducts()
    let limit = req.query.limit
    if(limit > products.lenght ||!Number.isNaN(limit)) return res.send(products)
    let filteredProducts = products.filter((product)=> product[product.id-1] < limit )
    res.send({products: filteredProducts})
})

app.get('/:idProduct', (req,res)=>{
    let idProduct = req.params.idProduct
    let product= productManager.getProductById(idProduct)

    if(!product) return res.sendFile({error:`Product not found`})
    
    res.send({product})
})

app.listen(8080,()=> console.log(`Waiting for request!`))