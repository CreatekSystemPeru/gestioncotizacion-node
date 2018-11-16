import { Router, Request, Response } from 'express';
import empresa from "./empresa";
import usuario from "./usuario";
import cliente from "./cliente";

const index = Router();

index.use('/api', empresa);
index.use('/api', usuario);
index.use('/api', cliente);

export default index;