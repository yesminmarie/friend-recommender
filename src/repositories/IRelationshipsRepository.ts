import { Relationship } from "../model/Relationship";

interface ICreateRelationshipRepositoryDTO {
    cpf1: string;
    cpf2: string;
}

interface IRelationshipsRepository {
    getRecommendations(cpf: string): Promise<string[]>;
    create({
        cpf1,
        cpf2,
    }: ICreateRelationshipRepositoryDTO): Promise<Relationship>;
    delete(): Promise<void>;
    findRelationship(
        cpf1: string,
        cpf2: string
    ): Promise<Relationship | undefined>;
}

export { IRelationshipsRepository, ICreateRelationshipRepositoryDTO };
