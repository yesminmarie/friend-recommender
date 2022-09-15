import { Router } from "express";

import { RecommendationsController } from "../controllers/RecommendationsController";

const recommendationsRoutes = Router();

const recommendationsController = new RecommendationsController();

recommendationsRoutes.get("/:cpf", (request, response) => {
    return recommendationsController.getRecommendations(request, response);
});

export { recommendationsRoutes };
