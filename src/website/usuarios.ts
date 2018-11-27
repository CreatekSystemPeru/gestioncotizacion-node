import {Router, Request, Response} from "express";
import validar from "./validar";

const usuarios = Router();

usuarios.get(["/", "/listar"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P usuario list: render");
    res.render("catalogo/usuariolista", {
        titulo: "Listado de usuarios"
    });
});

usuarios.get("/ver/:id(\\d+)", [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("P usuario id: render");
    res.render("catalogo/usuarioinfo", {
        titulo: "Usuario",
        usuarioId: req.params.id
    });
});

export default usuarios;

