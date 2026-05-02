import {  jest, describe, beforeEach, expect, it } from "@jest/globals";
import { SubSpecialities } from "src/models/subSpecialities.model";
import request from "supertest";
import app from "../../../app";
import getSlug from "../../../utils/slugHelper";
import getEnv from "../../../utils/envHelper";

const VERSION = getEnv('VERSION');
const PROMOTIONS_URL = `/${VERSION}/organizations/la-manu/campus/compiegne/promotions/b3/specialities/dev/sub-specialities`;

jest.mock("models/subSpecialities.model", () => ({
    Promotions: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    }
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("GET subSpecialities", () => {
    it("should return 200", async () => {
        const res = await request(app).get(PROMOTIONS_URL);
        expect(res.statusCode).toBe(200);
    });

    it('Returns all promotions', async () => {
        jest.mocked(SubSpecialities.findAll).mockResolvedValue([
            {id: 1, name: 'test', slug: getSlug('test'), specialities_id: 1} as any,
            {id: 2, name: 'dev', slug: getSlug('dev'), specialities_id: 1} as any
        ])

        const res = await request(app).get(PROMOTIONS_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            promotions: [
                {id: 1, name: 'test', slug: getSlug('test'), specialities_id: 1},
                {id: 2, name: 'dev', slug: getSlug('dev'), specialities_id: 1}
            ]
        });
    })

    it('Returns one promotions', async () => {
        jest.mocked(SubSpecialities.findAll).mockResolvedValue(
            {id: 1, name: 'test', slug: getSlug('test'), specialities_id: 1} as any
        )

        const res = await request(app).get(`${PROMOTIONS_URL}/${getSlug('test')}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            promotions: [
                {id: 1, name: 'test', slug: getSlug('test'), specialities_id: 1},
            ]
        });
    })
});


describe("CREATE Promotions", () => {
    it('Create one promotions', async () => {
        jest.mocked(SubSpecialities.create).mockResolvedValue(
            {id: 1, name: 'test', slug: getSlug('test'), specialities_id: 1} as any,
        )

        const res = await request(app)
            .post(PROMOTIONS_URL)
            .send({name: 'test', slug: getSlug('test'), specialities_id: 1});

        expect(res.statusCode).toBe(204);
        expect(res.body).toMatchObject({
            promotions: {
                id: expect.any(Number),
                name: 'test',
                slug: getSlug('test'),
                organisation_id: 1
            }
        });
    })
})

describe("UPDATE Promotions", () => {
    it('Update one promotions', async () => {
        jest.mocked(SubSpecialities.update).mockResolvedValue(
            {id: 1, name: 'dev', slug: getSlug('dev'), specialities_id: 1} as any,
        )

        const res = await request(app)
            .patch(`${PROMOTIONS_URL}/${getSlug('test')}`)
            .send({name: 'dev', slug: getSlug('dev'), specialities_id: 1});

        expect(res.statusCode).toBe(206);
        expect(res.body).toMatchObject({
            promotions: {
                id: expect.any(Number),
                name: 'dev',
                slug: getSlug('dev'),
                organisation_id: 1
            }
        });
    })
})

describe("DELETE Promotions", () => {
    it('Delete one promotions', async () => {
        jest.mocked(SubSpecialities.destroy).mockResolvedValue(
            {id: 1, name: 'test', slug: getSlug('test'), specialities_id: 1} as any,
        )

        const res = await request(app)
            .delete(`${PROMOTIONS_URL}/${getSlug('test')}`)

        expect(res.statusCode).toBe(201);
        expect(SubSpecialities.destroy).toHaveBeenCalled();
    })
})