import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreatePersonService } from "../services/CreatePersonService";
import { ShowPersonService } from "../services/ShowPersonService";

class PersonsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { cpf, name } = request.body;

        const createPersonService = container.resolve(CreatePersonService);
        const person = await createPersonService.execute({ cpf, name });

        return response.status(201).json(person);
    }

    public async getPerson(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { cpf } = request.params;

        const showPersonService = container.resolve(ShowPersonService);

        const person = await showPersonService.execute({ cpf });

        return response.status(200).json(person);
    }
}
export { PersonsController };
