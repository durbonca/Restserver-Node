const express = require('express');
const cors = require('cors');
const { dbConection } = require('../db/config');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.usuariosRoutePath = '/api/users';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Directorio publico
        this.app.use(express.static('public'));
        // Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosRoutePath, require('../routes/users.routes'));
    }

    listen() {
        this.app.listen(this.PORT, (req, res) => {
            console.log('Servidor corriendo en el puerto', this.PORT);
        });
    }
}

module.exports = Server;