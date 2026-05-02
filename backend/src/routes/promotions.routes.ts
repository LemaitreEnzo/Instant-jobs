import { getOnePromotions, getAllPromotions, createPromotions, updatePromotions, deletePromotions } from "src/controllers/promotions.controller";
import express from "express";
import mediasRoutes from "routes/medias.routes";

const promotionsRoutes = express.Router({ mergeParams: true }); 

//GET
promotionsRoutes.get('/', getAllPromotions);
promotionsRoutes.get('/:slug', getOnePromotions);

//CREATE
promotionsRoutes.post('/', createPromotions);

//UPDATE
promotionsRoutes.patch('/:slug', updatePromotions);

//DELETE
promotionsRoutes.delete('/:slug', deletePromotions);

export default promotionsRoutes;