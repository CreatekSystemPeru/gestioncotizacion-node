import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const empresa = Router();

empresa.get('/empresa/combo', (req: Request, res: Response) => {
    const query = `CALL Empresa_Combo()`;
    MySQL.ejecutarQuery(query, null, (err: any, empresaCombo: object[]) => {
        if (err) {
            res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: '',
            data: empresaCombo[0]
        });
    });
});

empresa.get('/empresa/list', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idEmpresa, s_idUsuario} = req.session!.userSesion;

    const query = `CALL Empresa_List(${s_idEmpresa},${req.query.idEstado || 0},${s_idUsuario},${req.query.offset || 0},${req.query.count || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, empresa: any) => {
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
            data: empresa[0],
            permiso: empresa[1]
        });
    });
});

empresa.get('/empresa/get', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    const query = `CALL Empresa_Get(${req.query.Id || 0})`;
    MySQL.ejecutarQuery(query, null, (err: any, empresaGet: any) => {
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
            data: empresaGet[0]
        });        
    });
});

empresa.post('/empresa/reg/', [permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;
    let { idEmpresa, ruc, empresa, empresaAbrev,
        direccion, telefono1, telefono2, movil1, movil2, email, url } = req.body;
    const query = `CALL Empresa_InsertUpdate(${idEmpresa},'${ruc}','${empresa}','${empresaAbrev}','${direccion}','${telefono1}',
                                            '${telefono2}','${movil1}','${movil2}','${email}','${url}',1,${s_idUsuario})`;
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

empresa.get('/empresa/delete', [ permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;

    const query = `CALL Empresa_ActiveDeactive(${req.query.Id || 0}, ${s_idUsuario})`;
    MySQL.ejecutarQuery(query, null, (err: any, empresaDelete: any) => {
        if (err) {
            return res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        res.json({
            ok: true,
            message: empresaDelete[0][0].ErrorMessage,
            data: null
        });
    });
});

export default empresa;