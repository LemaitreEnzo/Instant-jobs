import {  jest, describe, beforeEach, expect, it } from "@jest/globals";
import { Promotions } from "models/promotions.model";
import request from "supertest";
import app from "../../../app";
import getSlug from "../../../utils/slugHelper";
import getEnv from "../../../utils/envHelper";

const VERSION = getEnv('VERSION');
const PROMOTIONS_URL = `/${VERSION}/organizations/la-manu/campus/compiegne/promotions`;

jest.mock("models/organizations.model", () => ({
  Organization: {
    findOne: jest.fn(),
  },
}));

jest.mock("models/promotions.model", () => ({
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

describe("GET Promotions", () => {
    it("should return 200", async () => {
        const res = await request(app).get(PROMOTIONS_URL);
        expect(res.statusCode).toBe(200);
    });

    it('Returns all promotions', async () => {
        jest.mocked(Promotions.findAll).mockResolvedValue([
            {id: 1, name: 'B1', slug: getSlug('B1'), organisation_id: 1} as any,
            {id: 2, name: 'B2', slug: getSlug('B2'), organisation_id: 1} as any
        ])

        const res = await request(app).get(PROMOTIONS_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            promotions: [
                {id: 1, name: 'B1', slug: getSlug('B1'), organisation_id: 1},
                {id: 2, name: 'B2', slug: getSlug('B2'), organisation_id: 1}
            ]
        });
    })

    it('Returns one promotions', async () => {
        jest.mocked(Promotions.findAll).mockResolvedValue(
            {id: 1, name: 'B1', slug: getSlug('B1'), organisation_id: 1} as any
        )

        const res = await request(app).get(`${PROMOTIONS_URL}/${getSlug('B1')}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            promotions: [
                {id: 1, name: 'B1', slug: getSlug('B1'), organisation_id: 1},
            ]
        });
    })
});


describe("CREATE Promotions", () => {
    it('Create one promotions', async () => {
        jest.mocked(Promotions.create).mockResolvedValue(
            {id: 1, name: 'B1', slug: getSlug('B1'), organisation_id: 1} as any,
        )

        const res = await request(app)
            .post(PROMOTIONS_URL)
            .send({name: 'B1', slug: getSlug('B1'), organisation_id: 1});

        expect(res.statusCode).toBe(204);
        expect(res.body).toMatchObject({
            promotions: {
                id: expect.any(Number),
                name: 'B1',
                slug: getSlug('B1'),
                organisation_id: 1
            }
        });
    })
})

describe("UPDATE Promotions", () => {
    it('Update one promotions', async () => {
        jest.mocked(Promotions.update).mockResolvedValue(
            {id: 1, name: 'B3', slug: getSlug('B3'), organisation_id: 1} as any,
        )

        const res = await request(app)
            .patch(`${PROMOTIONS_URL}/${getSlug('B1')}`)
            .send({name: 'B3', slug: getSlug('B3'), organisation_id: 1});

        expect(res.statusCode).toBe(206);
        expect(res.body).toMatchObject({
            promotions: {
                id: expect.any(Number),
                name: 'B3',
                slug: getSlug('B3'),
                organisation_id: 1
            }
        });
    })
})

describe("DELETE Promotions", () => {
    it('Delete one promotions', async () => {
        jest.mocked(Promotions.destroy).mockResolvedValue(
            {id: 1, name: 'B3', slug: getSlug('B3'), organisation_id: 1} as any,
        )

        const res = await request(app)
            .delete(`${PROMOTIONS_URL}/${getSlug('B1')}`)

        expect(res.statusCode).toBe(201);
        expect(Promotions.destroy).toHaveBeenCalled();
    })
})
