import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeletePersonsAndRelationshipsService } from "../services/DeletePersonsAndRelationshipsService";

class PersonsAndRelationshipsController {
    public clean(request: Request, response: Response): Response {
        try {
            const deletePersonsAndRelationships = container.resolve(
                DeletePersonsAndRelationshipsService
            );
            deletePersonsAndRelationships.execute();

            return response.status(200).send();
        } catch (err) {
            return response.status(400).json({
                error: err.message,
            });
        }
    }
}

export { PersonsAndRelationshipsController };
