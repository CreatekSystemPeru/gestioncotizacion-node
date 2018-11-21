import {Router, Request, Response} from "express";
import validar from "./validar";

const axios = require('axios');
const clientes = Router();

clientes.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente list: render");
    res.render("catalogo/clientelista", {
        titulo: "Listado de clientes"
    });
});

clientes.get("/ver/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente id: render");
    res.render("catalogo/clienteinfo", {
        titulo: "Clientes",
        clienteId: req.params.id
    });
});

clientes.get("/listar-apicaller", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente list api: render");

    var start = req.query.start || 0;
    var length = req.query.length || 15;
    
    var retval = {
        draw: parseInt(req.query.draw) || 1,
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
    };

    console.log(req.session!.userSesion);
    req.session!.userSesion = {s_idEmpresa : 1, s_idUsuario : 4};

    axios.get(process.env.SERVICE_URL + "/cliente/list", {
        params: {
            count: 50000,
            offset: 0,
            idEstado: 0
        }
    })
    .then(function (response: any) {
        console.log("S cliente list api: servicio ok", response.data);
        if (response.data!.ok) {
            retval.recordsTotal = response.data.data.length;
            retval.recordsFiltered = response.data.data.length;
            retval.data = response.data.data.slice(start * length, length);
        }
    })
    .catch(function (error: any) {
        console.log("S cliente list api: servicio error", error);
    })
    .then(function () {
        res.json(retval);
    });
});

export default clientes;
