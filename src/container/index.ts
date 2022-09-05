import { container } from "tsyringe";

import { PersonsRepository } from "../repositories/implementations/PersonsRepository";
import { RelationshipsRepository } from "../repositories/implementations/RelationshipsRepository";
import { IPersonsRepository } from "../repositories/IPersonsRepository";
import { IRelationshipsRepository } from "../repositories/IRelationshipsRepository";

container.registerSingleton<IPersonsRepository>(
    "PersonsRepository",
    PersonsRepository
);

container.registerSingleton<IRelationshipsRepository>(
    "RelationshipsRepository",
    RelationshipsRepository
);
