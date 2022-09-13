import { Router } from "express";

import { cleanPersonsAndRelationshipsRoutes } from "./cleanPersonsAndRelationships.routes";
import { personsRoutes } from "./person.routes";
import { relationshipsRoutes } from "./relationship.routes";

const router = Router();

router.use("/person", personsRoutes);
router.use("/relationship", relationshipsRoutes);
router.use("/clean", cleanPersonsAndRelationshipsRoutes);

export { router };
