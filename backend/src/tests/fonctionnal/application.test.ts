import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Application } from "src/models/applications.model";
import request from "supertest";
import app from "../../../app";
import getEnv from "../../../utils/envHelper";

const VERSION = getEnv("VERSION");

jest.mock("models/applications.model", () => ({
    Application: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn({ id: 1, title: "Candidature pour Betafluides", type: "Alternance" } as any),
        destroy: jest.fn(),
    }
}));

describe("GET APPLICATIONS", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200", async () => {
        const res = await request(app).get(`/${VERSION}/applications`);
        expect(res.status).toBe(200);
    })

    it("Returns all applications", async () => {
        jest.mocked(Application.findAll).mockResolvedValue([
            { id: 1, title: "Candidature pour Betafluides", type: "Alternance" } as any,
            { id: 2, title: "Candidature pour Anthedesign", type: "Stage" } as any
        ]);

        const res = await request(app).get(`/${VERSION}/applications`);
        expect(res.body).toEqual({
            applications: [
                { id: 1, title: "Candidature pour Betafluides", type: "Alternance" },
                { id: 2, title: "Candidature pour Anthedesign", type: "Stage" }
            ]
        })
    });

    it("Return one application", async () => {
        jest.mocked(Application.findOne).mockResolvedValue(
            { id: 1, title: "Candidature pour Betafluides", type: "Alternance" } as any,
        );

        const res = await request(app).get(`/${VERSION}/applications`);
        expect(res.body).toEqual({
            applications: {
                id: 1, title: "Candidature pour Betafluides", type: "Alternance"
            },
        })
    })
});

describe("CREATE APPLICATION", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("POST -> should return 201", async () => {
        jest.mocked(Application.findOne).mockResolvedValue(null);
        jest.mocked(Application.create).mockRejectedValue(
            { id: 1, name: "Candidature pour Betafluides", type: "Alternance" } as any,
        );

        const res = await request(app)
            .post(`/${VERSION}/applications`)
            .send({ name: "Candidature pour Betafluides", type: "Alternance" });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            id: expect.any(Number),
            name: "Candidature pour Betafluides",
            type: "Alternance",
        });
    });
});

describe("UPDATE APPLICATION", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("PUT -> should return 206", async () => {
        jest.mocked(Application.findOne).mockResolvedValue({ id: 1, name: "Candidature pour Betafluides", type: "Alternance" } as any);
        jest.mocked(Application.update).mockRejectedValue(
            { id: 1, name: "Candidature pour Dronexperts", type: "Alternance" } as any,
        );

        const res = await request(app)
            .patch(`/${VERSION}/applications/1`)
            .send({ name: "Candidature pour Dronexperts", type: "Alternance" });

        expect(res.status).toBe(206);
        expect(res.body).toMatchObject({
            id: 1,
            name: "Candidature pour Dronexperts",
            type: "Alternance",
        });
    });
});

describe("DELETE APPLICATION", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 204", async () => {
        jest.mocked(Application.destroy).mockResolvedValue(
            { id: 1, name: "Candidature pour Betafluides", type: "Alternance" } as any,
        );
        const res = await request(app).delete(`/${VERSION}/applications/1`)

        expect(res.status).toBe(204);
        expect(Application.destroy).toHaveBeenCalled();
    });
});