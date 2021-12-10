"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comentario = exports.comentarioSchema = void 0;
const mongoose_1 = require("mongoose");
const usuarioComentario = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El campo nombre es necesario para la entidad usuario comentario"]
    },
    foto: {
        type: String,
        required: [true, "El campo foto es necesaria para el usuario comentario, aunque no tenga se puede almacenear el enlace de una foto generica"]
    },
});
exports.comentarioSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
    },
    imagen: {
        type: String,
    },
    usuario: {
        type: usuarioComentario,
        required: [true, "El campo usuario es necesario para la entidad comentario"]
    },
    fecha: {
        type: Date,
        required: [true, "El campo fecha es necesaria para el comentario"]
    },
    valoracion: {
        type: Number,
        required: []
    }
});
exports.comentarioSchema.add({
    respuestas: {
        type: [exports.comentarioSchema]
    }
});
;
;
exports.Comentario = (0, mongoose_1.model)('comentario', exports.comentarioSchema);
