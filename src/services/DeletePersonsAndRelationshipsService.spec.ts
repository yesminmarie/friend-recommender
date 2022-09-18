import { PersonsRepository } from "../repositories/implementations/PersonsRepository";
import { RelationshipsRepository } from "../repositories/implementations/RelationshipsRepository";
import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { IRelationshipsRepository } from "../repositories/IRelationshipsRepository";
import { DeletePersonsAndRelationshipsService } from "./DeletePersonsAndRelationshipsService";

describe("Delete persons and relationships", () => {
    let personsRepository: IPersonsRepository;
    let relationshipsRepository: IRelationshipsRepository;
    let deletePersonsAndRelationshipsService: DeletePersonsAndRelationshipsService;

    beforeEach(() => {
        personsRepository = new PersonsRepository();
        relationshipsRepository = new RelationshipsRepository();
        deletePersonsAndRelationshipsService =
            new DeletePersonsAndRelationshipsService(
                personsRepository,
                relationshipsRepository
            );
    });

    it("Should be able to delete persons and relationships", async () => {
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

        await relationshipsRepository.create({
            cpf1: "12345678901",
            cpf2: "12345678902",
        });

        await relationshipsRepository.create({
            cpf1: "12345678901",
            cpf2: "12345678903",
        });

        const deletePersonSpy = jest.spyOn(personsRepository, "delete");
        const deleteRelationshipSpy = jest.spyOn(
            relationshipsRepository,
            "delete"
        );

        await deletePersonsAndRelationshipsService.execute();

        expect(deletePersonSpy).toHaveBeenCalledTimes(1);
        expect(deleteRelationshipSpy).toHaveBeenCalledTimes(1);
    });
});
