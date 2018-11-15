import {Router, Request, Response} from "express";
import validar from "./validar";

const inicio = Router();

inicio.get(["/", "/inicio"], [validar.tieneSesion], (req: Request, res: Response) => {
    console.log("render inicio");
    res.render("inicio", { 
        titulo: "Inicio"
    });
    /*res.render("index", {
        usuarioMenu: userLogin.MenuList,
        userName: userLogin.UsuarioPersona
    });*/
});

export default inicio;
