//npm install uuid
import { v4 as uuidv4 } from 'uuid'

class ProductManager {
    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title,description,price,thumbnail,stock){
        const product = new Product (0,title,description,price,thumbnail,0,stock)
        
        const productByCode = this.products.find((el) => el.code === product.code)

        if (this.products.length === 0 && isNaN(product.price) === false && isNaN(product.stock ) === false){
            product.id = 1
            this.products.push(product)
        }else if  (this.products.length > 0 && productByCode ==='undefined' && isNaN(product.price) === false && isNaN(product.stock ) === false){
            product.id = this.products[this.products.length -1].id + 1
            this.products.push(product)
        }else {
            console.log(`this product ${productByCode} parameters are wrong or its code is repeated, please verify and try again `)
        }
    }

    getProductById(id){
        const productById = this.products.find((product) => product.id === id)
        if (productById !== 'undefined'){
            console.log(productById)
        }else {
            console.log('Not found.')
        }
    }
}


class Product {
    constructor(id,title,description,price,thumbnail,code,stock){
        this.id= 0
       this.title = title
       this.description = description
       this.price = parseFloat(price)
       this.thumbnail= thumbnail
       this.code  = uuidv4()
       this.stock = parseInt(stock)
    }

  
}

const productManager = new ProductManager()

productManager.getProducts()

productManager.addProduct('producto de prueba','Este es un producto de prueba',200,'Sin imagen',25)

productManager.getProducts()

productManager.addProduct('producto de prueba','Este es un producto de prueba',200,'Sin imagen',25)

productManager.getProductById(1)
productManager.getProductById(2)
productManager.getProducts()