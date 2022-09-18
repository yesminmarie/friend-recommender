import "reflect-metadata";
import { injectable, inject } from "tsyringe";

import { Relationship } from "../model/Relationship";
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

    public async execute({ cpf1, cpf2 }: IRequest): Promise<Relationship> {
        const personAlreadyExistsCpf1 = await this.personsRepository.findByCpf(
            cpf1
        );
        const personAlreadyExistsCpf2 = await this.personsRepository.findByCpf(
            cpf2
        );

        if (!personAlreadyExistsCpf1 || !personAlreadyExistsCpf2) {
            throw new Error("User not found!");
        }

        const relationship = await this.relationshipRepository.create({
            cpf1,
            cpf2,
        });
        return relationship;
    }
}

export { CreateRelationshipService };
