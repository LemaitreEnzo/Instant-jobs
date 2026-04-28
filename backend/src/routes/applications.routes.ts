/* =========================
   RESSOURCE : APPLICATIONS
========================= */

import { getAllApplications, getOneApplication, createApplication, updateApplication,
    deleteApplication
} from "controllers/application.controller"

import express from "express";
import mediasRoutes from "routes/medias.routes";

import { Application } from "src/models/applications.model"

const applicationsRoutes = express.Router();

// GET
applicationsRoutes.get("/", getAllApplications);
applicationsRoutes.get("/:id", getOneApplication);

// CREATE
applicationsRoutes.post("/", createApplication);

// UPDATE
applicationsRoutes.patch("/:id", updateApplication);

// DELETE
applicationsRoutes.delete("/:id", deleteApplication);

// Medias routes
applicationsRoutes.use("/:id/docs/medias", mediasRoutes);

export default applicationsRoutes;