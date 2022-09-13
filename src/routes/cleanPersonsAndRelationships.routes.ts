import { Router } from "express";

import { PersonsAndRelationshipsController } from "../controllers/PersonsAndRelationshipsController";

const cleanPersonsAndRelationshipsRoutes = Router();

const personsAndRelationshipsController =
    new PersonsAndRelationshipsController();

cleanPersonsAndRelationshipsRoutes.delete("/", (request, response) => {
    return personsAndRelationshipsController.clean(request, response);
});

export { cleanPersonsAndRelationshipsRoutes };
