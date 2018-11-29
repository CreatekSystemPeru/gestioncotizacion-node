import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const clienteContacto = Router();
clienteContacto.get('/clientecontacto/list/', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    const query = `CALL ClienteContacto_List(${req.query.idEstado || 0},${s_idUsuario},${req.query.start || 0},${req.query.length || 0}, '${search}')`;
    MySQL.ejecutarQuery(query, null, (err: any, clienteContacto: any) => {
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

clienteContacto.get('/clientecontacto/get/', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    const query = `CALL ClienteContacto_Get(${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, clienteContactoGet: any) => {
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
    let {idEmpresa, idClienteContacto, apellidoPaterno, apellidoMaterno, nombres,fechaNacimiento,idTipoDocIdentidad,numDocIdentidad,idCargo} = req.body;
    const query = `CALL ClienteContacto_InsertUpdate(${idEmpresa},${idClienteContacto},'${apellidoPaterno}','${apellidoMaterno}',
                                                    '${nombres}','${fechaNacimiento}',${idTipoDocIdentidad},'${numDocIdentidad}',${idCargo},1,${s_idUsuario})`;
    MySQL.ejecutarQuery(query, null, (err: any, reg: any) => {
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

    const query = `CALL ClienteContacto_ActiveDeactive(${req.query.idEmpresa}, ${req.query.Id || 0}, ${s_idUsuario})`;
    MySQL.ejecutarQuery(query, null, (err: any, clienteContacto: any) => {
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