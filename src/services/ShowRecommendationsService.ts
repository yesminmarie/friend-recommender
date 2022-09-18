import { injectable, inject } from "tsyringe";

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
            throw new Error(
                "The informed cpf does not have 11 numeric digits!"
            );
        }
        if (!personAlreadyExists) {
            throw new Error("User not found!");
        }

        const relationshipsOfCpf =
            await this.relationshipRepository.getRecommendations(cpf);
        return relationshipsOfCpf;
    }
}

export { ShowRecommendationsService };
