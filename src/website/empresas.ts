import {Router, Request, Response} from "express";
import validar from "./validar";

const empresas = Router();

empresas.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P empresa list: render");
    res.render("catalogo/empresalista", {
        titulo: "Listado de empresas"
    });
});

empresas.get("/ver/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P empresa id: render");
    res.render("catalogo/empresainfo", {
        titulo: "Empresas",
        empresaId: req.params.id
    });
});

/*
empresas.get("/:id", [validar.tieneSesion], (req: Request, res: Response) => {
});*/

export default empresas;
