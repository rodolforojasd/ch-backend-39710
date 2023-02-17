import fs from 'fs'
const rutaAbsoluta = ''
const raiz = ''//PS C:\Users\Rodolfo\Documents\Coderhouse\Node.JS\Clases
const restoRuta= '' // clase5/script.js
const rutaRelativa = `${raiz}/${restoRuta}`//
console.log(fs.readFileSync('../Desafio/desafio-02/script.js', 'utf-8'))