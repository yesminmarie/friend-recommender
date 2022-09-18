import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreatePersonService } from "../services/CreatePersonService";
import { ShowPersonService } from "../services/ShowPersonService";

class PersonsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { cpf, name } = request.body;

            const createPersonService = container.resolve(CreatePersonService);
            const person = await createPersonService.execute({ cpf, name });

            return response.status(201).json(person);
        } catch (err) {
            return response.status(400).json({
                error: err.message,
            });
        }
    }

    public async getPerson(
        request: Request,
        response: Response
    ): Promise<Response> {
        try {
            const { cpf } = request.params;

            const showPersonService = container.resolve(ShowPersonService);

            const person = await showPersonService.execute({ cpf });

            return response.json(person);
        } catch (err) {
            return response.status(404).json({
                error: err.message,
            });
        }
    }
}
export { PersonsController };
