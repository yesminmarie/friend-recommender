import { Router } from "express";

import { RelationshipsController } from "../controllers/RelationshipsController";

const relationshipsRoutes = Router();

const relationshipController = new RelationshipsController();

relationshipsRoutes.post("/", (request, response) => {
    return relationshipController.create(request, response);
});

export { relationshipsRoutes };
