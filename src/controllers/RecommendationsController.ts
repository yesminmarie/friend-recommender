import { Response, Request } from "express";
import { container } from "tsyringe";

import { ShowRecommendationsService } from "../services/ShowRecommendationsService";

class RecommendationsController {
    public getRecommendations(request: Request, response: Response): Response {
        try {
            const { cpf } = request.params;

            const showRecommendationsService = container.resolve(
                ShowRecommendationsService
            );

            const recommendations = showRecommendationsService.execute({ cpf });

            return response.json(recommendations);
        } catch (err) {
            return response.status(404).json({
                error: err.message,
            });
        }
    }
}

export { RecommendationsController };
