import { Router, Request, Response } from 'express';
import cliente from "./cliente";
import clienteContacto from "./clientecontacto";
import clienteSucursal from "./clientesucursal";
import clienteSucursalContacto from "./clientesucursalcontacto";
import empresa from "./empresa";
import producto from "./producto";
import tablaMaestra from "./tablamaestra";
import ubigeo from "./ubigeo";
import usuario from "./usuario";

const index = Router();

index.use('/api', cliente);
index.use('/api', clienteContacto);
index.use('/api', clienteSucursal);
index.use('/api', clienteSucursalContacto);
index.use('/api', empresa);
index.use('/api', producto);
index.use('/api', tablaMaestra);
index.use('/api', ubigeo);
index.use('/api', usuario);

export default index;