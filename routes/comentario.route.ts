import { Router } from  "express";
import { Comentario, IComentario } from '../models/comentario.model';

const comentarioRoutes = Router();


interface ComentarioQuery {
    descripcion?: IComentario['descripcion'];
    imagen?: IComentario['imagen'];
    usuario?: IComentario['usuario'];
    fecha?: IComentario['fecha'];
    respuestas?: IComentario['respuestas'];
};

let getComentarioQuery = (req: any): ComentarioQuery => {
    let query: ComentarioQuery = {}; 
    
    if(req.query.descripcion != null){
        query.descripcion = <IComentario['descripcion']>(req.query.descripcion);
    }

    if(req.query.imagen != null){
        query.imagen = <IComentario['imagen']>(req.query.imagen);
    }
    
    if(req.query.usuario != null){
        query.usuario = <IComentario['usuario']>(req.query.usuario);
    }
    
    if(req.query.fecha != null){
        query.fecha = <IComentario['fecha']>(req.query.fecha);
    }
    
    if(req.query.respuestas != null){
        query.respuestas = <IComentario['respuestas']>(req.query.respuestas);
    }
    
    return query;
}

comentarioRoutes.get('/' , (req, resp)=>{
    
    let query: ComentarioQuery = getComentarioQuery(req);
    
    Comentario.find(query)
        .then(comentarioDB => resp.json({ok: true, mensaje: comentarioDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));

});

comentarioRoutes.post('' , (req, resp)=>{
    
    const proveedor = {
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        usuario: req.body.usuario,
        fecha: req.body.fecha,
        respuestas: req.body.respuestas
    };

    Comentario.create(proveedor)
        .then(comentarioDB => resp.json({ok: true, mensaje: comentarioDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));

    
});

comentarioRoutes.put('' , (req, resp)=>{
    let query: ComentarioQuery = getComentarioQuery(req);
    Comentario.findByIdAndUpdate(req.query.id, <any>query, {new: true}, (err, comentarioDB) => {
        if ( err ) throw err;
        if (!comentarioDB) {
            resp.json({ok: false, mensaje: "No existe una persona con ese ID" });
        } else {
            resp.json({ok: true, mensaje: comentarioDB });
        }

    })
    
});

comentarioRoutes.delete('' , (req, resp)=>{
    
    Comentario.findByIdAndDelete(req.query.id, (err: any, comentarioDB: any) => {
        if ( err ) throw err;
        if (!comentarioDB) {
            resp.json({ok: false, mensaje: "No existe una persona con ese ID" });
        } else {
            resp.json({ok: true, mensaje: comentarioDB });
        }
    })
    
});


export default comentarioRoutes;