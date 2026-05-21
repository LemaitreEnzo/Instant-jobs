import { 
    getOnePromotion, getAllPromotions, 
    createPromotion, updatePromotion, deletePromotion 
} from "src/controllers/promotions.controller";
import express from "express";
import mediasRoutes from "routes/medias.routes";
import specialitiesRoutes from "./specialities.routes";

const promotionsRoutes = express.Router({ mergeParams: true }); 

//GET
promotionsRoutes.get('/', getAllPromotions);
promotionsRoutes.get('/:slug', getOnePromotion);

//CREATE
promotionsRoutes.post('/', createPromotion);

//UPDATE
promotionsRoutes.patch('/:slug', updatePromotion);

//DELETE
promotionsRoutes.delete('/:slug', deletePromotion);

// SPECIALITIES ROUTES
promotionsRoutes.use("/:slug/specialities", specialitiesRoutes)

export default promotionsRoutes;