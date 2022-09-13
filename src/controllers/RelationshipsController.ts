import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateRelationshipService } from "../services/CreateRelationshipService";

class RelationshipsController {
    public create(request: Request, response: Response): Response {
        try {
            const { cpf1, cpf2 } = request.body;

            const createRelationshipService = container.resolve(
                CreateRelationshipService
            );

            createRelationshipService.execute({ cpf1, cpf2 });

            return response.status(201).send();
        } catch (err) {
            return response.status(404).json({
                error: err.message,
            });
        }
    }
}

export { RelationshipsController };