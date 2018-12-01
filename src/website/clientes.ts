import {Router, Request, Response} from "express";
import validar from "./validar";

const clientes = Router();

// listado de clientes
clientes.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente list: render");
    res.render("catalogo/clientelista", {
        titulo: "Listado de clientes"
    });
});

// id del cliente para ver sus detalles
clientes.get("/ver/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente ver: render");
    res.render("catalogo/clienteinfo", {
        titulo: "Clientes",
        clienteId: req.params.id
    });
});

// id del cliente, para listar sus sucursales
clientes.get("/sucursal/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente sucursal: render");
    res.render("catalogo/sucursal", {
        titulo: "Listado de Sucursales de Cliente",
        clienteId: req.params.id
    });
});

// id de sucursal, para ver sus detalles y lista de contactos
clientes.get("/versucursal/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cliente ver: render");
    res.render("catalogo/sucursalinfo", {
        titulo: "Sucursal de Clientes",
        sucursalClienteId: req.params.id
    });
});

export default clientes;
