import request from "supertest";

import { app } from "../app";

describe("Create Person Controller", () => {
    it("Should be able to create a new person", async () => {
        const response = await request(app).post("/person").send({
            cpf: "12345678901",
            name: "Maria",
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create an existing person", async () => {
        await request(app).post("/person").send({
            cpf: "12345678901",
            name: "Maria",
        });

        const response = await request(app).post("/person").send({
            cpf: "12345678901",
            name: "Maria",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "User already exists!" });
    });
});
