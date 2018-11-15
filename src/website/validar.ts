import {Router, Request, Response} from "express";

let tieneSesion = (req: Request, res: Response, next: any) => {
    console.log("tieneSesion: check");
    if (!req.session!.sesionActiva) {
        console.log("tieneSesion: redirect Login");
        return res.redirect("/sesion/iniciar");
    }
    console.log("tieneSesion: pass");
    next();
};

export default { tieneSesion }