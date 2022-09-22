import { Person } from "../model/Person";
import { PersonsRepository } from "../repositories/implementations/PersonsRepository";
import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { CreatePersonService } from "./CreatePersonService";

describe("Create person", () => {
    let personsRepository: IPersonsRepository;
    let createPersonService: CreatePersonService;

    beforeEach(() => {
        personsRepository = new PersonsRepository();
        createPersonService = new CreatePersonService(personsRepository);
    });

    it("should be able to create a new person", async () => {
        const personData: Person = {
            cpf: "12345678901",
            name: "Maria",
        };

        const person = await createPersonService.execute(personData);
        expect(person.cpf).toBe("12345678901");
        expect(person.name).toBe("Maria");
    });

    it("Should not be able to create an existing person", async () => {
        const personData: Person = {
            cpf: "12345678901",
            name: "Maria",
        };

        await createPersonService.execute(personData);

        await expect(
            createPersonService.execute(personData)
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "User already exists!",
        });
    });

    it("Should not be able to create a person with a cpf less then 11 digits", async () => {
        const personData: Person = {
            cpf: "1234567890",
            name: "Maria",
        };

        await expect(
            createPersonService.execute(personData)
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "The informed cpf does not have 11 numeric digits!",
        });
    });

    it("Should not be able to create a person with a cpf greater than 11 digits", async () => {
        const personData: Person = {
            cpf: "123456789012",
            name: "Maria",
        };

        await expect(
            createPersonService.execute(personData)
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "The informed cpf does not have 11 numeric digits!",
        });
    });

    it("Should not be able to create a person with cpf with non-numeric characters", async () => {
        const personData: Person = {
            cpf: "1234567890a",
            name: "Maria",
        };

        await expect(
            createPersonService.execute(personData)
        ).rejects.toMatchObject({
            statusCode: 400,
            message: "The informed cpf does not have 11 numeric digits!",
        });
    });
});
