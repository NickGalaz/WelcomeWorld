const http = require('http');
const url = require('url');
const fs = require('fs');
const puerto = 8080;

http
    .createServer((req, res) => {
        const params = url.parse(req.url, true).query;
        console.log('params: ', params);
        const nombre = params.archivo;
        const contenido = params.contenido;


        //FECHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA   _--> demás cambiar las respuestas a superfecha
        let dia = new Date().getDate();
        let mes = new Date().getMonth() + 1;
        let anio = new Date().getFullYear();
        let fechapro = (dia, mes, anio) => {
            let diapro = dia;
            let mespro = mes;
            if (dia < 10) { diapro = `0${dia}` };
            if (mes < 10) { mespro = `0${mes}` };
            return `${diapro}/${mespro}/${anio}`
        };
        let superfecha = fechapro(dia, mes, anio)



        if (req.url.includes('/crear')) {
            fs.writeFile(nombre, contenido, () => {
                res.writeHead(200, {
                    'Content-Type': 'Text/html;Charset=UTF-8'
                });
                res.write(`Archivo creado con éxito con fecha ${superfecha}!`);
                // res.write('Archivo creado con éxito con fecha!');
                res.end();
            });
        } else if (req.url.includes('/leer')) {
            fs.readFile(nombre, (err, data) => {
                res.write(data);
                res.end();
            });
        } else if (req.url.includes('/renombrar')) {


            const renombre = params.nuevoNombre;
            const name = params.nombre;
            fs.rename(name, renombre, (err, data) => {
                res.writeHead(200, {
                    'Content-Type': 'Text/html;Charset=UTF-8'
                });
                res.write(`Archivo ${name} renombrado por ${renombre} con fecha ${superfecha}.`);
                res.end();
            });
        } else if (req.url.includes('/eliminar')) {
            const eliminar = params.archivo;
            fs.unlink(nombre, (err, data) => {
                res.writeHead(200, {
                    'Content-Type': 'Text/html;Charset=UTF-8'
                });
                res.write(`Tu solicitud para eliminar el archivo ${nombre} se está procesando.`);
                setTimeout(() => {
                    res.write(`<br>Archivo ${eliminar} eliminado con éxito con fecha ${superfecha}.`);
                    res.end();
                }, 3000)
            });
        } else {
            res.write('URL no corresponde');
            res.end();
        }
    })
    .listen(puerto, () => console.log(`Escuchando en el puerto ${puerto}`));