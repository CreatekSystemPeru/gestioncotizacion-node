import {Router, Request, Response} from "express";

let tieneSesion = (req: Request, res: Response, next: any) => {
    console.log("M tieneSesion: check");
    if (!req.session!.sesionActiva) {
        console.log("tieneSesion: redirect Login");
        return res.redirect("/sesion/iniciar");
    }
    else if (req.session!.sesionActiva.idEmpresa <= 0) {
        console.log("tieneSesion: redirect cambiar Empresa");
        return res.redirect("/sesion/cambiarempresa");
    }
    console.log("M tieneSesion: pass");
    
    res.locals.sesionActiva = req.session!.sesionActiva;
    next();
};

export default { tieneSesion }