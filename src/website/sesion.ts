import {Router, Request, Response} from "express";

const axios = require('axios');
const sesion = Router();

sesion.get("/iniciar", (req: Request, res: Response) => {
    if (req.session!.sesionActiva) {
        return res.redirect("/inicio");
    }

    console.log("P sesion: render");
    res.render("sesion/iniciar", {
        layout: false,
        titulo: "Iniciar sesión"
    });
});

sesion.post("/iniciar", (req: Request, res: Response) => {
    var svcSesion = req.session!.userSesion;
    console.log("P sesion: conectado");
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
    console.log("P sesion: desconectado");
    
    axios.get(req.headers.host + "/api/usuario/salir")
    .then(function (response: any) {
        console.log("sesion: servicio terminado", response);
        req.session!.sesionActiva = null;
    })
    .catch(function (error: any) {
        console.log("sesion: servicio terminado", error);
    })
    .then(function () {
        res.redirect("/sesion/iniciar");
    });
});

export default sesion;
