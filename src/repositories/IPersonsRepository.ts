import { Person } from "../model/Person";

interface ICreatePersonRepositoryDTO {
    cpf: string;
    name: string;
}

interface IPersonsRepository {
    findByCpf(cpf: string): Promise<Person | undefined>;
    create({ cpf, name }: ICreatePersonRepositoryDTO): Promise<Person>;
    delete(): Promise<void>;
}

export { IPersonsRepository, ICreatePersonRepositoryDTO };
