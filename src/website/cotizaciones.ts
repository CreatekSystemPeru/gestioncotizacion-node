import {Router, Request, Response} from "express";
import validar from "./validar";

const cotizaciones = Router();

// listado de cotizaciones
cotizaciones.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cotizacion list: render");
    res.render("catalogo/cotizacionlista", {
        titulo: "Listado de cotizaciones"
    });
});

// id del cotizacion para ver sus detalles
cotizaciones.get("/ver/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P cotizacion ver: render");
    res.render("catalogo/cotizacioninfo", {
        titulo: "Cotizaciones",
        clienteId: req.params.id
    });
});

export default cotizaciones;