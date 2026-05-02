import { getOneSubSpecialities, getAllSubSpecialities, createSubSpecialities, updateSubSpecialities, deleteSubSpecialities } from "src/controllers/subSpecialities.controller"; 
import express from 'express'
import mediasRoutes from "routes/medias.routes";

const subSpecialities = express.Router();

//GET
subSpecialities.get('/:slug', getOneSubSpecialities);
subSpecialities.get('/', getAllSubSpecialities);

//CREATE
subSpecialities.post('/', getAllSubSpecialities);

//UPDATE
subSpecialities.patch('/:slug', getAllSubSpecialities);

//DELETE
subSpecialities.delete('/:slug', getAllSubSpecialities);

export default subSpecialities;