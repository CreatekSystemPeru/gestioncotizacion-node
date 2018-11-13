import { Router, Request, Response } from "express";

import inicio from "./inicio";
import sesion from "./sesion";

const rutas = Router();
/*rutas.get("/", (req: Request, res: Response) => {
    if (req.session!.userLogin) {
        return res.redirect('/index');
    }    
    let message = req.query.message;
    const query = `CALL Empresa_Combo()`;
    MySQL.ejecutarQuery(query, (err: any, Empresa: object[]) => {
        if (err) {
            return res.redirect('/error?message=' + err.message);
        } else {
            res.render('login', {
                Empresa: Empresa[0],
                message
            });
        }
    });
})

rutas.get("/error", (req: Request, res: Response) => {
    let message = req.query.message;
    
    res.render("error", {
        message
    });
});*/

rutas.use(inicio);
rutas.use("/sesion", sesion);
/*routerIndex.use(catalogo);*/

export default rutas;