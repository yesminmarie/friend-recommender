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

    public async getRecommendations(cpf: string): Promise<string[]> {
        const cpfsOfUserFriends = this.getCpfsOfUserFriends(cpf);

        const cpfsOfFriendsOfUserFriends = this.getCpfsOfFriendsOfUserFriends(
            cpfsOfUserFriends,
            cpf
        );

        const cpfsSortedByRelevance = this.sortByRelevance(
            cpfsOfFriendsOfUserFriends
        );

        return cpfsSortedByRelevance;
    }

    public async findRelationship(
        cpf1: string,
        cpf2: string
    ): Promise<Relationship | undefined> {
        const relationship = this.relationships.find(
            (relationship) =>
                (relationship.cpf1 === cpf1 && relationship.cpf2 === cpf2) ||
                (relationship.cpf2 === cpf1 && relationship.cpf1 === cpf2)
        );

        return relationship;
    }

    private getCpfsOfUserFriends(cpf: string): string[] {
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

    private getCpfsOfFriendsOfUserFriends(
        cpfsOfUserFriends: string[],
        cpf: string
    ): string[] {
        let cpfsOfFriendsOfUserFriends = [];

        cpfsOfUserFriends.forEach((cpfFriend) => {
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
                        !cpfsOfUserFriends.includes(cpfRelationship)
                );
            cpfsOfFriendsOfUserFriends = [
                ...cpfsOfFriendsOfUserFriends,
                ...cpfFriendRelationship,
            ];
        });
        return cpfsOfFriendsOfUserFriends;
    }

    private sortByRelevance(cpfsOfFriendsOfUserFriends: string[]): string[] {
        const countedCpf = cpfsOfFriendsOfUserFriends.reduce(
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
