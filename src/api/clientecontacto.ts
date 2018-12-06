import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const clienteContacto = Router();
clienteContacto.get('/clientecontacto/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    let parms = [req.query.idEstado || 0,s_idUsuario,req.query.start || 0,req.query.length || 0,search];
    const query = `CALL ClienteContacto_List(?,?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteContacto: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: '',
            draw: req.query.draw,
            recordsTotal: clienteContacto[1][0].TotalFilas,
            recordsFiltered: clienteContacto[1][0].TotalFiltrado,
            data: clienteContacto[0],
            permiso: clienteContacto[2]
        });
    });
});

clienteContacto.get('/clientecontacto/get', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    const query = `CALL ClienteContacto_Get(?)`;
    MySQL.ejecutarQuery(query, req.query.Id || 0, (err: any, clienteContactoGet: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: '',
            data: clienteContactoGet[0]
        });
    });
});

clienteContacto.post('/clientecontacto/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let {idEmpresa, idClienteContacto, apellidoPaterno, apellidoMaterno, nombres,fechaNacimiento,idTipoDocIdentidad,numDocIdentidad,idCargo,flagRepresentante} = req.body;
    let parms = [idEmpresa,idClienteContacto,apellidoPaterno,apellidoMaterno,nombres,fechaNacimiento,idTipoDocIdentidad,numDocIdentidad,
                idCargo,flagRepresentante,1,s_idUsuario];
    const query = `CALL ClienteContacto_InsertUpdate(?,?,?,?,?,?,?,?,?,?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, reg: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        let errorMessage = reg[0][0].ErrorMessage;
        if (!errorMessage.includes('#')) {
            return res.json({
                ok: true,
                message: errorMessage,
                data: null
            });
        }
        
        res.json({
            ok: false,
            message: errorMessage,
            data: null
        });
    });
});

clienteContacto.get('/clientecontacto/delete', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let parms = [req.query.idEmpresa,req.query.Id || 0,s_idUsuario];
    const query = `CALL ClienteContacto_ActiveDeactive(?,?,?)`;
    MySQL.ejecutarQuery(query, parms, (err: any, clienteContacto: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: clienteContacto[0][0].ErrorMessage,
            data: null
        });
    });
});

export default clienteContacto;