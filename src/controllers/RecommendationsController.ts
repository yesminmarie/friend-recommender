import { Response, Request } from "express";
import { container } from "tsyringe";

import { ShowRecommendationsService } from "../services/ShowRecommendationsService";

class RecommendationsController {
    public async getRecommendations(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { cpf } = request.params;

        const showRecommendationsService = container.resolve(
            ShowRecommendationsService
        );

        const recommendations = await showRecommendationsService.execute({
            cpf,
        });

        return response.status(200).json(recommendations);
    }
}

export { RecommendationsController };
