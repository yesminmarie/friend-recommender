import request from "supertest";

import { app } from "../app";

describe("Relationship Controller", () => {
    it("Should be able to create a new relationship", async () => {
        await request(app).post("/person").send({
            cpf: "12345678901",
            name: "Maria",
        });

        await request(app).post("/person").send({
            cpf: "12345678902",
            name: "Pedro",
        });

        const response = await request(app).post("/relationship").send({
            cpf1: "12345678901",
            cpf2: "12345678902",
        });
        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new relationship with a non-existent user", async () => {
        const response = await request(app).post("/relationship").send({
            cpf1: "12345678901",
            cpf2: "12345678903",
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: "error",
            message: "User not found!",
        });
    });
});
