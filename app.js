const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require("./to-do/to-do")
const listadoToDo = require("./to-do/to-do")

const {} = require("./to-do/to-do")


let comando = argv._[0];

switch( comando ) {

    case "crear": 
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea)
    break;

    case "listar": 
        let listado = listadoToDo.getListado();

        for ( let tarea of listado ) {
            console.log('======Por hacer========'.green)
            console.log(tarea.descripcion)
            console.log("Estado: ", tarea.completado )
            console.log('======================='.green)
        }
    break;

    case "actualizar": 
        let actulizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actulizado);
    break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado)
    break;

    default:
        console.log("Comando no reconocido");
}