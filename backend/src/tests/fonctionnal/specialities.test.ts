import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Specialities } from "src/models/specialities.model";
import { Promotions } from "src/models/promotions.model";
import request from "supertest";
import app from "../../../app";
import getEnv from "../../../utils/envHelper";
import getSlug from "../../../utils/slugHelper";

const VERSION = getEnv("VERSION");

jest.mock("models/promotions.model", () => ({
  Promotions: {
    findOne: jest.fn(),
  },
}));

jest.mock("models/specialities.model", () => ({
    Speciality: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn({ id: 1, name: "Designeur", slug: "designeur"} as any),
        destroy: jest.fn(),
    }
}));


describe("GET SPECIALITIES", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200", async () => {
        const res = await request(app).get(`/${VERSION}/specialities`);
        expect(res.status).toBe(200);
    })

    it("Returns all specialities", async () => {
        jest.mocked(Specialities.findAll).mockResolvedValue([
            { id: 1, name: "Designeur", slug: getSlug("Designeur")} as any,
            { id: 2, name: "Développeur", slug: getSlug("Développeur")} as any
        ]);

        const res = await request(app).get(`/${VERSION}/specialities`);
        expect(res.body).toEqual({
            specialities: [
                { id: 1, name: "Designeur", slug: getSlug("Designeur")},
                { id: 2, name: "Développeur", slug: getSlug("Développeur")}
            ]
        })
    });

    it("Return one speciality", async () => {
        jest.mocked(Specialities.findOne).mockResolvedValue(
            { id: 1, name: "Designeur", slug: getSlug("Designeur") } as any,
        );

        const res = await request(app).get(`/${VERSION}/specialities`);
        expect(res.body).toEqual({
            specialities: {
                id: 1, name: "Designeur", slug: getSlug("Designeur")
            },
        })
    })
});

describe("CREATE SPECIALITY", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("POST -> should return 201", async () => {
        jest.mocked(Promotions.findOne).mockResolvedValue({id: 1, name: "Compiègne", slug: getSlug("Compiègne")} as any);
        jest.mocked(Specialities.create).mockRejectedValue(
            { id: 1, name: "Designeur", slug: getSlug("Designeur") } as any,
        );

        const res = await request(app)
            .post(`/${VERSION}/specialities`)
            .send({ id: 1, name: "Designeur", slug: getSlug("Designeur") });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            id: expect.any(Number),
            name: "Designeur",
            type: getSlug("Designeur"),
        });
    });
});

describe("UPDATE SPECIALITY", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("PUT -> should return 206", async () => {
        jest.mocked(Promotions.findOne).mockResolvedValue({id: 1, name: "Compiègne", slug: getSlug("Compiègne")} as any);
        jest.mocked(Specialities.update).mockRejectedValue(
            { id: 1, name: "Designeur", slug: getSlug("Designeur") } as any,
        );

        const res = await request(app)
            .patch(`/${VERSION}/specialities/designeur`)
            .send({ name: "Marketing", slug: getSlug("Marketing") });

        expect(res.status).toBe(206);
        expect(res.body).toMatchObject({
            id: 1,
            name: "Marketing",
            slug: getSlug("Marketing"),
        });
    });
});

describe("DELETE SPECIALITY", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 204", async () => {
        jest.mocked(Promotions.findOne).mockResolvedValue({id: 1, name: "Compiègne", slug: getSlug("Compiègne")} as any);
        jest.mocked(Specialities.destroy).mockResolvedValue(
            { id: 1, name: "Designeur", slug: getSlug("Designeur") } as any,
        );
        const res = await request(app).delete(`/${VERSION}/specialities/designeur`)

        expect(res.status).toBe(204);
        expect(Specialities.destroy).toHaveBeenCalled();
    });
});