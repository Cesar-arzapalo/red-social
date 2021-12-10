"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentario_model_1 = require("../models/comentario.model");
const comentarioRoutes = (0, express_1.Router)();
;
let getComentarioQuery = (req) => {
    let query = {};
    if (req.query.descripcion != null) {
        query.descripcion = (req.query.descripcion);
    }
    if (req.query.imagen != null) {
        query.imagen = (req.query.imagen);
    }
    if (req.query.usuario != null) {
        query.usuario = (req.query.usuario);
    }
    if (req.query.fecha != null) {
        query.fecha = (req.query.fecha);
    }
    if (req.query.respuestas != null) {
        query.respuestas = (req.query.respuestas);
    }
    return query;
};
comentarioRoutes.get('/', (req, resp) => {
    let query = getComentarioQuery(req);
    comentario_model_1.Comentario.find(query)
        .then(comentarioDB => resp.json({ ok: true, mensaje: comentarioDB }))
        .catch(err => resp.json({ ok: false, mensaje: err }));
});
comentarioRoutes.post('', (req, resp) => {
    const proveedor = {
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        usuario: req.body.usuario,
        fecha: req.body.fecha,
        respuestas: req.body.respuestas
    };
    comentario_model_1.Comentario.create(proveedor)
        .then(comentarioDB => resp.json({ ok: true, mensaje: comentarioDB }))
        .catch(err => resp.json({ ok: false, mensaje: err }));
});
comentarioRoutes.put('', (req, resp) => {
    let query = getComentarioQuery(req);
    comentario_model_1.Comentario.findByIdAndUpdate(req.query.id, query, { new: true }, (err, comentarioDB) => {
        if (err)
            throw err;
        if (!comentarioDB) {
            resp.json({ ok: false, mensaje: "No existe una persona con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: comentarioDB });
        }
    });
});
comentarioRoutes.delete('', (req, resp) => {
    comentario_model_1.Comentario.findByIdAndDelete(req.query.id, (err, comentarioDB) => {
        if (err)
            throw err;
        if (!comentarioDB) {
            resp.json({ ok: false, mensaje: "No existe una persona con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: comentarioDB });
        }
    });
});
exports.default = comentarioRoutes;
