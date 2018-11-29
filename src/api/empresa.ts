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
    let {s_idUsuario} = req.session!.userSesion;

    let search = (req.query.search) ? req.query.search.value : '';
    const query = `CALL Empresa_List(${req.query.idEstado || 0},${s_idUsuario},${req.query.start || 0},${req.query.length || 0}, '${search}')`;
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
            draw: req.query.draw,
            recordsTotal: empresa[1][0].TotalFilas,
            recordsFiltered: empresa[1][0].TotalFiltrado,
            data: empresa[0],
            permiso: empresa[2]
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
        direccion, telefono1, telefono2, movil1, movil2, email, url, rutaLogo } = req.body;
    const query = `CALL Empresa_InsertUpdate(${idEmpresa},'${ruc}','${empresa}','${empresaAbrev}','${direccion}','${telefono1}',
                                            '${telefono2}','${movil1}','${movil2}','${email}','${url}', '${rutaLogo}',1, ${s_idUsuario})`;
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

        return res.json({
            ok: false,
            message: errorMessage,
            data: null
        });
    });
});

empresa.get('/empresa/delete', [ permisos.verificaSesion, permisos.verificaPermiso], (req: Request, res: Response) => {
    let {s_idUsuario} = req.session!.userSesion;

    const query = `CALL Empresa_ActiveDeactive(${req.query.Id || 0})`;
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