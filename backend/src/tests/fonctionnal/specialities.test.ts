import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Promotions } from "src/models/promotions.model";
import { Specialities } from "src/models/specialities.model";
import request from "supertest";
import app from "../../../app";
import getEnv from "../../../utils/envHelper";
import getSlug from "../../../utils/slugHelper";

const VERSION = getEnv("VERSION");
const SPECIALITIES_URL = `/${VERSION}/organizations/la-manu/campus/compiegne/promotions/b3/specialities`;

jest.mock("models/promotions.model", () => ({
  Promotions: {
    findOne: jest.fn(),
  },
}));

jest.mock("models/specialities.model", () => ({
  Specialities: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET SPECIALITIES", () => {
  it("should return 200", async () => {
    const res = await request(app).get(SPECIALITIES_URL);
    expect(res.status).toBe(200);
  });

  it("Returns all specialities", async () => {
    jest
      .mocked(Specialities.findAll)
      .mockResolvedValue([
        { id: 1, name: "Designeur", slug: getSlug("Designeur") } as any,
        { id: 2, name: "Développeur", slug: getSlug("Développeur") } as any,
      ]);

    const res = await request(app).get(SPECIALITIES_URL);
    expect(res.body).toEqual({
      specialities: [
        { id: 1, name: "Designeur", slug: getSlug("Designeur") },
        { id: 2, name: "Développeur", slug: getSlug("Développeur") },
      ],
    });
  });

  it("Return one speciality", async () => {
    jest
      .mocked(Specialities.findOne)
      .mockResolvedValue({
        id: 1,
        name: "Designeur",
        slug: getSlug("Designeur"),
      } as any);

    const res = await request(app).get(`${SPECIALITIES_URL}/${getSlug("Designeur")}`);
    expect(res.body).toEqual({
      speciality: {
        id: 1,
        name: "Designeur",
        slug: getSlug("Designeur"),
      },
    });
  });
});

describe("CREATE SPECIALITY", () => {
  it("POST -> should return 201", async () => {
    jest
      .mocked(Promotions.findOne)
      .mockResolvedValue({
        id: 1,
        name: "b3",
        slug: getSlug("B3"),
        organizationId: 1
      } as any);
    jest
      .mocked(Specialities.create)
      .mockResolvedValue({
        id: 1,
        name: "Designeur",
        slug: getSlug("Designeur"),
      } as any);

    const res = await request(app)
      .post(SPECIALITIES_URL)
      .send({ name: "Designeur", slug: getSlug("Designeur") });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      name: "Designeur",
      slug: getSlug("Designeur"),
    });
  });
});

describe("UPDATE SPECIALITY", () => {
  it("PATCH -> should return 206", async () => {
    jest
      .mocked(Promotions.findOne)
      .mockResolvedValue({
        id: 1,
        name: "B3",
        slug: getSlug("B3"),
        organizationId: 1
      } as any);
    jest
      .mocked(Specialities.findOne)
      .mockResolvedValue({ slug: getSlug("Designeur") } as any)
    jest
      .mocked(Specialities.update)
      .mockResolvedValue({
        id: 1,
        name: "Marketing",
        slug: getSlug("Marketing"),
      } as any);

    const res = await request(app)
      .patch(`${SPECIALITIES_URL}/${getSlug('Designeur')}`)
      .send({ name: "Marketing", slug: getSlug("Marketing") });

    expect(res.status).toBe(206);
    expect(res.body).toMatchObject({
      specialityUpdated: {
        id: expect.any(Number),
        name: "Marketing",
        slug: getSlug("Marketing"),
      }
    });
  });
});

describe("DELETE SPECIALITY", () => {
  it("should return 204", async () => {
    jest
      .mocked(Promotions.findOne)
      .mockResolvedValue({
        id: 1,
        name: "Compiègne",
        slug: getSlug("Compiègne"),
      } as any);
    jest
      .mocked(Specialities.destroy)
      .mockResolvedValue({
        id: 1,
        name: "Designeur",
        slug: getSlug("Designeur"),
      } as any);
    const res = await request(app).delete(`${SPECIALITIES_URL}/designeur`);

    expect(res.status).toBe(204);
    expect(Specialities.destroy).toHaveBeenCalled();
  });
});
