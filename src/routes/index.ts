import { Router } from "express";

import { cleanPersonsAndRelationshipsRoutes } from "./cleanPersonsAndRelationships.routes";
import { personsRoutes } from "./person.routes";
import { recommendationsRoutes } from "./recommendations.routes";
import { relationshipsRoutes } from "./relationship.routes";

const router = Router();

router.use("/person", personsRoutes);
router.use("/relationship", relationshipsRoutes);
router.use("/clean", cleanPersonsAndRelationshipsRoutes);
router.use("/recommendations", recommendationsRoutes);

export { router };
