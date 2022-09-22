import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateRelationshipService } from "../services/CreateRelationshipService";

class RelationshipsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { cpf1, cpf2 } = request.body;

        const createRelationshipService = container.resolve(
            CreateRelationshipService
        );

        const relationship = await createRelationshipService.execute({
            cpf1,
            cpf2,
        });

        return response.status(201).json(relationship);
    }
}

export { RelationshipsController };
