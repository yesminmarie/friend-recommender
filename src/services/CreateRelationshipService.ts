import { injectable, inject } from "tsyringe";

import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { IRelationshipsRepository } from "../repositories/IRelationshipsRepository";

interface IRequest {
    cpf1: string;
    cpf2: string;
}

@injectable()
class CreateRelationshipService {
    constructor(
        @inject("PersonsRepository")
        private personsRepository: IPersonsRepository,

        @inject("RelationshipsRepository")
        private relationshipRepository: IRelationshipsRepository
    ) {}

    execute({ cpf1, cpf2 }: IRequest): void {
        const personAlreadyExistsCpf1 = this.personsRepository.findByCpf(cpf1);
        const personAlreadyExistsCpf2 = this.personsRepository.findByCpf(cpf2);

        if (!personAlreadyExistsCpf1 || !personAlreadyExistsCpf2) {
            throw new Error("User not found!");
        }

        this.relationshipRepository.create({ cpf1, cpf2 });
    }
}

export { CreateRelationshipService };
