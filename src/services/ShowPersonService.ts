import "reflect-metadata";

import { injectable, inject } from "tsyringe";

import AppError from "../errors/AppError";
import { Person } from "../model/Person";
import { IPersonsRepository } from "../repositories/IPersonsRepository";

interface IRequest {
    cpf: string;
}

@injectable()
class ShowPersonService {
    constructor(
        @inject("PersonsRepository")
        private personsRepository: IPersonsRepository
    ) {}

    public async execute({ cpf }: IRequest): Promise<Person> {
        const personAlreadyExists = await this.personsRepository.findByCpf(cpf);

        if (!personAlreadyExists) {
            throw new AppError("User not found!", 404);
        }

        return personAlreadyExists;
    }
}

export { ShowPersonService };
