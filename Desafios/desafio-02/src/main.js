
import { randomUUID } from 'crypto'
import fs from "fs/promises"

class ProductManager {
    debugger
    constructor(path){
        this.products = []
        this.path = path
    }

    async loadProducts(){
        debugger
        const json = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(json)
    }
    async getProducts(){
        await  this.loadProducts()
        return this.products
    }

    async saveProducts(){
        const json = JSON.stringify(this.products, null,2)
        await fs.writeFile(this.path,json)
    }

    async addProduct(title,description,volumeOrWeight,price,thumbnail,stock){
        
       
        const product = new Product (title,description,volumeOrWeight,price,thumbnail,stock)      
        const productByCode = this.products.find((el) => el.code === product.code)
        const productByTitle = this.products.find((el) => el.title === product.title)

        if (this.products.length === 0 && isNaN(product.price) === false && isNaN(product.stock ) === false){
            product.id = 1
            this.products.push(product)
            await this.saveProducts()
        }else if  (this.products.length > 0 && productByCode === undefined && productByTitle === undefined && isNaN(product.price) === false && isNaN(product.stock ) === false){
            this.loadProducts()
            product.id = this.products[this.products.length -1].id + 1
            this.loadProducts()
            this.products.push(product)
            await this.saveProducts()
        }else {
            console.log(`this product  parameters types are wrong or it has a duplication, please verify and try again `)
        }
    }

    async getProductById(id){

       await  this.loadProducts()

        const productById = this.products.find((product) => product.id === id)
        if (productById !== undefined){
            return  productById
        }else {
            throw  "Not found"
        }
    }

    async updateProduct(propertyToChange,valueToUpdate, propertyToSearch, valueToSeach){
        let products = await this.loadProducts()
        let findedProductIndex = null
     
        if( ["id","title","code"].includes(propertyToSearch) && products.some((product)=>{Object.keys(product).includes(propertyToChange)})){
            findedProductIndex = products.findIndex((product) => product.propertyToSearch === valueToSeach)
        }else{
            throw "Invalid inputs"
        }

        if (findedProductIndex > -1){
            products[findedProductIndex][propertyToChange] = valueToUpdate
            await this.saveProducts()
        }else{
            throw "Product not found"

        }
    }

            
    async getProductByProperty(propertyToSearch, valueToSeach) {
        let products = await this.loadProducts()
        let findedProductIndex = null
        if( ["id","title","code"].includes(propertyToSearch)){
            findedProductIndex = products.findIndex((product) => product.propertyToSearch === valueToSeach)
        }else{
            throw "You are restricted to searches by title, id or code, use filter methods fro other properties"
        }
        if (findedProductIndex > -1){
            return products[findedProductIndex]
        } else{ throw 'product not found'}    
    }
        

    

    async deleteProduct(propertyToSearch, valueToSeach){
        let findedProduct = getProductByProperty(propertyToSearch, valueToSeach)

        const resetId = ()=>{this.products.map((product)=>{
           if(product.id > findedProduct.id){
                product.id = product.id - 1 
           }
        })}

        try{
            if(findedProduct.id === 1){
                this.products.shift()
                this.products = resetId()           
            }           
            if(findedProduct.id === this.products.length){
                this.products.pop()

            }else{
                this.products.splice(this.products[findedProduct.id -1], 1)
                this.products = resetId()
            }
            await this.saveProducts()
        }catch(error){console.log(error)}
    }

  }
    



 class Product {
    constructor(title,description,volumeOrWeight,price,thumbnail,stock,code,id){
       this.title = title
       this.description = description
       this.volumeOrWeight= volumeOrWeight
       this.price = parseFloat(price)
       this.thumbnail= thumbnail
       this.stock = parseInt(stock)
       this.code  = randomUUID()
       this.id = 0
    }

}

debugger
const productManager = new ProductManager('./static/productos.json')

productManager.addProduct('Añejo Patrón','Tequila 100% Agave, Hecho en México','750 ml', 6800,'./static/img/products/anejopatron.jpg',25)
productManager.addProduct('Bombay Shapphire','London Dry Gin, Alc.40%','700ml',4800,'./static/img/products/bombay-saphire.webp',25)
productManager.addProduct('Chimay Bleu','Peres Trappistes, hecho en Bélgica, Alc. 9%', '300ml', 2400,'./static/img/products/Chimay bleu.jpg',25)
productManager.addProduct('Cerveza Ciney','Cerveza Belga Blonde, Alc.10%','330ml',2420,'./static/img/products/ciney-blonde.jpg',25)
productManager.addProduct('Lindemans Kriek Cherry','Cerveza Lambic, sabor cereza, Hecha en Bélgica','355ml',2600,'./static/img/products/Lindemans_Kriek_BottleGlass_website_2022-1.png',25)
productManager.addProduct('Delirium Tremens Blonde','Cerveza Rubia, Hecha en Bélgica, Alc. 8,5%','330ml',2400,'./static/img/products/delirium-tremens-blonde.jpg',25)
productManager.addProduct('El Profeta','Ginebra, Industria Argentina, Alc. 40%','750 ml',2400,'./static/img/products/ginebra-el-profeta-750-ml.jpg',25)
productManager.addProduct('Luca Old Vine Malbec','Uco Valley ','750 ml',3100,'./static/img/products/luca-malbec.png',25)
productManager.addProduct('Zarapaca XO','Gran Reserva Especial, Solera, Hecho en Guatamala','750 ml',7800,'./static/img/products/ron-zaracapa-xo.webp',25)
productManager.addProduct('Rutini Malbec','Mendoza, alc. 18% ','750 ml',2790,'./static/img/products/rutini-malbec-2021.png',25)
productManager.addProduct(' Santa Teresa 1796','Ron Venezolano Extra Añeejo, Alc.40%','750 ml',7000,'./static/img/products/santa-teresa-1796.jpg',25)
productManager.addProduct('El Enemigo, Malbec','Mendoza. Anio 2021','750 ml',3560,'./static/img/products/vino-el-enemigo-malbec-botella-750ml-a582a8a18e.webp',25)

productManager.getProducts()

// productManager.addProduct('producto de prueba','Este es un producto de prueba',200,'Sin imagen',25)

debugger
console.log(productManager.getProducts())


// productManager.addProduct('producto de prueba','Este es un producto de prueba',200,'Sin imagen',25)

// productManager.getProductById(1)

// productManager.getProductById(2)

// productManager.updateProduct('price',35,1)

// debugger
// productManager.getProductById(1)