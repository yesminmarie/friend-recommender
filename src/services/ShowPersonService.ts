import { injectable, inject } from "tsyringe";

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

    execute({ cpf }: IRequest): Person {
        const personAlreadyExists = this.personsRepository.findByCpf(cpf);

        if (!personAlreadyExists) {
            throw new Error("User not found!");
        }

        return personAlreadyExists;
    }
}

export { ShowPersonService };
