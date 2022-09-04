import { Router } from "express";

import { personsRoutes } from "./person.routes";

const router = Router();

router.use("/person", personsRoutes);

export { router };