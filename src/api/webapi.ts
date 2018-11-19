import { Router, Request, Response } from 'express';
import empresa from "./empresa";
import usuario from "./usuario";
import cliente from "./cliente";
import producto from "./producto";

const index = Router();

index.use('/api', empresa);
index.use('/api', usuario);
index.use('/api', cliente);
index.use('/api', producto);

export default index;