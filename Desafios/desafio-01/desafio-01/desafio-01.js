/* class ProductManager{
    constructor(title, description, price, thumbnail, code, stock){
        this.title= title;
        this.description= description;
        this.price= price;
        this.thumbnail= thumbnail;
        this.code= code;
        this.stock=stock;
    }
    static 
} */
const user= prompt(`Por favor entra tu nombre`)
let age= prompt(`Por favor ingresa tu edad en numeros`)
age = parseInt(age)
let ageBlock=""


if (age<=10){
    ageBlock= "ninio"
}else if (age<=18 && age>11){
    ageBlock="adolescente"
}else if(age>=19 && age<=80){
    ageBlock="adulto"
}else {ageBlock="anciano"}

alert(`tu eres un ${ageBlock}`)