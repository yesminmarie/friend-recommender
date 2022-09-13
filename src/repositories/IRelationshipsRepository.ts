interface ICreateRelationshipRepositoryDTO {
    cpf1: string;
    cpf2: string;
}

interface IRelationshipsRepository {
    create({ cpf1, cpf2 }: ICreateRelationshipRepositoryDTO): void;
    delete(): void;
}

export { IRelationshipsRepository, ICreateRelationshipRepositoryDTO };
