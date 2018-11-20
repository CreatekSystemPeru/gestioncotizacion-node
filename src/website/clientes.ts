import {Router, Request, Response} from "express";
import validar from "./validar";

const clientes = Router();

clientes.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente list: render");
    res.render("catalogo/cliente", {
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

export default clientes;
