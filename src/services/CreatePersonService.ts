import { IPersonsRepository } from "../repositories/IPersonsRepository";

interface IRequest {
    cpf: string;
    name: string;
}

class CreatePersonService {
    constructor(private personsRepository: IPersonsRepository) {}

    execute({ cpf, name }: IRequest): void {
        const personAlreadyExists = this.personsRepository.findByCpf(cpf);

        if (personAlreadyExists) {
            throw new Error("User already exists!");
        }

        if (cpf.length !== 11) {
            throw new Error(
                "The informed cpf does not have 11 numeric digits!"
            );
        }

        this.personsRepository.create({ cpf, name });
    }
}

export { CreatePersonService };
