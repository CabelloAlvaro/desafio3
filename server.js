const express = require('express');
const app = express();

const Contenedor = require('./Contenedor');
const productos = new Contenedor("productos.txt");

const PORT = process.env.PORT || 8080

//PRODUCTOS
let producto1 = {"title": "Silla gamer", 
    "precio" : 65000,
    "url" : "https://www.google.com/search?q=silla+gamer&oq=silla+gamer&aqs=chrome..69i57j0i512l5j0i131i433i512j0i512l3.1664j0j7&sourceid=chrome&ie=UTF-8"
}

let producto2 = {"title": "escritorio gamer",
    "precio" : 35000,
    "url" : "https://www.google.com/search?q=escritorio+gamer&oq=escritorio+gamer&aqs=chrome.0.0i433i512j0i512l9.2984j0j9&sourceid=chrome&ie=UTF-8"
}

let producto3 = {"nombre": "producto3",
    "precio" : 3,
    "url" : "http//irafoto1.com"
}

//Cargar productos al txt
const usarContenedor = async () => {
    await productos.save(producto1)
    await productos.save(producto2)
    await productos.save(producto3)

}

usarContenedor()


const getProduct = async ()=>{
    let listProduct = JSON.stringify(await productos.getAll());
    return listProduct;
}
const getProductRandom = async () =>{
    let length = await productos.getLength()
    let random = Math.floor(Math.random() * length)
    let productRandom = await productos.getAll();
    console.log(length, random, productRandom)
    return JSON.stringify(productRandom[random]);
}


//Prueba
app.get('/', (req, res) => {
    res.send(`raiz`);
})

app.get('/productos',async (req, res) => {
    res.send(`Lista de productos: ${await getProduct()}`);
})

app.get('/productoRandom',async (req, res) => {
    res.send(`El producto es: ${await getProductRandom()}`);
})

const server = app.listen(PORT,() => {console.log('Server Runing')});
server.on('error', error => console.log(`Error ${error}`));