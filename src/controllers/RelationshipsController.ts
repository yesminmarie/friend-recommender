import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateRelationshipService } from "../services/CreateRelationshipService";

class RelationshipsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { cpf1, cpf2 } = request.body;

            const createRelationshipService = container.resolve(
                CreateRelationshipService
            );

            const relationship = await createRelationshipService.execute({
                cpf1,
                cpf2,
            });

            return response.status(201).json(relationship);
        } catch (err) {
            return response.status(404).json({
                error: err.message,
            });
        }
    }
}

export { RelationshipsController };
