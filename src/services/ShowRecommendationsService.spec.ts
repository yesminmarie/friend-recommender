import { PersonsRepository } from "../repositories/implementations/PersonsRepository";
import { RelationshipsRepository } from "../repositories/implementations/RelationshipsRepository";
import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { IRelationshipsRepository } from "../repositories/IRelationshipsRepository";
import { ShowRecommendationsService } from "./ShowRecommendationsService";

describe("Show recommendations", () => {
    let personsRepository: IPersonsRepository;
    let relationshipsRepository: IRelationshipsRepository;
    let showRecommendationsService: ShowRecommendationsService;

    beforeEach(() => {
        personsRepository = new PersonsRepository();
        relationshipsRepository = new RelationshipsRepository();
        showRecommendationsService = new ShowRecommendationsService(
            personsRepository,
            relationshipsRepository
        );
    });

    it("Should be able to show the friends recommendations by relevance order", async () => {
        await personsRepository.create({
            cpf: "12345678901",
            name: "Maria",
        });

        await personsRepository.create({
            cpf: "12345678902",
            name: "Pedro",
        });

        await personsRepository.create({
            cpf: "12345678903",
            name: "Ana",
        });

        await personsRepository.create({
            cpf: "12345678904",
            name: "Marcelo",
        });

        await personsRepository.create({
            cpf: "12345678905",
            name: "Paulo",
        });

        await relationshipsRepository.create({
            cpf1: "12345678901",
            cpf2: "12345678902",
        });

        await relationshipsRepository.create({
            cpf1: "12345678903",
            cpf2: "12345678901",
        });

        await relationshipsRepository.create({
            cpf1: "12345678902",
            cpf2: "12345678903",
        });

        await relationshipsRepository.create({
            cpf1: "12345678902",
            cpf2: "12345678904",
        });

        await relationshipsRepository.create({
            cpf1: "12345678903",
            cpf2: "12345678905",
        });

        await relationshipsRepository.create({
            cpf1: "12345678903",
            cpf2: "12345678904",
        });

        const recommendations = await showRecommendationsService.execute({
            cpf: "12345678901",
        });

        expect(recommendations).toStrictEqual(["12345678904", "12345678905"]);
    });

    it("Should not be able to show the friends recommendations from non-existing cpf", async () => {
        await expect(
            showRecommendationsService.execute({
                cpf: "12345678901",
            })
        ).rejects.toMatchObject({
            statusCode: 404,
            message: "User not found!",
        });
    });

    it("Should not be able to show the friends recommendations from cpf with non-numeric characters", async () => {
        await expect(
            showRecommendationsService.execute({
                cpf: "1234567890a",
            })
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "The informed cpf does not have 11 numeric digits!",
        });
    });
});
