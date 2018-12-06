import {Router, Request, Response} from "express";

const axios = require('axios');
const sesion = Router();

sesion.get(["/", "/iniciar"], (req: Request, res: Response) => {    
    var terminado = req.query.terminado;

    if (terminado == 1) {
        req.session!.sesionActiva = null;
    }
    else if (req.session!.sesionActiva) {
        return res.redirect("/cambiarempresa");
    }

    console.log("P sesion: render");
    res.render("sesion/iniciar", {
        layout: false,
        titulo: "Iniciar sesión",
        terminado: terminado
    });
});

sesion.post("/iniciar", (req: Request, res: Response) => {
    var svcSesion = req.session!.userSesion;
    console.log("P sesion: conectado");
    if (svcSesion!.s_idUsuario > 0) {
        req.session!.sesionActiva = req.body;
        req.session!.sesionActiva.idEmpresa = 0;

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

sesion.get("/cambiarempresa", (req: Request, res: Response) => {
    console.log("P cambiarempresa: render");
    req.session!.sesionActiva.idEmpresa = 0;

    res.render("sesion/cambiarempresa", {
        layout: false,
        titulo: "Cambiar empresa"
    });
});

sesion.post("/cambiarempresa", (req: Request, res: Response) => {
    console.log("P cambiarempresa: asignacion");
    var idEmpresa = parseInt(req.body.idEmpresa);
    console.log("idEmpresa= ",idEmpresa);
    if (idEmpresa > 0) {
        req.session!.sesionActiva.idEmpresa = idEmpresa;
        req.session!.sesionActiva.Empresa = req.body.nomEmpresa;
    }

    res.json({
        ok: (idEmpresa > 0),
        message: "",
        data: null
    });
});

sesion.get("/salir", (req: Request, res: Response) => {
    console.log("P sesion: desconectado");
    
    axios.get(process.env.SERVICE_URL + "/usuario/salir")
    .then(function (response: any) {
        console.log("P sesion: servicio terminado");
        req.session!.sesionActiva = null;
        req.session!.userSesion = null;
    })
    .catch(function (error: any) {
        console.log("P sesion: servicio terminado error");
    })
    .then(function () {
        res.redirect("/sesion/iniciar?terminado=1");
    });
});

export default sesion;
