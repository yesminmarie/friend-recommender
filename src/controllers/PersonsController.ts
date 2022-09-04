import { Response, Request } from "express";

import { PersonsRepository } from "../repositories/implementations/PersonsRepository";
import { CreatePersonService } from "../services/CreatePersonService";
import { ListPersonService } from "../services/ListPersonService";

const personsRepository = new PersonsRepository();
class PersonsController {
    public create(request: Request, response: Response): Response {
        try {
            const { cpf, name } = request.body;

            const createPersonService = new CreatePersonService(
                personsRepository
            );
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

            const listPersonService = new ListPersonService(personsRepository);

            const person = listPersonService.execute({ cpf });

            return response.json(person);
        } catch (err) {
            return response.status(404).json({
                error: err.message,
            });
        }
    }
}
export { PersonsController };
