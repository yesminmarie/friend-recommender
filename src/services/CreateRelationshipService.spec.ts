import { Relationship } from "../model/Relationship";
import { PersonsRepository } from "../repositories/implementations/PersonsRepository";
import { RelationshipsRepository } from "../repositories/implementations/RelationshipsRepository";
import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { IRelationshipsRepository } from "../repositories/IRelationshipsRepository";
import { CreateRelationshipService } from "./CreateRelationshipService";

describe("Create relationship", () => {
    let personsRepository: IPersonsRepository;
    let relationshipRepository: IRelationshipsRepository;
    let createRelationshipService: CreateRelationshipService;

    beforeEach(() => {
        personsRepository = new PersonsRepository();
        relationshipRepository = new RelationshipsRepository();
        createRelationshipService = new CreateRelationshipService(
            personsRepository,
            relationshipRepository
        );
    });

    it("Should be able to create a new relationship", async () => {
        await personsRepository.create({
            cpf: "12345678901",
            name: "Maria",
        });

        await personsRepository.create({
            cpf: "12345678902",
            name: "Pedro",
        });
        const relationshipData: Relationship = {
            cpf1: "12345678901",
            cpf2: "12345678902",
        };

        const relationship = await createRelationshipService.execute(
            relationshipData
        );
        expect(relationship.cpf1).toBe("12345678901");
        expect(relationship.cpf2).toBe("12345678902");
    });

    it("Should not be able to create a new relationship with a non-existent user", async () => {
        await personsRepository.create({
            cpf: "12345678901",
            name: "Maria",
        });

        const relationshipData: Relationship = {
            cpf1: "12345678901",
            cpf2: "12345678902",
        };

        await expect(
            createRelationshipService.execute(relationshipData)
        ).rejects.toMatchObject({
            statusCode: 404,
            message: "User not found! Check the provided CPFs.",
        });
    });

    it("Should not be able to create an existing relationship", async () => {
        await personsRepository.create({
            cpf: "12345678901",
            name: "Maria",
        });

        await personsRepository.create({
            cpf: "12345678902",
            name: "Pedro",
        });

        const relationshipData: Relationship = {
            cpf1: "12345678901",
            cpf2: "12345678902",
        };

        await createRelationshipService.execute(relationshipData);

        await expect(
            createRelationshipService.execute(relationshipData)
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "Relationship already exists!",
        });
    });

    it("Should not be able to create a relationship with two same CPFs", async () => {
        await personsRepository.create({
            cpf: "12345678901",
            name: "Maria",
        });

        const relationshipData: Relationship = {
            cpf1: "12345678901",
            cpf2: "12345678901",
        };

        await expect(
            createRelationshipService.execute(relationshipData)
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "The two provided CPFs are the same!",
        });
    });
});
