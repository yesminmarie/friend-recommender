import { Router } from "express";

import { personsRoutes } from "./person.routes";
import { relationshipsRoutes } from "./relationship.routes";

const router = Router();

router.use("/person", personsRoutes);
router.use("/relationship", relationshipsRoutes);

export { router };
