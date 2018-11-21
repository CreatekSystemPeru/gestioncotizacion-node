import {Router, Request, Response} from "express";
import validar from "./validar";

const empresas = Router();

empresas.get(["/", "/listar"], (req: Request, res: Response) => {
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

empresas.get("/test", (req: Request, res: Response) => {
    console.log("P empresa test: render");
    res.json({
        ok: true,
        message: null,
        data:[{
            IdEmpresa: 1,
            RUC: "Empresas",
            Empresa: "x",
            EmpresaAbrev:"x",
            Direccion:"x",
            Telefono:"x",
            Movil:"x",
            Email:"x",
            URL:"x"
        }
        ],
    });
});

/*
empresas.get("/:id", [validar.tieneSesion], (req: Request, res: Response) => {
});*/

export default empresas;
