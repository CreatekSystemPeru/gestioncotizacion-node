import { Router, Request, Response } from "express";
import inicio from "./inicio";
import sesion from "./sesion";
import empresas from "./empresas";

const rutas = Router();

rutas.get("/error", (req: Request, res: Response) => {
    let message = req.query.message;
    
    res.render("error", {
        message
    });
});

rutas.use(function userAccessLog(req: Request, res: Response, next: any){
    if (! req.url.startsWith("/lib") && ! req.url.startsWith("/assets")) {        
        console.log("--------------------------------------------------");
        console.log("Cuando: ", new Date().toISOString().replace(/T/, ' '));
        console.log("Recurso: ", req.method, req.url, req.headers.host, "(" + (req.baseUrl || "/") + ")" );
    }

    next();
});

rutas.use("/", inicio);
rutas.use("/sesion", sesion);
rutas.use("/empresas", empresas);

export default rutas;