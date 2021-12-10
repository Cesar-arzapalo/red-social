import { Server } from './server/server';


import mongoose, {ConnectOptions} from 'mongoose';
import bodyParser from 'body-parser';
import cors  from 'cors';
import comentarioRoutes from './routes/comentario.route';


const PORT = +process.env.PORT! || 2800;
const servidor = new Server(PORT);
//Body parser
servidor.app.use(bodyParser.urlencoded({extended:true}));
servidor.app.use(bodyParser.json());

//Cors 

servidor.app.use(cors());

//rutas del app
servidor.app.use('/comentario', comentarioRoutes);

//conectar db
mongoose.connect('mongodb+srv://admin:12345@cluster0.bcg8b.mongodb.net/proyecto?retryWrites=true&w=majority',
                {useNewUrlParser: true, useUnifiedTopology: true}  as ConnectOptions, (err) =>{
                    if (err) throw err;
                    console.log('Base de datos en linea');
                });
//levantar express
servidor.start(()=> {
    console.log(`Servidor de la base de datos corriendo en el puerto ${servidor.port}`);
});
