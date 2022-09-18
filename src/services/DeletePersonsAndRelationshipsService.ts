import "reflect-metadata";

import { injectable, inject } from "tsyringe";

import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { IRelationshipsRepository } from "../repositories/IRelationshipsRepository";

@injectable()
class DeletePersonsAndRelationshipsService {
    constructor(
        @inject("PersonsRepository")
        private personsRepository: IPersonsRepository,

        @inject("RelationshipsRepository")
        private relationshipRepository: IRelationshipsRepository
    ) {}

    public async execute(): Promise<void> {
        this.personsRepository.delete();
        this.relationshipRepository.delete();
    }
}

export { DeletePersonsAndRelationshipsService };
