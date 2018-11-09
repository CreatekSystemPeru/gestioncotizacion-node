import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const empresa = Router();

empresa.get('/empresa/combo', (req: Request, res: Response) => {
    const query = `CALL Empresa_Combo()`;
    MySQL.ejecutarQuery(query, (err: any, empresaCombo: object[]) => {
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

empresa.get('/empresa/list', (req: Request, res: Response) => {
    const query = `CALL Empresa_List()`;
    MySQL.ejecutarQuery(query, (err: any, empresa: any) => {
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
            data: empresa[0]
        });
    });
});

empresa.get('/empresa/get/:Id', (req: Request, res: Response) => {
    const query = `CALL Empresa_Get(${req.params.Id})`;
    MySQL.ejecutarQuery(query, (err: any, empresaGet: any) => {
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
            data: empresaGet[0]
        });        
    });
});

empresa.post('/empresa/reg', (req: Request, res: Response) => {
    let { idEmpresa, ruc, empresa, empresaAbrev,
        direccion, telefono1, telefono2, movil1, movil2, email, url } = req.body;
    const query = `CALL Empresa_InsertUpdate(${idEmpresa},'${ruc}','${empresa}','${empresaAbrev}','${direccion}','${telefono1}',
                                            '${telefono2}','${movil1}','${movil2}','${email}','${url}', 1, 1, 'Host')`;
    MySQL.ejecutarQuery(query, (err: any, reg: any) => {
        if (err) {
            res.json({
                ok: false,
                message: `#${err.message}`,
                data: null
            });
        }

        let errorMessaje = reg[0][0].ErrorMessage;
        if (!errorMessaje.includes('#')) {
            res.json({
                ok: true,
                message: errorMessaje,
                data: null
            });    
        } else {
            res.json({
                ok: false,
                message: errorMessaje,
                data: null
            });
        }        
    });
});

export default empresa;