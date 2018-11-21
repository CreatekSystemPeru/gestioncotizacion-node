import {Router, Request, Response} from "express";
import validar from "./validar";

const productos = Router();

productos.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P producto list: render");
    res.render("catalogo/productolista", {
        titulo: "Listado de productos"
    });
});

productos.get("/ver/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P producto id: render");
    res.render("catalogo/productoinfo", {
        titulo: "Producto",
        clienteId: req.params.id
    });
});

export default productos;
