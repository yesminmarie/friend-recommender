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

    public async findByCpf(cpf: string): Promise<Person | undefined> {
        const person = this.persons.find((person) => person.cpf === cpf);
        return person;
    }
    public async create({
        cpf,
        name,
    }: ICreatePersonRepositoryDTO): Promise<Person> {
        const person = new Person();

        Object.assign(person, {
            cpf,
            name,
        });

        this.persons.push(person);

        return person;
    }
    public async delete(): Promise<void> {
        this.persons.splice(0, this.persons.length);
    }
}

export { PersonsRepository };
