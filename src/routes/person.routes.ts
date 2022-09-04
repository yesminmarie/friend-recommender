import { Router } from "express";

import { PersonsController } from "../controllers/PersonsController";

const personsRoutes = Router();

const personController = new PersonsController();

personsRoutes.post("/", (request, response) => {
    return personController.create(request, response);
});

personsRoutes.get("/:cpf", (request, response) => {
    return personController.getPerson(request, response);
});

export { personsRoutes };
