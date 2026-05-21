import { jest, describe, beforeEach, expect, it } from "@jest/globals";
import { SubSpecialities } from "src/models/subSpecialities.model";
import request from "supertest";
import app from "../../../app";
import getSlug from "../../../utils/slugHelper";
import getEnv from "../../../utils/envHelper";

const VERSION = getEnv('VERSION');
const SUBSPECIALITIES_URL = `/${VERSION}/organizations/la-manu/campus/compiegne/promotions/b3/specialities/dev/sub-specialities`;

jest.mock("models/subSpecialities.model", () => ({
    SubSpecialities: {
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
        const res = await request(app).get(SUBSPECIALITIES_URL);
        expect(res.statusCode).toBe(200);
    });

    it('Returns all subSpecialities', async () => {
        jest.mocked(SubSpecialities.findAll).mockResolvedValue([
            { id: 1, name: 'frontend', slug: getSlug('frontend'), specialityId: 1 } as any,
            { id: 2, name: 'backend', slug: getSlug('backend'), specialityId: 1 } as any
        ])

        const res = await request(app).get(SUBSPECIALITIES_URL);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            subSpecialities: [
                { id: 1, name: 'frontend', slug: getSlug('frontend'), specialityId: 1 },
                { id: 2, name: 'backend', slug: getSlug('backend'), specialityId: 1 }
            ]
        });
    })

    it('Returns one subSpeciality', async () => {
        jest.mocked(SubSpecialities.findOne).mockResolvedValue(
            { id: 1, name: 'frontend', slug: getSlug('frontend'), specialityId: 1 } as any
        )

        const res = await request(app).get(`${SUBSPECIALITIES_URL}/${getSlug('test')}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            subSpeciality:
                { id: 1, name: 'frontend', slug: getSlug('frontend'), specialityId: 1 },
        });
    })
});


describe("CREATE subSpeciality", () => {
    it('Create one subSpeciality', async () => {
        jest.mocked(SubSpecialities.create).mockResolvedValue(
            { id: 1, name: 'frontend', slug: getSlug('frontend'), specialityId: 1 } as any,
        )

        const res = await request(app)
            .post(SUBSPECIALITIES_URL)
            .send({ name: 'frontend', slug: getSlug('frontend'), specialityId: 1 });

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({
            subSpeciality: {
                id: expect.any(Number),
                name: 'frontend',
                slug: getSlug('frontend'),
                specialityId: 1
            }
        });
    })
})

describe("UPDATE subSpeciality", () => {
    it('Update one subSpeciality', async () => {
        jest.mocked(SubSpecialities.findOne).mockResolvedValue({ slug: getSlug("frontend")} as any);
        jest.mocked(SubSpecialities.update).mockResolvedValue(
            { id: 1, name: 'backend', slug: getSlug('backend'), specialityId: 1 } as any,
        )

        const res = await request(app)
            .patch(`${SUBSPECIALITIES_URL}/${getSlug('frontend')}`)
            .send({ name: 'backend', slug: getSlug('backend'), specialityId: 1 });

        expect(res.statusCode).toBe(206);
        expect(res.body).toMatchObject({
            subSpeciality: {
                id: expect.any(Number),
                name: 'backend',
                slug: getSlug('backend'),
                specialityId: 1
            }
        });
    })
})

describe("DELETE subSpeciality", () => {
    it('Delete one subSpeciality', async () => {
        jest.mocked(SubSpecialities.destroy).mockResolvedValue(
            { id: 1, name: 'frontend', slug: getSlug('frontebd'), specialityId: 1 } as any,
        )

        const res = await request(app)
            .delete(`${SUBSPECIALITIES_URL}/${getSlug('frontend')}`)

        expect(res.statusCode).toBe(204);
        expect(SubSpecialities.destroy).toHaveBeenCalled();
    })
})