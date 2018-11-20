import { Router, Request, Response } from 'express';
import cliente from "./cliente";
import clienteSucursal from "./clientesucursal";
import empresa from "./empresa";
import producto from "./producto";
import ubigeo from "./ubigeo";
import usuario from "./usuario";

const index = Router();

index.use('/api', cliente);
index.use('/api', clienteSucursal);
index.use('/api', empresa);
index.use('/api', producto);
index.use('/api', ubigeo);
index.use('/api', usuario);

export default index;