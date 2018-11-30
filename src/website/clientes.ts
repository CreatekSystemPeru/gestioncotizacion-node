import {Router, Request, Response} from "express";
import validar from "./validar";

const clientes = Router();

clientes.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente list: render");
    res.render("catalogo/clientelista", {
        titulo: "Listado de clientes"
    });
});

clientes.get("/ver/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente ver: render");
    res.render("catalogo/clienteinfo", {
        titulo: "Clientes",
        clienteId: req.params.id
    });
});

clientes.get("/sucursal/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente sucursal: render");
    res.render("catalogo/clientesucursal", {
        titulo: "Listado de Sucursales de Cliente",
        clienteId: req.params.id
    });
});

clientes.get("/versucursal/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente ver: render");
    res.render("catalogo/clientesucursalinfo", {
        titulo: "Sucursal de Clientes",
        sucursalClienteId: req.params.id
    });
});

export default clientes;
