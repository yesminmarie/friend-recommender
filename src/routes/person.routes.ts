import { Router } from "express";

import { PersonsController } from "../controllers/PersonsController";

const personsRoutes = Router();

personsRoutes.post("/", (request, response) => {
    const personController = new PersonsController();
    return personController.create(request, response);
})

export { personsRoutes };