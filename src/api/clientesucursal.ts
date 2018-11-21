import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
import permisos from '../middlewares/permisos';

const clienteSucursal = Router();

clienteSucursal.post('/clientesucursal/reg', [ permisos.verificaSesion, permisos.verificaPermiso ], (req: Request, res: Response) => {
    let {s_idEmpresa,s_idUsuario} = req.session!.userSesion;
    let {sucursal} = req.body;
    const query = `CREATE `;
    let sucursalArray: any = [];
    sucursal.forEach((item: any) => {
        sucursalArray.push([]);
    });

    MySQL.ejecutarQueryAndValues(query, sucursalArray, (err: any, reg: any) => {
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

export default clienteSucursal;