interface ICreateRelationshipRepositoryDTO {
    cpf1: string;
    cpf2: string;
}

interface IRelationshipsRepository {
    getRecommendations(cpf: string): string[];
    create({ cpf1, cpf2 }: ICreateRelationshipRepositoryDTO): void;
    delete(): void;
    getCpfFriends(cpf: string): string[];
    getCpfRelationshipsFriends(cpfFriends: string[], cpf: string): string[];
    sortByRelevance(cpfRelationshipsFriends: string[]): string[];
}

export { IRelationshipsRepository, ICreateRelationshipRepositoryDTO };
