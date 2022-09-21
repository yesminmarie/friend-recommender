import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeletePersonsAndRelationshipsService } from "../services/DeletePersonsAndRelationshipsService";

class PersonsAndRelationshipsController {
    public async clean(
        request: Request,
        response: Response
    ): Promise<Response> {
        const deletePersonsAndRelationships = container.resolve(
            DeletePersonsAndRelationshipsService
        );
        deletePersonsAndRelationships.execute();

        return response.status(200).send();
    }
}

export { PersonsAndRelationshipsController };
