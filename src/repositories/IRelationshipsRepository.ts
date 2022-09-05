import { Person } from "../model/Person";

interface ICreateRelationshipRepositoryDTO {
    cpf1: string;
    cpf2: string;
}

interface IRelationshipsRepository {
    create({ cpf1, cpf2 }: ICreateRelationshipRepositoryDTO): void;
}

export { IRelationshipsRepository, ICreateRelationshipRepositoryDTO };
