import "reflect-metadata";
import { injectable, inject } from "tsyringe";

import AppError from "../errors/AppError";
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
        await this.checkIfUsersExist(cpf1, cpf2);

        await this.checkIfTheTwoProvidedCpfAreTheSame(cpf1, cpf2);

        await this.checkIfRelationshipAlreadyExists(cpf1, cpf2);

        const relationship = await this.relationshipRepository.create({
            cpf1,
            cpf2,
        });
        return relationship;
    }

    private async checkIfUsersExist(cpf1: string, cpf2: string): Promise<void> {
        const personAlreadyExistsCpf1 = await this.personsRepository.findByCpf(
            cpf1
        );
        const personAlreadyExistsCpf2 = await this.personsRepository.findByCpf(
            cpf2
        );

        if (!personAlreadyExistsCpf1 || !personAlreadyExistsCpf2) {
            throw new AppError("User not found! Check the provided CPFs.", 404);
        }
    }

    private async checkIfRelationshipAlreadyExists(
        cpf1: string,
        cpf2: string
    ): Promise<void> {
        const relationshipAlreadyExists =
            await this.relationshipRepository.findRelationship(cpf1, cpf2);

        if (relationshipAlreadyExists) {
            throw new AppError("Relationship already exists!", 400);
        }
    }

    private async checkIfTheTwoProvidedCpfAreTheSame(
        cpf1: string,
        cpf2: string
    ): Promise<void> {
        if (cpf1 === cpf2) {
            throw new AppError("The two provided CPFs are the same!", 400);
        }
    }
}

export { CreateRelationshipService };
