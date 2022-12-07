import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from './config/db.js'
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitios = ["http://127.0.0.1:5173"];

const corsOptions = {
    origin: function(origin, callback) {
        if( dominiosPermitios.indexOf(origin) !== -1 ) {
            // El origen del Request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No Permitido Por CORS'));
        }
    }
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto: ${PORT}`);
})

app.use(cors(corsOptions));

app.use( '/api/veterinarios', veterinarioRoutes );
app.use( '/api/pacientes', pacienteRoutes );