import { PersonsRepository } from "../repositories/implementations/PersonsRepository";
import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { ShowPersonService } from "./ShowPersonService";

describe("Show persons", () => {
    let personsRepository: IPersonsRepository;
    let showPersonService: ShowPersonService;

    beforeEach(() => {
        personsRepository = new PersonsRepository();
        showPersonService = new ShowPersonService(personsRepository);
    });

    it("Should be able to show the person", async () => {
        const personCreated = await personsRepository.create({
            cpf: "12345678901",
            name: "Maria",
        });

        const person = await showPersonService.execute({
            cpf: personCreated.cpf,
        });

        expect(person.cpf).toBe("12345678901");
        expect(person.name).toBe("Maria");
    });

    it("Should not be able to show the person from non-existing cpf", async () => {
        await expect(
            showPersonService.execute({
                cpf: "12345678901",
            })
        ).rejects.toEqual(new Error("User not found!"));
    });
});
