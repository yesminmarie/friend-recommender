import { Person } from "../model/Person";

interface ICreatePersonRepositoryDTO {
    cpf: string;
    name: string;
}

interface IPersonsRepository {
    findByCpf(cpf: string): Person;
    create({ cpf, name }: ICreatePersonRepositoryDTO): void;
}

export { IPersonsRepository, ICreatePersonRepositoryDTO };
