import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreatePersonService } from "../services/CreatePersonService";
import { ShowPersonService } from "../services/ShowPersonService";

class PersonsController {
    public create(request: Request, response: Response): Response {
        try {
            const { cpf, name } = request.body;

            const createPersonService = container.resolve(CreatePersonService);
            createPersonService.execute({ cpf, name });

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                error: err.message,
            });
        }
    }

    public getPerson(request: Request, response: Response): Response {
        try {
            const { cpf } = request.params;

            const showPersonService = container.resolve(ShowPersonService);

            const person = showPersonService.execute({ cpf });

            return response.json(person);
        } catch (err) {
            return response.status(404).json({
                error: err.message,
            });
        }
    }
}
export { PersonsController };
