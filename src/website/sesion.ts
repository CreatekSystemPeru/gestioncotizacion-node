import {Router, Request, Response} from "express";

const sesion = Router();

sesion.get("/iniciar", (req: Request, res: Response) => {
    if (req.session!.sesionActiva) {
        return res.redirect("/inicio");
    }

    res.render("sesion/iniciar", {
        layout: false,
        titulo: "Iniciar sesión"
    });
});

sesion.post("/iniciar", (req: Request, res: Response) => {
    var svcSesion = req.session!.userSesion;
    if (svcSesion!.s_idEmpresa > 0 && svcSesion!.s_idUsuario > 0) {        
        req.session!.sesionActiva = req.body;

        res.json({
            ok: true,
            message: "Inicio de sesión satisfactorio",
            data: null
        });
    }
    else{
        res.json({
            ok: false,
            message: "¡No ha iniciado sesión en el servicio!",
            data: null
        });
    }
});

sesion.get("/salir", (req: Request, res: Response) => {
    req.session!.sesionActiva = null;
    req.session!.userSesion = null;

    res.redirect("/sesion/iniciar");
});

export default sesion;
