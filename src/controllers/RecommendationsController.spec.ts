import request from "supertest";

import { app } from "../app";

describe("Recommendations Controller", () => {
    it("Should be able to show recommendations", async () => {
        await request(app).post("/person").send({
            cpf: "12345678901",
            name: "Maria",
        });

        await request(app).post("/person").send({
            cpf: "12345678902",
            name: "Pedro",
        });

        await request(app).post("/person").send({
            cpf: "12345678903",
            name: "Ana",
        });

        await request(app).post("/person").send({
            cpf: "12345678904",
            name: "Marcelo",
        });

        await request(app).post("/person").send({
            cpf: "12345678905",
            name: "Bruna",
        });

        await request(app).post("/relationship").send({
            cpf1: "12345678901",
            cpf2: "12345678902",
        });

        await request(app).post("/relationship").send({
            cpf1: "12345678901",
            cpf2: "12345678903",
        });

        await request(app).post("/relationship").send({
            cpf1: "12345678902",
            cpf2: "12345678903",
        });

        await request(app).post("/relationship").send({
            cpf1: "12345678903",
            cpf2: "12345678904",
        });

        await request(app).post("/relationship").send({
            cpf1: "12345678903",
            cpf2: "12345678905",
        });

        await request(app).post("/relationship").send({
            cpf1: "12345678902",
            cpf2: "12345678905",
        });

        const response = await request(app)
            .get("/recommendations/12345678901")
            .send();
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(["12345678905", "12345678904"]);
    });

    it("Should not be able to show the friends recommendations from non-existing cpf", async () => {
        const response = await request(app)
            .get("/recommendations/12345678906")
            .send();
        expect(response.status).toBe(404);
    });
});
