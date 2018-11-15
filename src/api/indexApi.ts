import { Router, Request, Response } from 'express';
import empresa from "./empresa";
import usuario from "./usuario";
import cliente from "./cliente";

const index = Router();

index.use(empresa);
index.use(usuario);
index.use(cliente);

export default index;