import request from "supertest";

import { app } from "../app";
import { PersonsAndRelationshipsController } from "./PersonsAndRelationshipsController";

describe("Persons and Relationships Controller", () => {
    it("Should be able to delete persons and relationships", async () => {
        await request(app).post("/person").send({
            cpf: "12345678901",
            name: "Maria",
        });

        await request(app).post("/person").send({
            cpf: "12345678902",
            name: "Pedro",
        });

        await request(app).post("/relationship").send({
            cpf1: "12345678901",
            cpf2: "12345678902",
        });

        const response = await request(app).delete("/clean").send();

        expect(response.status).toBe(200);
    });
});
