import { v4 as uuidv4 } from 'uuid'
import fs from "fs/promises"

class ProductManager {
    debugger
    constructor(path){
        this.products = []
        this.path = path
    }

    async loadProducts(){
        const json = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(json)
    }
    async getProducts(){
        await  this.loadProducts()
        return this.products
    }

    async saveProducts(){
        const json = JSON.stringify(this.path, null,2)
        await fs.writeFile(this.path,json)
    }

    async addProduct(title,description,price,thumbnail,stock){
        
        await this.loadProducts()
        const product = new Product (0,title,description,price,thumbnail,0,stock)      
        const productByCode = this.products.find((el) => el.code === product.code)
        const productByTitle = this.products.find((el) => el.title === product.title)

        if (this.products.length === 0 && isNaN(product.price) === false && isNaN(product.stock ) === false){
            product.id = 1
            this.products.push(product)
            await this.saveProducts()
        }else if  (this.products.length > 0 && productByCode === undefined && productByTitle === undefined && isNaN(product.price) === false && isNaN(product.stock ) === false){
            product.id = this.products[this.products.length -1].id + 1
            this.products.push(product)
            await this.saveProducts()
        }else {
            console.log(`this product ${productByTitle} parameters types are wrong or it has a duplication, please verify and try again `)
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

    async updateProduct(propertyToChange,valueToUpdate, id,title,code){

        await this.loadProducts()
        const  findedProductIndex= 0
        if (id !== undefined && id < this.products.length){
            findedProductIndex = this.products.findIndex((product) => product.id === id)
            if (findedProductIndex > -1){
                this.products[findedProductIndex][propertyToChange] = valueToUpdate
                await this.saveProducts()
            }else throw "Product not found"
        }else{
            try{
                findedProductIndex = this.getProductsByTitleOrCode(title, code)
                this.products[findedProductIndex][propertyToChange] = valueToUpdate
                this.getProducts()
            }catch (error){
                throw error
            }try{
            findedProductIndex = this.getProductsByTitleOrCode(title, code)
            this.products[findedProductIndex][propertyToChange] = valueToUpdate
            await this.saveProducts()
            this.getProducts()
            }catch (error){
                throw error
            }
        }
        
        
    }

    deleteProduct(title,code){
      const  findedProduct = {}
      const findedProductIndex= 0
      try {
        findedProductIndex = this.products.findIndex((product) => product.title === title)
            if(findedProductIndex !== -1 && this.products[findedProductIndex].code === code){
                this.products.splice(findedProductIndex, 1)
            }else if (!title){
                findedProductIndex = this.products.findIndex((product) => product.code === code)
                if(findedProductIndex !== -1){
                    this.products.splice(findedProductIndex, 1)
                }else throw "Product is not in inventory"          
            }else if (!code){
                findedProduct = this.products.filter((product) => product.title === title)
                if(findedProduct.length === 1){
                    this.products.splice(findedProductIndex, 1)
                }else return (findedProduct, 'The element has more than one item, try adding the code')
            }else throw "Product is not in inventory"
                
      } catch (error) {
        return error
      }
    }

    getProductsByTitleOrCode(title, code){
    
        const  findedProduct = {}
        const findedProductIndex= 0
        try {
            findedProductIndex = this.products.findIndex((product) => product.title === title)
                if(findedProductIndex !== -1 && this.products[findedProductIndex].code === code){
                    return findedProductIndex
                }else if (!title){
                    findedProductIndex = this.products.findIndex((product) => product.code === code)
                    if(findedProductIndex !== -1){
                        return findedProductIndex
                    }else throw "Product is not in inventory"          
                }else if (!code){
                    findedProduct = this.products.filter((product) => product.title === title)
                    if(findedProduct.length === 1){
                        return findedProductIndex
                    }else return (findedProduct, 'The element has more than one item, try adding the code')
                }else throw "Product is not in inventory"
                    
        } catch (error) {
            return error
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

const productManager = new ProductManager('./static/productos.txt')

productManager.getProducts()

productManager.addProduct('producto de prueba','Este es un producto de prueba',200,'Sin imagen',25)

debugger
productManager.getProducts()


productManager.addProduct('producto de prueba','Este es un producto de prueba',200,'Sin imagen',25)

productManager.getProductById(1)

productManager.getProductById(2)

productManager.updateProduct('price',35,1)

debugger
productManager.getProductById(1)