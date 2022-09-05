import { Relationship } from "../../model/Relationship";
import {
    IRelationshipsRepository,
    ICreateRelationshipRepositoryDTO,
} from "../IRelationshipsRepository";

class RelationshipsRepository implements IRelationshipsRepository {
    private relationships: Relationship[];

    constructor() {
        this.relationships = [];
    }

    create({ cpf1, cpf2 }: ICreateRelationshipRepositoryDTO): void {
        const relationship = new Relationship();

        Object.assign(relationship, {
            cpf1,
            cpf2,
        });

        this.relationships.push(relationship);
    }
}

export { RelationshipsRepository };
