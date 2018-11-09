import { Router, Request, Response } from 'express';
import empresa from "./empresa";
import usuario from "./usuario";

const index = Router();

index.use(empresa);
index.use(usuario);

export default index;