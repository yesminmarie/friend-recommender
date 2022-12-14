import "reflect-metadata";
import { injectable, inject } from "tsyringe";

import AppError from "../errors/AppError";
import { Person } from "../model/Person";
import { IPersonsRepository } from "../repositories/IPersonsRepository";

interface IRequest {
    cpf: string;
    name: string;
}

@injectable()
class CreatePersonService {
    constructor(
        @inject("PersonsRepository")
        private personsRepository: IPersonsRepository
    ) {}

    public async execute({ cpf, name }: IRequest): Promise<Person> {
        await this.checkIfPersonAlreadyExists(cpf);

        await this.checkIfCpfHasElevenNumericDigits(cpf);

        const person = await this.personsRepository.create({ cpf, name });

        return person;
    }

    private async checkIfPersonAlreadyExists(cpf: string): Promise<void> {
        const personAlreadyExists = await this.personsRepository.findByCpf(cpf);

        if (personAlreadyExists) {
            throw new AppError("User already exists!", 400);
        }
    }

    private async checkIfCpfHasElevenNumericDigits(cpf: string): Promise<void> {
        const regex = /^[0-9]{11}$/;

        if (!regex.test(cpf)) {
            throw new AppError(
                "The informed cpf does not have 11 numeric digits!",
                400
            );
        }
    }
}

export { CreatePersonService };
