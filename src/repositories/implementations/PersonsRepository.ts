import { Person } from "../../model/Person";
import {
    ICreatePersonRepositoryDTO,
    IPersonsRepository,
} from "../IPersonsRepository";

class PersonsRepository implements IPersonsRepository {
    private persons: Person[];

    constructor() {
        this.persons = [];
    }

    findByCpf(cpf: string): Person {
        const person = this.persons.find((person) => person.cpf === cpf);
        return person;
    }
    create({ cpf, name }: ICreatePersonRepositoryDTO): void {
        const person = new Person();

        Object.assign(person, {
            cpf,
            name,
        });

        this.persons.push(person);
    }
}

export { PersonsRepository };
