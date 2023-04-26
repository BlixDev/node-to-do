const { rejects } = require("assert");
const { resolveCaa } = require("dns");
const fs = require("fs");
const { resolve } = require("path");
const { describe } = require("yargs");

let listadoToDo = [];

const guardarDB = () => {

    return new Promise( (resolve,rejects) => {

    let data = JSON.stringify(listadoToDo);

    fs.writeFile("db/data.json", data, (err) => {
        if (err) throw new Error("No se pudo grabar", err);
    })

    })  
}

const cargarDB = () => {

    try {

    listadoToDo = require('../db/data.json');

    } catch (error) {
        listadoToDo = []
    }
    
}

const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoToDo.push( porHacer );
    guardarDB();
    return porHacer 
}


const getListado = () =>{
    cargarDB()
    return  listadoToDo
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevaLista = listadoToDo.filter( tarea => tarea.descripcion !== descripcion);

    if( listadoToDo.length === nuevaLista.length){
        return false;
    } else {
        listadoToDo = nuevaLista;
        guardarDB();
        return true
    }



}

module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}