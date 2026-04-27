/* =========================
   RESSOURCE : SPECIALITIES
========================= */

import { getAllSpecialities, getOneSpeciality, createSpeciality, updateSpeciality,
    deleteSpeciality
} from "controllers/specialities.controller"

import express from "express";
import subSpecialities from "routes/subspecialities.routes";

import { Specialities } from "src/models/specialities.model"

const specialitiesRoutes = express.Router();

// GET
specialitiesRoutes.get("/", getAllSpecialities);
specialitiesRoutes.get("/:slug", getOneSpeciality);

// CREATE
specialitiesRoutes.post("/", createSpeciality);

// UPDATE
specialitiesRoutes.patch("/:slug", updateSpeciality);

// DELETE
specialitiesRoutes.delete("/:slug", deleteSpeciality);

// SubSpecialities routes
specialitiesRoutes.use("/:slug/subspecialities", subSpecialities);

export default specialitiesRoutes;