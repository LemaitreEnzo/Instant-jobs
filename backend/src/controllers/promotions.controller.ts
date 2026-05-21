import type { Request, Response } from "express";
import { Promotions } from "src/models/promotions.model";

export const getAllPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await Promotions.findAll();

        res.status(200);
        res.json({ promotions });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

export const getOnePromotion = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;
        const promotion = await Promotions.findOne({ where: { slug: slug } });

        res.status(200);
        res.json({ promotion });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

export const createPromotion = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const promotion = await Promotions.create(data);

        res.status(201);
        res.json({ promotion });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;
        const data = req.body;
        const promotion = await Promotions.update(data, { where: { slug: slug } });

        res.status(206);
        res.json({ promotion });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;
        const promotion = await Promotions.destroy({ where: { slug: slug } });

        res.status(204);
        res.json();
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}