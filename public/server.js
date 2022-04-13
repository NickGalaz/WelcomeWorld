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
        // let fecha = new Date();

        if (req.url.includes('/crear')) {
            fs.writeFile(nombre, contenido, () => {
                // let fecha1 = fecha.find((f) => f.dd > 0);
                res.writeHead(200, {
                    'Content-Type': 'Text/html;Charset=UTF-8'
                });
                res.write(`Archivo creado con éxito con fecha ${new Date()}!`)
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
                res.write(`Archivo ${name} renombrado por ${renombre} con fecha ${new Date()}.`);
                res.end();
            });
        } else if (req.url.includes('/eliminar')) {
            const eliminar = params.archivo;
            fs.unlink(nombre, (err, data) => {
                res.writeHead(200, {
                    'Content-Type': 'Text/html;Charset=UTF-8'
                });
// ESTO ES EL PUNTO 9
                res.write(`Tu solicitud para eliminar el archivo ${nombre} se está procesando.`);
                setTimeout(() => {
                    // MODIFICAR POR LO TUYO CLAUDITO <3
                    res.write(`<br> Archivo ${eliminar} eliminado con éxito con fecha ${new Date()}.`);
                    // --------------
                    res.end();
                }, 3000)
            });
        } else {
            res.write('URL no corresponde');
            res.end();
        }
    })
    .listen(puerto, () => console.log(`Escuchando en el puerto ${puerto}`));