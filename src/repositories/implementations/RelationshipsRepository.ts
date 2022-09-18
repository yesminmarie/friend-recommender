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

    public async create({
        cpf1,
        cpf2,
    }: ICreateRelationshipRepositoryDTO): Promise<Relationship> {
        const relationship = new Relationship();

        Object.assign(relationship, {
            cpf1,
            cpf2,
        });

        this.relationships.push(relationship);

        return relationship;
    }

    public async delete(): Promise<void> {
        this.relationships.splice(0, this.relationships.length);
    }

    getRecommendations(cpf: string): string[] {
        const cpfFriends = this.getCpfFriends(cpf);

        const cpfRelationshipsFriends = this.getCpfRelationshipsFriends(
            cpfFriends,
            cpf
        );

        const cpfSortedByRelevance = this.sortByRelevance(
            cpfRelationshipsFriends
        );

        return cpfSortedByRelevance;
    }

    getCpfFriends(cpf: string): string[] {
        const friends = this.relationships
            .filter(
                (relationship) =>
                    relationship.cpf1 === cpf || relationship.cpf2 === cpf
            )
            .map((relationship) =>
                relationship.cpf1 !== cpf
                    ? relationship.cpf1
                    : relationship.cpf2
            );
        return friends;
    }

    getCpfRelationshipsFriends(cpfFriends: string[], cpf: string): string[] {
        let cpfRelationshipsFriends = [];

        cpfFriends.forEach((cpfFriend) => {
            const cpfFriendRelationship = this.relationships
                .filter(
                    (relationship) =>
                        relationship.cpf1 === cpfFriend ||
                        relationship.cpf2 === cpfFriend
                )
                .map((relationship) =>
                    relationship.cpf1 !== cpfFriend
                        ? relationship.cpf1
                        : relationship.cpf2
                )
                .filter(
                    (cpfRelationship) =>
                        cpfRelationship !== cpf &&
                        !cpfFriends.includes(cpfRelationship)
                );
            cpfRelationshipsFriends = [
                ...cpfRelationshipsFriends,
                ...cpfFriendRelationship,
            ];
        });
        return cpfRelationshipsFriends;
    }

    sortByRelevance(cpfRelationshipsFriends: string[]): string[] {
        const countedCpf = cpfRelationshipsFriends.reduce(
            (accumulator, cpf) => {
                accumulator[cpf] = (accumulator[cpf] ?? 0) + 1;
                return accumulator;
            },
            {}
        );

        const sortedRecommendations = Object.keys(countedCpf).sort(
            (cpf1, cpf2) => {
                return countedCpf[cpf2] - countedCpf[cpf1];
            }
        );

        return sortedRecommendations;
    }
}

export { RelationshipsRepository };
