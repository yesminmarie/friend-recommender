import "reflect-metadata";
import { injectable, inject } from "tsyringe";

import AppError from "../errors/AppError";
import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { IRelationshipsRepository } from "../repositories/IRelationshipsRepository";

interface IRequest {
    cpf: string;
}

@injectable()
class ShowRecommendationsService {
    constructor(
        @inject("PersonsRepository")
        private personsRepository: IPersonsRepository,

        @inject("RelationshipsRepository")
        private relationshipRepository: IRelationshipsRepository
    ) {}

    public async execute({ cpf }: IRequest): Promise<string[]> {
        const personAlreadyExists = await this.personsRepository.findByCpf(cpf);

        const regex = /^[0-9]{11}$/;

        if (!regex.test(cpf)) {
            throw new AppError(
                "The informed cpf does not have 11 numeric digits!",
                400
            );
        }
        if (!personAlreadyExists) {
            throw new AppError("User not found!", 404);
        }

        const relationshipsOfCpf =
            await this.relationshipRepository.getRecommendations(cpf);
        return relationshipsOfCpf;
    }
}

export { ShowRecommendationsService };
