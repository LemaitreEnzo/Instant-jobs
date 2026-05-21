import { 
    getAllSubSpecialities, getOneSubSpeciality,
    createSubSpeciality, updateSubSpeciality, deleteSubSpeciality 
} from "src/controllers/subSpecialities.controller"; 
import express from 'express'
import mediasRoutes from "routes/medias.routes";

const subSpecialities = express.Router();

//GET
subSpecialities.get('/', getAllSubSpecialities);
subSpecialities.get('/:slug', getOneSubSpeciality);

//CREATE
subSpecialities.post('/', createSubSpeciality);

//UPDATE
subSpecialities.patch('/:slug', updateSubSpeciality);

//DELETE
subSpecialities.delete('/:slug', deleteSubSpeciality);

export default subSpecialities;