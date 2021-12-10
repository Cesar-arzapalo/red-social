"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const comentario_route_1 = __importDefault(require("./routes/comentario.route"));
const PORT = +process.env.PORT || 2800;
const servidor = new server_1.Server(PORT);
//Body parser
servidor.app.use(body_parser_1.default.urlencoded({ extended: true }));
servidor.app.use(body_parser_1.default.json());
//Cors 
servidor.app.use((0, cors_1.default)());
//rutas del app
servidor.app.use('/comentario', comentario_route_1.default);
//conectar db
mongoose_1.default.connect('mongodb+srv://admin:12345@cluster0.bcg8b.mongodb.net/proyecto?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos en linea');
});
//levantar express
servidor.start(() => {
    console.log(`Servidor de la base de datos corriendo en el puerto ${servidor.port}`);
});
